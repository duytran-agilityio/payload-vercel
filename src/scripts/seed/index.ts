import { getPayloadClient } from '@/libs/payload/client'
import { seedAdmin } from './seeders/admin.seeder'

async function seed() {
  try {
    const payload = await getPayloadClient()
    await seedAdmin(payload)
    console.log('Seed completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('Seed failed', error)
    process.exit(1)
  }
}

seed()
