import type { Field } from 'payload';
import { markdownField } from '@/utils/markdownField';
import { buttonBlock } from '@/blocks';

/**
 * Reusable MarkdownSection component (components.markdown-section)
 * Used in About
 */
export const markdownSectionField: Field = {
  name: 'markdownSection',
  type: 'group',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Section subtitle',
      },
    },
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Section title',
      },
    },
    markdownField({
      fieldName: 'markdownContent',
      required: true,
      description: 'Markdown content',
    }),
    {
      name: 'button',
      type: 'blocks',
      required: true,
      blocks: [buttonBlock],
      minRows: 1,
      maxRows: 1,
    },
  ],
};
