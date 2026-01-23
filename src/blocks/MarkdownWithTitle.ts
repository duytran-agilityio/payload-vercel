import type { Block } from 'payload';
import { markdownField } from '../utils/markdownField';

/**
 * Block: Markdown with Title
 * A simple block containing a title and rich text content
 * Content is stored as markdown in the database (not lexical richtext)
 */
export const markdownWithTitleBlock: Block = {
  slug: 'markdown-with-title',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    markdownField({
      fieldName: 'content',
      required: true,
      description:
        'Edit content using the markdown editor with toolbar and preview. Content is stored as markdown.',
    }),
  ],
};
