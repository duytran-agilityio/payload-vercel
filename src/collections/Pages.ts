import type { CollectionConfig } from 'payload'
import { faqBlock, markdownWithTitleBlock } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'metaTitle',
    defaultColumns: ['link', 'metaTitle', 'updatedAt'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      required: true,
      maxLength: 60,
      admin: {
        description: 'SEO meta title (max 60 characters)',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      required: true,
      maxLength: 160,
      admin: {
        description: 'SEO meta description (max 160 characters)',
      },
    },
    {
      name: 'link',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      validate: (value: string | null | undefined) => {
        if (!value || typeof value !== 'string') {
          return 'Link is required'
        }
        const regex = /^[a-zA-Z0-9-]+$/
        if (!regex.test(value)) {
          return 'Link must contain only letters, numbers, and hyphens'
        }
        return true
      },
      admin: {
        description: 'URL-friendly identifier (e.g., "about-us", "contact")',
      },
    },
    {
      name: 'components',
      type: 'blocks',
      blocks: [markdownWithTitleBlock, faqBlock],
      admin: {
        description: 'Page content components',
      },
    },
    {
      name: 'hideFromIndex',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Hide this page from site index/search',
      },
    },
  ],
}
