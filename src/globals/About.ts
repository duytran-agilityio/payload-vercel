import type { Field, GlobalConfig } from 'payload'

import { markdownSectionField, quotationField } from '../fields'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About',
  admin: {
    description: 'About page content',
  },
  fields: [
    {
      name: 'heroBannerImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Hero banner image for the about page',
      },
    },
    {
      ...markdownSectionField,
      name: 'markdownSection',
      required: true,
    } as Field,
    {
      ...quotationField,
      name: 'quotationSection',
      required: true,
    } as Field,
  ],
}
