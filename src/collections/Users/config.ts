import type { CollectionConfig } from 'payload'
import { checkRole } from './access'
import { User } from '@/payload-types'
import { protectRoles } from './hooks/protect-roles'

export const Users: CollectionConfig = {
    slug: 'users',
    admin: {
        useAsTitle: 'email',
    },
    auth: true,
    fields: [
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media'
        }, {
            name: 'roles',
            type: 'select',
            hasMany: true,
            options: [{
                label: 'Admin',
                value: 'admin',
            },
            {
                label: 'Editor',
                value: 'editor',
            },
            {
                label: 'User',
                value: 'user',
            },],
            defaultValue: ['user'],
            required: true,
            saveToJWT: true,
            access: {
                update: ({ req: { user } }) => checkRole(['admin'], user as User),
            },
            hooks: {
                beforeChange: [protectRoles],
            },

        }, {
            name: 'active',
            type: 'checkbox',
            defaultValue: true,
        },
        {
            name: 'name',
            type: 'text',
        },
    ],
}
