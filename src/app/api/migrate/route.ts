import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { env } from '@/libs/env'

import { migrateAbout } from '@/scripts/migrate/about.migrate'
import { migrateBunker } from '@/scripts/migrate/bunker.migrate'
import { migrateConsultation } from '@/scripts/migrate/consultation.migrate'
import { migrateContact } from '@/scripts/migrate/contact.migrate'
import { migrateFooter } from '@/scripts/migrate/footer.migrate'
import { migrateGlobalInfo } from '@/scripts/migrate/global-info.migrate'
import { migrateHomepage } from '@/scripts/migrate/homepage.migrate'
import { migrateIRA } from '@/scripts/migrate/ira.migrate'
import { migrateMenu } from '@/scripts/migrate/menu.migrate'
import { migratePages } from '@/scripts/migrate/pages.migrate'
import { migrateService } from '@/scripts/migrate/service.migrate'

const MIGRATIONS: Record<string, (payload: Awaited<ReturnType<typeof getPayload>>) => Promise<void>> = {
  'global-info': migrateGlobalInfo,
  menu: migrateMenu,
  about: migrateAbout,
  bunker: migrateBunker,
  consultation: migrateConsultation,
  contact: migrateContact,
  footer: migrateFooter,
  homepage: migrateHomepage,
  ira: migrateIRA,
  service: migrateService,
  pages: migratePages,
}

const MIGRATION_ORDER = [
  'global-info',
  'menu',
  'about',
  'bunker',
  'consultation',
  'contact',
  'footer',
  'homepage',
  'ira',
  'service',
  'pages',
]

function getMigrationSecret(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '').trim()
  }

  return request.headers.get('x-migration-secret')?.trim()
}

function ensureMigrationSecretConfigured() {
  if (!env.MIGRATION_SECRET) {
    return NextResponse.json(
      { error: 'Migration secret not configured' },
      { status: 500 },
    )
  }
  return null
}

export async function GET() {
  const secretCheck = ensureMigrationSecretConfigured()
  if (secretCheck) {
    return secretCheck
  }

  return NextResponse.json({
    available: MIGRATION_ORDER,
    usage:
      'POST with Authorization: Bearer <secret> and JSON body { "targets": ["about", "pages"] } or { "targets": ["all"] }',
  })
}

export async function POST(request: NextRequest) {
  const secretCheck = ensureMigrationSecretConfigured()
  if (secretCheck) {
    return secretCheck
  }

  const providedSecret = getMigrationSecret(request)
  if (!providedSecret || providedSecret !== env.MIGRATION_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json().catch(() => ({}))
  const targets = Array.isArray(body?.targets) ? body.targets : ['all']
  const targetSet = new Set<string>(
    targets.includes('all') ? MIGRATION_ORDER : targets,
  )

  const payload = await getPayload({ config: configPromise })
  const results: Record<string, 'success' | 'failed' | 'skipped'> = {}

  for (const migrationName of MIGRATION_ORDER) {
    if (!targetSet.has(migrationName)) {
      continue
    }

    const migrate = MIGRATIONS[migrationName]
    if (!migrate) {
      results[migrationName] = 'skipped'
      continue
    }

    try {
      await migrate(payload)
      results[migrationName] = 'success'
    } catch (error) {
      console.error(`Migration ${migrationName} failed`, error)
      results[migrationName] = 'failed'
    }
  }

  const unknownTargets = [...targetSet].filter((name) => !MIGRATIONS[name])

  return NextResponse.json({
    message: 'Migration completed',
    results,
    unknownTargets,
  })
}
