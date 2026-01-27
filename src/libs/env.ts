import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

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
    VERCEL_BLOB_READ_WRITE_TOKEN: z.string().optional(),

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
})
