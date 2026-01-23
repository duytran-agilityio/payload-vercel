import type { Field } from 'payload'

/**
 * Reusable HeadingWithDescription component (components.heading-with-description)
 * Used in Consultations, ImageWithListSection, and other places
 */
export const headingWithDescriptionField: Field = {
  name: 'headingWithDescription',
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
