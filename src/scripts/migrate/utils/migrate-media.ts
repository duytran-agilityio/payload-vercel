import { Payload } from 'payload';

interface StrapiImageAttributes {
  name: string;
  alternativeText: string | null;
  url: string;
  mime: string;
  size: number;
  width: number;
  height: number;
}

interface StrapiImage {
  data: {
    id: number;
    attributes: StrapiImageAttributes;
  } | null;
}

/**
 * Downloads an image from a URL and creates a media entry in Payload
 * @param payload - Payload instance
 * @param strapiImage - Strapi image data structure
 * @param location - Location tag for the media (e.g., 'about', 'bunker')
 * @returns Media ID or null if migration failed
 */
export async function migrateMedia(
  payload: Payload,
  strapiImage: StrapiImage,
  location: string = 'migration',
): Promise<string | number | null> {
  if (!strapiImage?.data) {
    return null;
  }

  const { attributes } = strapiImage.data;
  const imageUrl = attributes.url;

  try {
    console.log(`Checking if media ${attributes.name} already exists...`);
    // Extract base name without extension
    const baseName = attributes.name.replace(/\.[^/.]+$/, '');
    const webpFilename = `${baseName}.webp`;

    // Check if media already exists by filename
    // Payload converts images to webp, so check for both original name and webp variant
    const existingMedia = await payload.find({
      collection: 'media',
      where: {
        or: [
          {
            filename: {
              equals: attributes.name,
            },
          },
          {
            filename: {
              equals: webpFilename,
            },
          },
        ],
      },
      limit: 1,
    });

    if (existingMedia.docs.length > 0) {
      console.log(
        `Media ${attributes.name} (or ${webpFilename}) already exists, skipping download`,
      );
      return existingMedia.docs[0].id as string | number;
    }

    // Download the image
    console.log(`Downloading image from ${imageUrl}...`);
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Create media entry in Payload
    // Payload expects file as an object with data (Buffer), mimetype, name, and size
    const media = await payload.create({
      collection: 'media',
      data: {
        alt: attributes.alternativeText || attributes.name,
        location,
      } as any, // Type assertion needed until types are regenerated with generate:types
      file: {
        data: buffer,
        mimetype: attributes.mime,
        name: attributes.name,
        size: buffer.length,
      },
    });

    console.log(`Created media: ${media.id} - ${attributes.name}`);
    return media.id as string | number;
  } catch (error) {
    console.error(`Error migrating media ${attributes.name}:`, error);
    return null;
  }
}
