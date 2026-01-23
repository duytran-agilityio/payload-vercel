import type { Field, GlobalConfig } from 'payload'

import {
  benefitsField,
  consultationsSectionField,
  headingWithDescriptionField,
  pageHeaderField,
} from '../fields'

export const IRA: GlobalConfig = {
  slug: 'ira',
  label: 'IRA',
  admin: {
    description: 'IRA page content',
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      required: true,
      fields: [
        {
          ...pageHeaderField,
          name: 'pageHeader',
        } as Field,
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'whyUs',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'list',
          type: 'array',
          required: true,
          admin: {
            components: {
              RowLabel: '/components/ArrayRowLabel',
            },
          },
          fields:
            ('fields' in headingWithDescriptionField ? headingWithDescriptionField.fields : []) ||
            [],
        },
      ],
    },
    {
      ...benefitsField,
      name: 'benefits',
      required: true,
    } as Field,
    {
      ...benefitsField,
      name: 'howToGetStarted',
      required: true,
    } as Field,
    {
      ...consultationsSectionField,
      name: 'consultationsCTA',
      required: true,
    } as Field,
  ],
}
