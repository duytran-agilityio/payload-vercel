import type { Field, GlobalConfig } from 'payload';

import {
  headingWithDescriptionField,
  quotationField,
  textWithLongDescriptionField,
} from '@/fields';
import { markdownField } from '@/utils/markdownField';
import { buttonBlock } from '@/blocks';

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    description: 'Homepage content',
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'banner',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'mobileBanner',
          type: 'upload',
          relationTo: 'media',
        },
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
          name: 'primaryButton',
          type: 'blocks',
          blocks: [buttonBlock],
          minRows: 1,
          maxRows: 1,
        },
        {
          name: 'secondaryButton',
          type: 'blocks',
          blocks: [buttonBlock],
          minRows: 1,
          maxRows: 1,
        },
        {
          name: 'checklist',
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
            },
          ],
        },
      ],
    },
    {
      ...quotationField,
      name: 'quotation',
    } as Field,
    {
      name: 'companyInfo',
      type: 'group',
      fields: [
        {
          name: 'subTitle',
          type: 'text',
        },
        {
          name: 'title',
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
          ],
        },
        markdownField({
          fieldName: 'description',
          description: 'Max 500 characters',
          required: true,
        }),
        {
          name: 'sliderItems',
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
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'linkText',
              type: 'text',
            },
            {
              name: 'linkUrl',
              type: 'text',
            },
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'howItWorks',
      type: 'group',
      required: true,
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
          admin: {
            components: {
              RowLabel: '/components/ArrayRowLabel',
            },
          },
          fields:
            ('fields' in textWithLongDescriptionField ? textWithLongDescriptionField.fields : []) ||
            [],
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'comparison',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        markdownField({
          fieldName: 'description',
          description: 'Max 500 characters',
          required: true,
        }),
        {
          name: 'link',
          type: 'blocks',
          blocks: [buttonBlock],
          minRows: 1,
          maxRows: 1,
        },
        {
          name: 'battalionPros',
          type: 'array',
          required: true,
          admin: {
            components: {
              RowLabel: '/components/ArrayRowLabel',
            },
          },
          fields:
            ('fields' in textWithLongDescriptionField ? textWithLongDescriptionField.fields : []) ||
            [],
        },
        {
          name: 'otherCons',
          type: 'array',
          required: true,
          admin: {
            components: {
              RowLabel: '/components/ArrayRowLabel',
            },
          },
          fields:
            ('fields' in textWithLongDescriptionField ? textWithLongDescriptionField.fields : []) ||
            [],
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'productSlider',
      type: 'group',
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
          name: 'link',
          required: true,
          type: 'blocks',
          blocks: [buttonBlock],
          minRows: 1,
          maxRows: 1,
        },
      ],
    },
    {
      name: 'newsletter',
      type: 'group',
      fields:
        ('fields' in headingWithDescriptionField ? headingWithDescriptionField.fields : []) || [],
    },
  ],
};
