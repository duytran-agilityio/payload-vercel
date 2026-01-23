import type { Field, GlobalConfig } from 'payload';
import { consultationsSectionField, headingWithDescriptionField, pageHeaderField } from '@/fields';
import { buttonBlock } from '@/blocks';
export const Service: GlobalConfig = {
  slug: 'service',
  label: 'Services',
  admin: {
    description: 'Services page content',
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
      name: 'consultations',
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
      ...consultationsSectionField,
      name: 'consultationsCTA_1',
      required: true,
    } as Field,
    {
      name: 'secureStorage',
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
      name: 'ira',
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
        },
        {
          name: 'button',
          required: true,
          type: 'blocks',
          blocks: [buttonBlock],
          minRows: 1,
          maxRows: 1,
        },
        {
          name: 'mobileImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      ...consultationsSectionField,
      name: 'consultationsCTA_2',
      required: true,
    } as Field,
  ],
};
