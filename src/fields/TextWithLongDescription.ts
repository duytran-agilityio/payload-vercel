import type { Field } from 'payload'

/**
 * Reusable TextWithLongDescription component (components.text-with-long-description)
 * Used in Contact, Homepage, and other places
 */
export const textWithLongDescriptionField: Field = {
  name: 'textWithLongDescription',
  type: 'group',
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
  ],
}
