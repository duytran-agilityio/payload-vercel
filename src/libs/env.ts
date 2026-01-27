import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

const logEnvSummary = () => {
  const nodeEnv = process.env.NODE_ENV ?? 'unknown'
  const runtimeEnv = process.env.VERCEL_ENV ?? nodeEnv

  if (nodeEnv !== 'test') {
    console.info(`[env] Using environment: ${runtimeEnv}`)
  }
}

const formatMissingEnv = (error: unknown) => {
  if (!(error instanceof z.ZodError)) {
    return { missing: [], issues: [] }
  }

  const missing = error.issues
    .filter(
      (issue) =>
        issue.code === 'invalid_type' && issue.message.toLowerCase().includes('required'),
    )
    .map((issue) => issue.path.join('.'))

  return { missing, issues: error.issues }
}

logEnvSummary()

export const env = createEnv({
  server: {

    NODE_ENV: z.enum(['local', 'development', 'staging', 'production']),
    // Payload CMS required
    PAYLOAD_SECRET: z.string(),
    DATABASE_URL: z.string(),

    // Seed script (optional)
    CMS_SEED_ADMIN_EMAIL: z.email(),
    CMS_SEED_ADMIN_PASSWORD: z.string(),

    // strapi
    STRAPI_API_URL: z.string(),
    STRAPI_API_TOKEN: z.string(),

    // Migration endpoint
    MIGRATION_SECRET: z.string().optional(),

    // Vercel Blob Storage (optional for local development)
    BLOB_READ_WRITE_TOKEN: z.string().optional(),

    // Cloudflare R2 Storage (optional - alternative to Vercel Blob)
    S3_BUCKET: z.string().optional(),
    S3_ACCESS_KEY_ID: z.string().optional(),
    S3_SECRET_ACCESS_KEY: z.string().optional(),
    S3_ENDPOINT: z.string().optional(),

    // Google OAuth2 Plugin
    GOOGLE_OAUTH_IDENTITY_METADATA: z.string().optional(),
    GOOGLE_OAUTH_CLIENT_ID: z.string().optional(),
    GOOGLE_OAUTH_CLIENT_SECRET: z.string().optional(),
    ALLOWED_EMAIL_DOMAINS: z.string().optional(),
  },
  client: {},
  experimental__runtimeEnv: process.env,
  onValidationError: (error) => {
    const { missing, issues } = formatMissingEnv(error)
    const nodeEnv = process.env.NODE_ENV ?? 'unknown'
    const runtimeEnv = process.env.VERCEL_ENV ?? nodeEnv

    console.error('[env] Missing or invalid environment variables', {
      runtimeEnv,
      missing,
      issues,
    })

    throw error
  },
})
