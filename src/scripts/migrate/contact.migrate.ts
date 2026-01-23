import { Payload } from 'payload';
import { fetchStrapiData } from './utils/fetch-strapi';
import StrapiContactResponse from './types/contact.strapi.type';

export async function migrateContact(payload: Payload) {
  try {
    console.log('Starting Contact migration...');

    // Fetch data from Strapi API
    const strapiData = await fetchStrapiData<StrapiContactResponse>('contact');
    console.log('Successfully fetched Contact data from Strapi');

    const { attributes } = strapiData.data;

    // Migrate heading section
    console.log('Migrating heading section...');
    const headingSection: any = {
      heading: attributes.Heading.Heading || '',
      description: attributes.Heading.Description || '',
    };

    // Get markdown content
    const markdownContent = attributes.ContactDetails || '';

    // Create new Contact global using updateGlobal (creates if doesn't exist)
    const contactData = {
      heading: headingSection,
      contactDetails: markdownContent,
    } as any; // Type assertion needed - IDs may be string or number, and section types are complex

    console.log('Creating Contact global...');
    await payload.updateGlobal({
      slug: 'contact',
      data: contactData,
    });
    console.log('Contact global created successfully');

    console.log('Contact migration completed successfully');
  } catch (error) {
    console.error('Error migrating contact', JSON.stringify(error, null, 2));
    throw error;
  }
}

