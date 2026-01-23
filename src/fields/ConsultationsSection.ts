import type { Field } from 'payload';
import { buttonBlock } from '@/blocks';

/**
 * Reusable ConsultationsSection component (components.consultations-section)
 * Used in Bunker, IRA, Service
 */
export const consultationsSectionField: Field = {
  name: 'consultationsSection',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'primaryButton',
      type: 'blocks',
      blocks: [buttonBlock],
      minRows: 1,
      maxRows: 1,
    },
    {
      name: 'secondaryButton',
      type: 'blocks',
      blocks: [buttonBlock],
      minRows: 1,
      maxRows: 1,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
  ],
};
