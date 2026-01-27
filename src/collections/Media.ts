import { env } from '@/libs/env';
import type { CollectionConfig } from 'payload';

const disableLocalStorage =
  Boolean(env.VERCEL_BLOB_READ_WRITE_TOKEN) ||
  Boolean(
    env.S3_BUCKET &&
      env.S3_ACCESS_KEY_ID &&
      env.S3_SECRET_ACCESS_KEY &&
      env.S3_ENDPOINT,
  );

  console.log('disableLocalStorage', disableLocalStorage);

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: {
        description: 'Location of the media file',
      },
      defaultValue: 'Media Library',
    },
  ],
  upload: {
    disableLocalStorage,
    formatOptions: {
      format: 'webp',
    },
    imageSizes: [
      {
        name: 'thumbnail',
        width: 245,
        position: 'centre',
        crop: 'centre',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'small',
        width: 500,
        position: 'centre',
        crop: 'centre',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'medium',
        width: 750,
        position: 'centre',
        crop: 'centre',
        formatOptions: {
          format: 'webp',
        },
      },
      {
        name: 'large',
        width: 1000,
        position: 'centre',
        crop: 'centre',
        formatOptions: {
          format: 'webp',
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    focalPoint: true,
  },
  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        // Transform relative proxy URLs to direct Vercel Blob URLs
        const transformURL = async (
          url: string | null | undefined,
          filename: string | null | undefined,
        ): Promise<string | null | undefined> => {
          if (!url || !url.startsWith('/api/media/file/')) {
            return url;
          }

          try {
            // Get the media collection config
            const mediaCollection = req.payload.config.collections.find((c) => c.slug === 'media');

            if (!mediaCollection?.upload?.adapter) {
              return url;
            }

            const adapter = mediaCollection.upload.adapter;

            // Check if adapter is an object with generateURL method
            if (
              adapter &&
              typeof adapter === 'object' &&
              adapter !== null &&
              'generateURL' in adapter
            ) {
              const generateURL = (
                adapter as {
                  generateURL?: (args: { filename: string; prefix: string }) => Promise<string>;
                }
              ).generateURL;
              if (typeof generateURL === 'function') {
                const blobFilename = filename || url.split('/').pop()?.replace(/%20/g, ' ') || '';
                if (blobFilename) {
                  const blobURL = await generateURL({
                    filename: blobFilename,
                    prefix: '',
                  });
                  return blobURL || url;
                }
              }
            }

            return url;
          } catch (error) {
            console.error('Error transforming URL to blob URL:', error);
            return url;
          }
        };

        // Transform main URL
        if (doc.url) {
          doc.url = await transformURL(doc.url, doc.filename || undefined);
        }

        // Transform thumbnail URL
        if (doc.thumbnailURL) {
          doc.thumbnailURL = await transformURL(doc.thumbnailURL, doc.filename || undefined);
        }

        // Transform sizes URLs
        if (doc.sizes) {
          for (const [sizeKey, size] of Object.entries(doc.sizes)) {
            if (
              size &&
              typeof size === 'object' &&
              size !== null &&
              'url' in size &&
              'filename' in size
            ) {
              const sizeObj = size as { url?: string | null; filename?: string | null };
              const transformedURL = await transformURL(sizeObj.url, sizeObj.filename || undefined);
              if (transformedURL) {
                sizeObj.url = transformedURL;
              }
            }
          }
        }

        return doc;
      },
    ],
  },
};
