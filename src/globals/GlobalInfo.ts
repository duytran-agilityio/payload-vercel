import type { GlobalConfig } from 'payload'

export const GlobalInfo: GlobalConfig = {
  slug: 'global-info',
  label: 'Global Info',
  admin: {
    description: 'Global site information and branding',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Site logo',
      },
    },
    {
      name: 'maskImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Mask image for branding',
      },
    },
  ],
}
