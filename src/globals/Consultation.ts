import type { Field, GlobalConfig } from 'payload'

import { pageHeaderField, textWithLongDescriptionField } from '../fields'

export const Consultation: GlobalConfig = {
  slug: 'consultation',
  label: 'Consultation',
  admin: {
    description: 'Consultation page content',
  },
  fields: [
    {
      name: 'heading',
      type: 'group',
      fields: [
        {
          ...pageHeaderField,
          name: 'pageHeader',
        } as Field,
        {
          name: 'linkCard',
          type: 'array',
          required: true,
          admin: {
            components: {
              RowLabel: '/components/ArrayRowLabel',
            },
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
            {
              name: 'linkTitle',
              type: 'text',
              defaultValue: 'Learn More',
            },
          ],
        },
      ],
    },
    {
      name: 'information',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'items',
          type: 'array',
          admin: {
            components: {
              RowLabel: '/components/ArrayRowLabel',
            },
          },
          fields:
            ('fields' in textWithLongDescriptionField ? textWithLongDescriptionField.fields : []) ||
            [],
        },
      ],
    },
  ],
}
