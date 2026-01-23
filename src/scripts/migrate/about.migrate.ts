import { Payload } from 'payload';
import { migrateMedia } from './utils/migrate-media';
import { fetchStrapiData } from './utils/fetch-strapi';
import StrapiAboutResponse from './types/about.strapi.type';

export async function migrateAbout(payload: Payload) {
  try {
    console.log('Starting About migration...');

    // Fetch data from Strapi API
    const strapiData = await fetchStrapiData<StrapiAboutResponse>('about');
    console.log('Successfully fetched About data from Strapi');

    const { attributes } = strapiData.data;

    // Migrate hero banner image
    console.log('Migrating hero banner image...');
    const heroBannerImageId = await migrateMedia(payload, attributes.HeroBannerImage, 'about');
    if (!heroBannerImageId) {
      throw new Error('Failed to migrate hero banner image');
    }

    // Migrate quotation section images
    console.log('Migrating quotation section images...');
    const quotationImageId = await migrateMedia(
      payload,
      attributes.QuotationSection.Image,
      'about',
    );
    if (!quotationImageId) {
      throw new Error('Failed to migrate quotation image');
    }

    const quotationAdditionalImageId = await migrateMedia(
      payload,
      attributes.QuotationSection.AdditionalImage,
      'about',
    );

    const quotationMobileImageId = await migrateMedia(
      payload,
      attributes.QuotationSection.MobileImage,
      'about',
    );

    // Get markdown content
    const markdownContent = attributes.MarkdownSection.MarkdownContent || '';

    // Prepare markdown section data
    // Validate button data - only include if both title and URL are non-empty strings
    // Button is required in markdownSection, so we need to create a block
    const hasValidMarkdownButton =
      attributes.MarkdownSection.Button &&
      typeof attributes.MarkdownSection.Button.Title === 'string' &&
      attributes.MarkdownSection.Button.Title.trim().length > 0 &&
      typeof attributes.MarkdownSection.Button.URL === 'string' &&
      attributes.MarkdownSection.Button.URL.trim().length > 0;

    // Create button block array (required field, minRows: 1, maxRows: 1)
    const markdownButtonBlock = hasValidMarkdownButton
      ? [
          {
            blockType: 'button' as const,
            button: {
              title: attributes.MarkdownSection.Button!.Title.trim(),
              url: attributes.MarkdownSection.Button!.URL.trim(),
            },
          },
        ]
      : [
          {
            blockType: 'button' as const,
            button: {
              title: '',
              url: '',
            },
          },
        ];

    if (attributes.MarkdownSection.Button && !hasValidMarkdownButton) {
      console.warn(
        'Markdown Section Button found but invalid (missing or empty title/URL), creating empty button block',
      );
    }

    const markdownSection: any = {
      subtitle: attributes.MarkdownSection.Subtitle || '',
      title: attributes.MarkdownSection.Title || '',
      markdownContent,
      button: markdownButtonBlock, // Required field, always include
    };

    // Prepare quotation section data
    // Validate button data - only include if both title and URL are non-empty strings
    // Button is optional in quotationSection
    const quotationButtonData = attributes.QuotationSection.Button;
    const hasValidButton =
      quotationButtonData !== null &&
      quotationButtonData !== undefined &&
      typeof quotationButtonData.Title === 'string' &&
      quotationButtonData.Title.trim().length > 0 &&
      typeof quotationButtonData.URL === 'string' &&
      quotationButtonData.URL.trim().length > 0;

    // Create button block array (optional field, minRows: 1, maxRows: 1 when present)
    const quotationButtonBlock = hasValidButton
      ? [
          {
            blockType: 'button' as const,
            button: {
              title: quotationButtonData!.Title.trim(),
              url: quotationButtonData!.URL.trim(),
            },
          },
        ]
      : undefined;

    if (quotationButtonData && !hasValidButton) {
      console.warn(
        'Quotation Section Button found but invalid (missing or empty title/URL), omitting button field',
        {
          title: quotationButtonData.Title,
          url: quotationButtonData.URL,
        },
      );
    }

    if (quotationButtonData === null) {
      console.log('Quotation Section Button is null in Strapi data, omitting button field');
    }

    // Build quotation section
    const quotationSection: any = {
      quote: attributes.QuotationSection.Quote || '',
      author: attributes.QuotationSection.Author || '',
      image: quotationImageId,
    };

    // Add optional fields only if they exist
    if (quotationAdditionalImageId) {
      quotationSection.additionalImage = quotationAdditionalImageId;
    }
    if (quotationMobileImageId) {
      quotationSection.mobileImage = quotationMobileImageId;
    }
    // Only include button block if it's valid (omit entirely if null or invalid)
    if (quotationButtonBlock) {
      quotationSection.button = quotationButtonBlock;
    }

    // Create new About global using updateGlobal (creates if doesn't exist)
    const aboutData = {
      heroBannerImage: heroBannerImageId,
      markdownSection,
      quotationSection,
    } as any; // Type assertion needed - IDs may be string or number, and section types are complex

    console.log('Creating About global...');
    await payload.updateGlobal({
      slug: 'about',
      data: aboutData,
    });
    console.log('About global created successfully');

    console.log('About migration completed successfully');
  } catch (error) {
    console.error('Error migrating about', JSON.stringify(error, null, 2));
    throw error;
  }
}
