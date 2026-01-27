import { postgresAdapter } from '@payloadcms/db-postgres';
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { buildConfig } from 'payload';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { s3Storage } from '@payloadcms/storage-s3';
import { oAuth2Plugin } from '@payloadcms/plugin-oauth2';

import { Users } from './collections/Users/config';
import { oauthVerify } from './libs/oauthVerify';
import { Media } from './collections/Media';
import { Pages } from './collections/Pages';
import { env } from './libs/env';
import { GlobalInfo } from './globals/GlobalInfo';
import { About } from './globals/About';
import { Bunker } from './globals/Bunker';
import { Consultation } from './globals/Consultation';
import { Contact } from './globals/Contact';
import { Footer } from './globals/Footer';
import { Homepage } from './globals/Homepage';
import { IRA } from './globals/IRA';
import { Service } from './globals/Service';
import { Menu } from './globals/Menu';
import { seedAdmin } from './scripts/seed/seeders/admin.seeder';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    ...(env.NODE_ENV === 'local' && {
      autoLogin: {
        email: env.CMS_SEED_ADMIN_EMAIL,
        password: env.CMS_SEED_ADMIN_PASSWORD,
      },
    }),
  },
  collections: [Users, Media, Pages],
  globals: [GlobalInfo, About, Bunker, Consultation, Contact, Footer, Homepage, IRA, Service, Menu],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => {
      return [...defaultFeatures, FixedToolbarFeature()];
    },
  }),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: env.DATABASE_URL,
    },
  }),
  sharp,
  plugins: [
    // Vercel Blob Storage - Enable when token is configured
    ...(env.VERCEL_BLOB_READ_WRITE_TOKEN
      ? [
        vercelBlobStorage({
          enabled: true,
          collections: {
            media: true,
          },
          token: env.VERCEL_BLOB_READ_WRITE_TOKEN,
        }),
      ]
      : []),
    // Cloudflare R2 Storage - Enable when S3 credentials are configured
    ...(env.S3_BUCKET && env.S3_ACCESS_KEY_ID && env.S3_SECRET_ACCESS_KEY && env.S3_ENDPOINT
      ? [
        s3Storage({
          collections: {
            media: true,
          },
          bucket: env.S3_BUCKET,
          config: {
            credentials: {
              accessKeyId: env.S3_ACCESS_KEY_ID,
              secretAccessKey: env.S3_SECRET_ACCESS_KEY,
            },
            region: 'auto', // Cloudflare R2 uses 'auto' as the region
            endpoint: env.S3_ENDPOINT,
          },
        }),
      ]
      : []),
    // Google OAuth2 Plugin - Enable when OAuth provider is configured
    ...(env.GOOGLE_OAUTH_IDENTITY_METADATA && env.GOOGLE_OAUTH_CLIENT_ID
      ? [
        oAuth2Plugin({
          strategyName: 'oauth',
          collections: [
            {
              slug: 'users',
              // THIS NEXT LINE IS IMPORTANT FOR GOOGLE
              authorizationURLParams: { access_type: 'offline', prompt: 'consent' },
              clientID: env.GOOGLE_OAUTH_CLIENT_ID,
              clientSecret: env.GOOGLE_OAUTH_CLIENT_SECRET,
              identityMetadata: env.GOOGLE_OAUTH_IDENTITY_METADATA,
              // THIS NEXT LINE IS IMPORTANT FOR GOOGLE
              token: 'id_token',
              scope: ['openid', 'profile', 'email'],
              usernameField: {
                type: 'email',
                name: 'email',
                unique: true,
                admin: {
                  position: 'sidebar',
                  readOnly: true,
                },
              },
              disableLocalStrategy: false,
              LoginButton: '/components/GoogleLoginButton#GoogleLoginButton',
              verify: oauthVerify,
            },
          ],
        }),
      ]
      : []),
  ],
});
