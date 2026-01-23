import { Payload } from 'payload'
import { env } from '@/libs/env'
import { isDuplicateError } from '../libs/is-duplicate-error'

export async function seedAdmin(payload: Payload) {
  try {
    await payload.create({
      collection: 'users',
      data: {
        email: env.CMS_SEED_ADMIN_EMAIL,
        password: env.CMS_SEED_ADMIN_PASSWORD,
        roles: ['admin'],
      },
    })
    console.log('Admin user created successfully')
  } catch (error) {
    if (isDuplicateError(error, 'email')) {
      console.warn('Admin user already exists')
    } else {
      console.error('Error creating admin user', error)
    }
  }
}
