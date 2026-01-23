import type { Field } from 'payload'
import { listItemField } from './ListItem'

/**
 * Reusable Benefits component (components.benefits)
 * Used in Bunker and IRA
 */
export const benefitsField: Field = {
  name: 'benefits',
  type: 'group',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'list',
      type: 'array',
      required: true,
      fields: ('fields' in listItemField ? listItemField.fields : []) || [],
      admin: {
        description: 'List of benefits',
        components: {
          RowLabel: '/components/ArrayRowLabel',
        },
      },
    },
  ],
}
