import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { env } from '@/libs/env'
import { seedAdmin } from '@/scripts/seed/seeders/admin.seeder'

function getSeedSecret(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '').trim()
  }

  return request.headers.get('x-migration-secret')?.trim()
}

function ensureSeedSecretConfigured() {
  if (!env.MIGRATION_SECRET) {
    return NextResponse.json(
      { error: 'Migration secret not configured' },
      { status: 500 },
    )
  }
  return null
}

export async function POST(request: NextRequest) {
  const secretCheck = ensureSeedSecretConfigured()
  if (secretCheck) {
    return secretCheck
  }

  const providedSecret = getSeedSecret(request)
  if (!providedSecret || providedSecret !== env.MIGRATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await getPayload({ config: configPromise })

  try {
    await seedAdmin(payload)
    return NextResponse.json({ message: 'Seed completed' })
  } catch (error) {
    console.error('Seed failed', error)
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 })
  }
}
