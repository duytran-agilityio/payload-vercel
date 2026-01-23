import type { Field, GlobalConfig } from 'payload';

import { buttonBlock, faqBlock } from '../blocks';
import {
  benefitsField,
  consultationsSectionField,
  listItemField,
  pageHeaderField,
} from '../fields';

export const Bunker: GlobalConfig = {
  slug: 'bunker',
  label: 'Bunker',
  admin: {
    description: 'Bunker page content',
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
          name: 'primaryButton',
          required: true,
          type: 'blocks',
          blocks: [buttonBlock],
          minRows: 1,
          maxRows: 1,
        },
        {
          name: 'secondaryButton',
          required: true,
          type: 'blocks',
          blocks: [buttonBlock],
          minRows: 1,
          maxRows: 1,
        },
        {
          name: 'headerImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'list',
          type: 'array',
          required: true,
          maxRows: 4,
          admin: {
            components: {
              RowLabel: '/components/ArrayRowLabel',
            },
          },
          fields: ('fields' in listItemField ? listItemField.fields : []) || [],
        },
      ],
    },
    {
      ...benefitsField,
      name: 'howItWorks',
      required: true,
    } as Field,
    {
      name: 'pricing',
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
          name: 'subtitle',
          type: 'text',
          required: true,
        },
        {
          name: 'metalRates',
          type: 'array',
          required: true,
          admin: {
            components: {
              RowLabel: '/components/ArrayRowLabel',
            },
          },
          fields: [
            {
              name: 'min',
              type: 'number',
              required: true,
              admin: {
                description: 'Minimum value',
              },
            },
            {
              name: 'max',
              type: 'number',
              required: true,
              admin: {
                description: 'Maximum value',
              },
            },
            {
              name: 'allocatedRate',
              type: 'number',
              required: true,
              admin: {
                description: 'Allocated rate',
              },
            },
            {
              name: 'segregatedRate',
              type: 'number',
              required: true,
              admin: {
                description: 'Segregated rate',
              },
            },
          ],
        },
      ],
    },
    {
      name: 'whyBattalionBunker',
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
          name: 'button',
          required: true,
          type: 'blocks',
          blocks: [buttonBlock],
          minRows: 1,
          maxRows: 1,
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
              required: true,
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'faq',
      type: 'blocks',
      required: true,
      blocks: [faqBlock],
      admin: {
        description: 'FAQ section with questions and answers',
      },
    },
    {
      ...consultationsSectionField,
      name: 'consultationsCTA',
      required: true,
    } as Field,
    {
      name: 'comparison',
      type: 'group',
      required: true,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'tableHeader',
          type: 'group',
          required: true,
          fields: [
            {
              name: 'heading_1',
              type: 'text',
              required: true,
            },
            {
              name: 'heading_2',
              type: 'text',
              required: true,
            },
            {
              name: 'heading_3',
              type: 'text',
              required: true,
            },
            {
              name: 'heading_4',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'tableBody',
          type: 'array',
          required: true,
          admin: {
            components: {
              RowLabel: '/components/ArrayRowLabel',
            },
          },
          fields: [
            {
              name: 'feature',
              type: 'text',
              required: true,
            },
            {
              name: 'battalionBunker',
              type: 'select',
              required: true,
              options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ],
            },
            {
              name: 'legacyStorage',
              type: 'select',
              required: true,
              options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ],
            },
            {
              name: 'homeStorage',
              type: 'select',
              required: true,
              options: [
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
