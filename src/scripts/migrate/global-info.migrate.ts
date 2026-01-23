import { Payload } from 'payload';
import { migrateMedia } from './utils/migrate-media';
import { fetchStrapiData } from './utils/fetch-strapi';
import StrapiGlobalInfoResponse from './types/global-info.strapi.type';

export async function migrateGlobalInfo(payload: Payload) {
  try {
    console.log('Starting GlobalInfo migration...');

    // Fetch data from Strapi API
    const strapiData = await fetchStrapiData<StrapiGlobalInfoResponse>('global-info');
    console.log('Successfully fetched GlobalInfo data from Strapi');

    const { attributes } = strapiData.data;

    // Migrate logo image
    console.log('Migrating logo image...');
    const logoId = await migrateMedia(payload, attributes.Logo, 'global-info');
    if (!logoId) {
      throw new Error('Failed to migrate logo image');
    }

    // Migrate mask image
    console.log('Migrating mask image...');
    const maskImageId = await migrateMedia(payload, attributes.MaskImage, 'global-info');
    if (!maskImageId) {
      throw new Error('Failed to migrate mask image');
    }

    // Create new GlobalInfo global using updateGlobal (creates if doesn't exist)
    const globalInfoData = {
      logo: logoId,
      maskImage: maskImageId,
    } as any; // Type assertion needed - IDs may be string or number

    console.log('Creating GlobalInfo global...');
    await payload.updateGlobal({
      slug: 'global-info',
      data: globalInfoData,
    });
    console.log('GlobalInfo global created successfully');

    console.log('GlobalInfo migration completed successfully');
  } catch (error) {
    console.error('Error migrating global-info', JSON.stringify(error, null, 2));
    throw error;
  }
}
