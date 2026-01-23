import type { Block } from 'payload';

/**
 * Block: Button Section
 * A reusable button block containing a title and a URL
 * Can be used in Pages collection and Globals
 */
export const buttonBlock: Block = {
  slug: 'button',
  labels: {
    singular: 'Button Section',
    plural: 'Button Sections',
  },
  fields: [
    {
      name: 'button',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
};
