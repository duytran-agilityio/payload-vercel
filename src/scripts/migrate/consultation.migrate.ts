import { Payload } from 'payload';
import { migrateMedia } from './utils/migrate-media';
import { fetchStrapiData } from './utils/fetch-strapi';
import StrapiConsultationResponse from './types/consultation.strapi.type';

export async function migrateConsultation(payload: Payload) {
  try {
    console.log('Starting Consultation migration...');

    // Fetch data from Strapi API
    const strapiData = await fetchStrapiData<StrapiConsultationResponse>('consultation');
    console.log('Successfully fetched Consultation data from Strapi');

    const { attributes } = strapiData.data;

    // Migrate heading section
    console.log('Migrating heading section...');
    const headingSection: any = {
      pageHeader: {
        subtitle: attributes.Heading.Heading.Subtitle || '',
        title: attributes.Heading.Heading.Title || '',
        description: attributes.Heading.Heading.Description || '',
      },
    };

    // Migrate link cards with images
    console.log('Migrating link cards...');
    const linkCards = await Promise.all(
      attributes.Heading.LinkCard.map(async (card) => {
        const imageId = await migrateMedia(payload, card.Image, 'consultation');
        if (!imageId) {
          throw new Error(`Failed to migrate image for link card: ${card.Title}`);
        }
        return {
          title: card.Title || '',
          description: card.Description || '',
          link: card.Link || '',
          linkTitle: card.LinkTitle || 'Learn More',
          image: imageId,
        };
      }),
    );

    headingSection.linkCard = linkCards;

    // Migrate information section
    console.log('Migrating information section...');
    const informationSection: any = {
      title: attributes.Information.Title || '',
      description: attributes.Information.Description || '',
      items: attributes.Information.Items.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
    };

    // Create new Consultation global using updateGlobal (creates if doesn't exist)
    const consultationData = {
      heading: headingSection,
      information: informationSection,
    } as any; // Type assertion needed - IDs may be string or number, and section types are complex

    console.log('Creating Consultation global...');
    await payload.updateGlobal({
      slug: 'consultation',
      data: consultationData,
    });
    console.log('Consultation global created successfully');

    console.log('Consultation migration completed successfully');
  } catch (error) {
    console.error('Error migrating consultation', JSON.stringify(error, null, 2));
    throw error;
  }
}

