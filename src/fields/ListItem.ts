import type { Field } from 'payload'

/**
 * Reusable ListItem component (components.list-item)
 * Used in Benefits and other places
 */
export const listItemField: Field = {
  name: 'listItem',
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
    },
  ],
}
