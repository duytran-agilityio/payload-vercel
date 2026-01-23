import { Payload } from 'payload';
import { migrateMedia } from './utils/migrate-media';
import { fetchStrapiData } from './utils/fetch-strapi';
import StrapiIRAResponse from './types/ira.strapi.type';

export async function migrateIRA(payload: Payload) {
  try {
    console.log('Starting IRA migration...');

    // Fetch data from Strapi API
    const strapiData = await fetchStrapiData<StrapiIRAResponse>('ira');
    console.log('Successfully fetched IRA data from Strapi');

    const { attributes } = strapiData.data;

    // Migrate Header section
    console.log('Migrating Header section...');
    const headerImageId = await migrateMedia(payload, attributes.Header.Image, 'ira');
    if (!headerImageId) {
      throw new Error('Failed to migrate header image');
    }

    const headerSection: any = {
      pageHeader: {
        subtitle: attributes.Header.Heading.Subtitle || '',
        title: attributes.Header.Heading.Title || '',
        description: attributes.Header.Heading.Description || '',
      },
      image: headerImageId,
    };

    // Migrate WhyUs section
    console.log('Migrating WhyUs section...');
    const whyUsImageId = await migrateMedia(payload, attributes.WhyUs.Image, 'ira');
    if (!whyUsImageId) {
      throw new Error('Failed to migrate WhyUs image');
    }

    const whyUsSection: any = {
      title: attributes.WhyUs.Title || '',
      description: attributes.WhyUs.Description || '',
      image: whyUsImageId,
      list: attributes.WhyUs.List.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
    };

    // Migrate Benefits section
    console.log('Migrating Benefits section...');
    const benefitsSection: any = {
      title: attributes.Benefits.Title || '',
      list: attributes.Benefits.List.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
    };

    // Migrate HowToGetStarted section
    console.log('Migrating HowToGetStarted section...');
    const howToGetStartedSection: any = {
      title: attributes.HowToGetStarted.Title || '',
      list: attributes.HowToGetStarted.List.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
    };

    // Migrate ConsultationsCTA section
    console.log('Migrating ConsultationsCTA section...');
    const hasValidPrimaryButton =
      attributes.ConsultationsCTA.PrimaryButton &&
      typeof attributes.ConsultationsCTA.PrimaryButton.Title === 'string' &&
      attributes.ConsultationsCTA.PrimaryButton.Title.trim().length > 0 &&
      typeof attributes.ConsultationsCTA.PrimaryButton.URL === 'string' &&
      attributes.ConsultationsCTA.PrimaryButton.URL.trim().length > 0;

    if (!hasValidPrimaryButton) {
      throw new Error('ConsultationsCTA primaryButton is required and must have valid title and URL');
    }

    const hasValidSecondaryButton =
      attributes.ConsultationsCTA.SecondaryButton &&
      typeof attributes.ConsultationsCTA.SecondaryButton.Title === 'string' &&
      attributes.ConsultationsCTA.SecondaryButton.Title.trim().length > 0 &&
      typeof attributes.ConsultationsCTA.SecondaryButton.URL === 'string' &&
      attributes.ConsultationsCTA.SecondaryButton.URL.trim().length > 0;

    const consultationsCTASection: any = {
      title: attributes.ConsultationsCTA.Title || '',
      description: attributes.ConsultationsCTA.Description || '',
      primaryButton: {
        title: attributes.ConsultationsCTA.PrimaryButton.Title.trim(),
        url: attributes.ConsultationsCTA.PrimaryButton.URL.trim(),
      },
    };

    // Secondary button is optional
    if (hasValidSecondaryButton) {
      consultationsCTASection.secondaryButton = {
        title: attributes.ConsultationsCTA.SecondaryButton.Title.trim(),
        url: attributes.ConsultationsCTA.SecondaryButton.URL.trim(),
      };
    }

    // Create new IRA global using updateGlobal (creates if doesn't exist)
    const iraData = {
      header: headerSection,
      whyUs: whyUsSection,
      benefits: benefitsSection,
      howToGetStarted: howToGetStartedSection,
      consultationsCTA: consultationsCTASection,
    } as any; // Type assertion needed - IDs may be string or number, and section types are complex

    console.log('Creating IRA global...');
    await payload.updateGlobal({
      slug: 'ira',
      data: iraData,
    });
    console.log('IRA global created successfully');

    console.log('IRA migration completed successfully');
  } catch (error) {
    console.error('Error migrating IRA', JSON.stringify(error, null, 2));
    throw error;
  }
}

