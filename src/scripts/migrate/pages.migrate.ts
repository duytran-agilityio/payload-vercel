import { Payload } from 'payload';
import { fetchStrapiData } from './utils/fetch-strapi';
import StrapiPagesResponse from './types/pages.strapi.type';

export async function migratePages(payload: Payload) {
  try {
    console.log('Starting Pages migration...');

    // Fetch data from Strapi API
    const strapiData = await fetchStrapiData<StrapiPagesResponse>('pages');
    console.log(`Successfully fetched ${strapiData.data.length} pages from Strapi`);

    let createdCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    // Process each page
    for (const page of strapiData.data) {
      const { attributes } = page;

      try {
        // Check if page already exists by link (unique field)
        const existingPages = await payload.find({
          collection: 'pages',
          where: {
            link: {
              equals: attributes.link,
            },
          },
          limit: 1,
        });

        // Convert Components to Payload blocks
        const components = attributes.Components
          ? await Promise.all(
              attributes.Components.map(async (component) => {
                if (component.__component === 'components.markdown-with-title') {
                  console.log(
                    `  Converting markdown-with-title component (ID: ${component.id}) for page ${attributes.link}`,
                  );

                  // Ensure content is always a non-empty string (field is required)
                  let content = component.Content || '';

                  // Handle case where Content might be an object or other type
                  if (typeof content !== 'string') {
                    console.warn(
                      `Content is not a string in markdown-with-title component for page ${attributes.link}. Type: ${typeof content}, Value: ${JSON.stringify(content)}`,
                    );
                    // Try to convert to string
                    if (content && typeof content === 'object') {
                      content = JSON.stringify(content);
                    } else {
                      content = String(content || '');
                    }
                  }

                  if (content.trim() === '') {
                    console.warn(
                      `Empty content in markdown-with-title component for page ${attributes.link}, using placeholder`,
                    );
                    content = 'Content migrated. Please review and update.';
                  }

                  // Final validation before returning
                  const finalContent = content.trim();

                  return {
                    blockType: 'markdown-with-title' as const,
                    title: component.Title || null,
                    content: finalContent,
                  };
                } else if (component.__component === 'components.q-and-a-section') {
                  console.log(
                    `  Converting q-and-a-section component (ID: ${component.id}, ${component.Questions?.length || 0} questions) for page ${attributes.link}`,
                  );

                  // Validate title (required field)
                  let faqTitle = component.Title;
                  if (!faqTitle || typeof faqTitle !== 'string' || faqTitle.trim() === '') {
                    console.warn(
                      `Missing or empty Title in q-and-a-section component for page ${attributes.link}, using placeholder`,
                    );
                    faqTitle = 'FAQ Section';
                  }

                  // Validate and filter questions
                  const validQuestions = (component.Questions || [])
                    .map((q) => {
                      const question = q.Question || '';
                      let answer = q.Answer || '';

                      // Ensure answerMarkdown is non-empty (required field)
                      if (!answer || typeof answer !== 'string' || answer.trim() === '') {
                        console.warn(
                          `Empty answer in FAQ question for page ${attributes.link}, using placeholder`,
                        );
                        answer = 'Answer migrated. Please review and update.';
                      }

                      return {
                        question: question.trim() || 'Question migrated. Please review and update.',
                        answerMarkdown: answer.trim(),
                      };
                    })
                    .filter((q) => q.question && q.answerMarkdown); // Remove invalid questions

                  // Skip FAQ block if no valid questions
                  if (validQuestions.length === 0) {
                    console.warn(
                      `No valid questions in q-and-a-section component for page ${attributes.link}, skipping`,
                    );
                    return null;
                  }

                  return {
                    blockType: 'faq' as const,
                    title: faqTitle.trim(),
                    questions: validQuestions,
                  };
                } else if (component.__component === 'components.rich-text-with-title') {
                  console.log(
                    `  Converting rich-text-with-title component (ID: ${component.id}) for page ${attributes.link}`,
                  );
                  // Handle rich-text-with-title component
                  // The Text field is a JSON string in lexical format
                  // Since we're moving to markdown-only, extract plain text from Lexical structure
                  let markdownContent =
                    'Content migrated from rich text editor. Please review and update.';

                  try {
                    // Check if Text field exists and is a string
                    if (!component.Text || typeof component.Text !== 'string') {
                      console.warn(
                        `Text field is missing or invalid in rich-text-with-title component for page ${attributes.link}`,
                      );
                    } else {
                      const parsed = JSON.parse(component.Text);
                      if (parsed && typeof parsed === 'object' && parsed.root) {
                        // Extract text from Lexical nodes recursively
                        // Lexical nodes can have: text, children, or both
                        const extractText = (node: any): string => {
                          if (!node || typeof node !== 'object') {
                            return '';
                          }

                          // If node has text property, use it
                          if (typeof node.text === 'string') {
                            return node.text;
                          }

                          // If node has children, recursively extract from them
                          if (Array.isArray(node.children) && node.children.length > 0) {
                            const childrenText = node.children
                              .map(extractText)
                              .filter((text: string) => text && text.length > 0)
                              .join(' ');
                            return childrenText;
                          }

                          return '';
                        };

                        const extracted = extractText(parsed.root);
                        if (extracted && extracted.trim().length > 0) {
                          markdownContent = extracted.trim();
                        } else {
                          console.warn(
                            `Extracted empty content from rich-text-with-title component for page ${attributes.link}, using placeholder`,
                          );
                        }
                      } else {
                        console.warn(
                          `Invalid Lexical structure in rich-text-with-title component for page ${attributes.link}`,
                        );
                      }
                    }
                  } catch (error) {
                    console.warn(
                      `Failed to parse Text field in rich-text-with-title component for page ${attributes.link}: ${error}`,
                    );
                  }

                  // Ensure content is always a non-empty string
                  if (
                    !markdownContent ||
                    typeof markdownContent !== 'string' ||
                    markdownContent.trim() === ''
                  ) {
                    markdownContent =
                      'Content migrated from rich text editor. Please review and update.';
                  }

                  return {
                    blockType: 'markdown-with-title' as const,
                    title: component.Title || null,
                    content: markdownContent,
                  };
                }
                return null;
              }),
            )
          : undefined;

        // Filter out null values (shouldn't happen, but just in case)
        const validComponents = components?.filter((c) => c !== null);

        const pageData = {
          metaTitle: attributes.MetaTitle,
          metaDescription: attributes.MetaDescription,
          link: attributes.link,
          hideFromIndex: attributes.hideFromIndex ?? false,
          components: validComponents && validComponents.length > 0 ? validComponents : undefined,
        };

        if (existingPages.docs.length > 0) {
          // Update existing page
          const existingPage = existingPages.docs[0];
          console.log(`Updating page: ${attributes.link} (ID: ${existingPage.id})`);
          await payload.update({
            collection: 'pages',
            id: existingPage.id,
            data: pageData,
          });
          updatedCount++;
        } else {
          // Create new page
          console.log(`Creating page: ${attributes.link}`);
          await payload.create({
            collection: 'pages',
            data: pageData,
          });
          createdCount++;
        }
      } catch (error) {
        console.error(`Error processing page ${attributes.link}:`, error);
        skippedCount++;
      }
    }

    console.log(`Pages migration completed successfully`);
    console.log(`  - Created: ${createdCount}`);
    console.log(`  - Updated: ${updatedCount}`);
    console.log(`  - Skipped: ${skippedCount}`);
  } catch (error) {
    console.error('Error migrating pages', JSON.stringify(error, null, 2));
    throw error;
  }
}
