import { User } from '@/payload-types'
import type { FieldHook } from 'payload'
export const protectRoles: FieldHook<{ id: string } & User> = ({ req, data, value }) => {
    const isAdmin = req.user?.roles?.includes('admin')

    // Admins can set any roles they want
    if (isAdmin) {
        return value
    }

    // Non-admins cannot change roles - return the original value from database
    // or default to ['user'] for new users
    return data?.roles || ['user']
}
