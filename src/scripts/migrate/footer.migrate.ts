import { Payload } from 'payload';
import { migrateMedia } from './utils/migrate-media';
import { fetchStrapiData } from './utils/fetch-strapi';
import StrapiFooterResponse from './types/footer.strapi.type';

export async function migrateFooter(payload: Payload) {
  try {
    console.log('Starting Footer migration...');

    // Fetch data from Strapi API
    const strapiData = await fetchStrapiData<StrapiFooterResponse>('footer');
    console.log('Successfully fetched Footer data from Strapi');

    const { attributes } = strapiData.data;

    // Migrate logo image
    console.log('Migrating logo image...');
    const logoId = await migrateMedia(payload, attributes.Logo, 'footer');
    if (!logoId) {
      throw new Error('Failed to migrate logo image');
    }

    // Migrate socials section
    console.log('Migrating socials section...');
    const socialsSection: any = {
      instagram: attributes.Socials.Instagram || 'https://',
      youtube: attributes.Socials.YouTube || 'https://',
      x: attributes.Socials.X || 'https://',
      tiktok: attributes.Socials.TikTok || 'https://',
      linkedin: attributes.Socials.LinkedIn || 'https://',
      facebook: attributes.Socials.Facebook || 'https://',
    };

    // Migrate menu columns
    console.log('Migrating menu columns...');
    const menuColumns = attributes.MenuColumns.map((column) => ({
      title: column.Title || '',
      items: column.Items.map((item) => ({
        item: item.Item || '',
        link: item.Link || '',
      })),
    }));

    // Create new Footer global using updateGlobal (creates if doesn't exist)
    const footerData = {
      logo: logoId,
      socials: socialsSection,
      menuColumns,
    } as any; // Type assertion needed - IDs may be string or number, and section types are complex

    console.log('Creating Footer global...');
    await payload.updateGlobal({
      slug: 'footer',
      data: footerData,
    });
    console.log('Footer global created successfully');

    console.log('Footer migration completed successfully');
  } catch (error) {
    console.error('Error migrating footer', JSON.stringify(error, null, 2));
    throw error;
  }
}

