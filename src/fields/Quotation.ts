import type { Field } from 'payload';
import { buttonBlock } from '@/blocks';

/**
 * Reusable Quotation component (homepage.quotation)
 * Used in About and Homepage
 */
export const quotationField: Field = {
  name: 'quotation',
  type: 'group',
  fields: [
    {
      name: 'quote',
      type: 'text',
      required: true,
      admin: {
        description: 'Quotation text',
      },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      admin: {
        description: 'Quote author',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Main quotation image',
      },
    },
    {
      name: 'additionalImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Additional image (optional)',
      },
    },
    {
      name: 'mobileImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Mobile-specific image (optional)',
      },
    },
    {
      name: 'button',
      type: 'blocks',
      blocks: [buttonBlock],
      minRows: 1,
      maxRows: 1,
    },
  ],
};
