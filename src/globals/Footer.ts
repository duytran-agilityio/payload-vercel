import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: {
    description: 'Site footer content',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Footer logo',
      },
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          defaultValue: 'https://',
        },
        {
          name: 'youtube',
          type: 'text',
          defaultValue: 'https://',
        },
        {
          name: 'x',
          type: 'text',
          defaultValue: 'https://',
        },
        {
          name: 'tiktok',
          type: 'text',
          defaultValue: 'https://',
        },
        {
          name: 'linkedin',
          type: 'text',
          defaultValue: 'https://',
        },
        {
          name: 'facebook',
          type: 'text',
          defaultValue: 'https://',
        },
      ],
    },
    {
      name: 'menuColumns',
      type: 'array',
      admin: {
        components: {
          RowLabel: '/components/ArrayRowLabel',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'items',
          type: 'array',
          admin: {
            components: {
              RowLabel: '/components/ArrayRowLabel',
            },
          },
          fields: [
            {
              name: 'item',
              type: 'text',
              required: true,
            },
            {
              name: 'link',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
