import type { Field, GlobalConfig } from 'payload'

import { textWithLongDescriptionField } from '../fields'
import { markdownField } from '@/utils/markdownField'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact',
  admin: {
    description: 'Contact page content',
  },
  fields: [
    {
      ...textWithLongDescriptionField,
      name: 'heading',
    } as Field,
    markdownField({
      fieldName: 'contactDetails',
      description: 'Contact details and information',
    }),
  ],
}
