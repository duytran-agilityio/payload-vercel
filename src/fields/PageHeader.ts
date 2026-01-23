import type { Field } from 'payload'

/**
 * Reusable PageHeader component (components.page-header)
 * Used in Bunker, Services, IRA headers
 */
export const pageHeaderField: Field = {
  name: 'pageHeader',
  type: 'group',
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
