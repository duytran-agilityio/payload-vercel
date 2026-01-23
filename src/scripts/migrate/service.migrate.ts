import { Payload } from 'payload';
import { migrateMedia } from './utils/migrate-media';
import { fetchStrapiData } from './utils/fetch-strapi';
import StrapiServiceResponse from './types/service.strapi.type';

export async function migrateService(payload: Payload) {
  try {
    console.log('Starting Service migration...');

    // Fetch data from Strapi API
    const strapiData = await fetchStrapiData<StrapiServiceResponse>('service');
    console.log('Successfully fetched Service data from Strapi');

    const { attributes } = strapiData.data;

    // Migrate Header section
    console.log('Migrating Header section...');
    const headerSection: any = {
      pageHeader: {
        subtitle: attributes.Header.Heading.Subtitle || '',
        title: attributes.Header.Heading.Title || '',
        description: attributes.Header.Heading.Description || '',
      },
    };

    // Migrate link cards with images
    console.log('Migrating link cards...');
    const linkCards = await Promise.all(
      attributes.Header.LinkCard.map(async (card) => {
        const imageId = await migrateMedia(payload, card.Image, 'service');
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

    headerSection.linkCard = linkCards;

    // Migrate Consultations section
    console.log('Migrating Consultations section...');
    const consultationsImageId = await migrateMedia(
      payload,
      attributes.Consultations.Image,
      'service',
    );
    if (!consultationsImageId) {
      throw new Error('Failed to migrate Consultations image');
    }

    const consultationsSection: any = {
      title: attributes.Consultations.Title || '',
      description: attributes.Consultations.Description || '',
      image: consultationsImageId,
      list: attributes.Consultations.List.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
    };

    // Migrate ConsultationsCTA_1 section
    console.log('Migrating ConsultationsCTA_1 section...');
    const hasValidPrimaryButton1 =
      attributes.ConsultationsCTA_1.PrimaryButton &&
      typeof attributes.ConsultationsCTA_1.PrimaryButton.Title === 'string' &&
      attributes.ConsultationsCTA_1.PrimaryButton.Title.trim().length > 0 &&
      typeof attributes.ConsultationsCTA_1.PrimaryButton.URL === 'string' &&
      attributes.ConsultationsCTA_1.PrimaryButton.URL.trim().length > 0;

    if (!hasValidPrimaryButton1) {
      throw new Error(
        'ConsultationsCTA_1 primaryButton is required and must have valid title and URL',
      );
    }

    const primaryButton1Block = [
      {
        blockType: 'button' as const,
        button: {
          title: attributes.ConsultationsCTA_1.PrimaryButton.Title.trim(),
          url: attributes.ConsultationsCTA_1.PrimaryButton.URL.trim(),
        },
      },
    ];

    const hasValidSecondaryButton1 =
      attributes.ConsultationsCTA_1.SecondaryButton !== null &&
      attributes.ConsultationsCTA_1.SecondaryButton !== undefined &&
      typeof attributes.ConsultationsCTA_1.SecondaryButton.Title === 'string' &&
      attributes.ConsultationsCTA_1.SecondaryButton.Title.trim().length > 0 &&
      typeof attributes.ConsultationsCTA_1.SecondaryButton.URL === 'string' &&
      attributes.ConsultationsCTA_1.SecondaryButton.URL.trim().length > 0;

    const consultationsCTA1Section: any = {
      title: attributes.ConsultationsCTA_1.Title || '',
      description: attributes.ConsultationsCTA_1.Description || '',
      primaryButton: primaryButton1Block,
    };

    // Secondary button is optional
    if (hasValidSecondaryButton1) {
      consultationsCTA1Section.secondaryButton = [
        {
          blockType: 'button' as const,
          button: {
            title: attributes.ConsultationsCTA_1.SecondaryButton!.Title.trim(),
            url: attributes.ConsultationsCTA_1.SecondaryButton!.URL.trim(),
          },
        },
      ];
    }

    // Migrate SecureStorage section
    console.log('Migrating SecureStorage section...');
    const secureStorageImageId = await migrateMedia(
      payload,
      attributes.SecureStorage.Image,
      'service',
    );
    if (!secureStorageImageId) {
      throw new Error('Failed to migrate SecureStorage image');
    }

    const secureStorageSection: any = {
      title: attributes.SecureStorage.Title || '',
      description: attributes.SecureStorage.Description || '',
      image: secureStorageImageId,
      list: attributes.SecureStorage.List.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
    };

    // Migrate IRA section
    console.log('Migrating IRA section...');
    const iraImageId = await migrateMedia(payload, attributes.IRA.Image, 'service');
    if (!iraImageId) {
      throw new Error('Failed to migrate IRA image');
    }

    const iraMobileImageId = await migrateMedia(payload, attributes.IRA.MobileImage, 'service');

    // Validate IRA button
    const hasValidIRAButton =
      attributes.IRA.Button &&
      typeof attributes.IRA.Button.Title === 'string' &&
      attributes.IRA.Button.Title.trim().length > 0 &&
      typeof attributes.IRA.Button.URL === 'string' &&
      attributes.IRA.Button.URL.trim().length > 0;

    if (!hasValidIRAButton) {
      throw new Error('IRA button is required and must have valid title and URL');
    }

    const iraButtonBlock = [
      {
        blockType: 'button' as const,
        button: {
          title: attributes.IRA.Button.Title.trim(),
          url: attributes.IRA.Button.URL.trim(),
        },
      },
    ];

    const iraSection: any = {
      title: attributes.IRA.Title || '',
      description: attributes.IRA.Description || '',
      image: iraImageId,
      list: attributes.IRA.List.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
      button: iraButtonBlock,
    };

    if (iraMobileImageId) {
      iraSection.mobileImage = iraMobileImageId;
    }

    // Migrate ConsultationsCTA_2 section
    console.log('Migrating ConsultationsCTA_2 section...');
    const hasValidPrimaryButton2 =
      attributes.ConsultationsCTA_2.PrimaryButton &&
      typeof attributes.ConsultationsCTA_2.PrimaryButton.Title === 'string' &&
      attributes.ConsultationsCTA_2.PrimaryButton.Title.trim().length > 0 &&
      typeof attributes.ConsultationsCTA_2.PrimaryButton.URL === 'string' &&
      attributes.ConsultationsCTA_2.PrimaryButton.URL.trim().length > 0;

    if (!hasValidPrimaryButton2) {
      throw new Error(
        'ConsultationsCTA_2 primaryButton is required and must have valid title and URL',
      );
    }

    const primaryButton2Block = [
      {
        blockType: 'button' as const,
        button: {
          title: attributes.ConsultationsCTA_2.PrimaryButton.Title.trim(),
          url: attributes.ConsultationsCTA_2.PrimaryButton.URL.trim(),
        },
      },
    ];

    const hasValidSecondaryButton2 =
      attributes.ConsultationsCTA_2.SecondaryButton !== null &&
      attributes.ConsultationsCTA_2.SecondaryButton !== undefined &&
      typeof attributes.ConsultationsCTA_2.SecondaryButton.Title === 'string' &&
      attributes.ConsultationsCTA_2.SecondaryButton.Title.trim().length > 0 &&
      typeof attributes.ConsultationsCTA_2.SecondaryButton.URL === 'string' &&
      attributes.ConsultationsCTA_2.SecondaryButton.URL.trim().length > 0;

    const consultationsCTA2Section: any = {
      title: attributes.ConsultationsCTA_2.Title || '',
      description: attributes.ConsultationsCTA_2.Description || '',
      primaryButton: primaryButton2Block,
    };

    // Secondary button is optional
    if (hasValidSecondaryButton2) {
      consultationsCTA2Section.secondaryButton = [
        {
          blockType: 'button' as const,
          button: {
            title: attributes.ConsultationsCTA_2.SecondaryButton!.Title.trim(),
            url: attributes.ConsultationsCTA_2.SecondaryButton!.URL.trim(),
          },
        },
      ];
    }

    // Create new Service global using updateGlobal (creates if doesn't exist)
    const serviceData = {
      header: headerSection,
      consultations: consultationsSection,
      consultationsCTA_1: consultationsCTA1Section,
      secureStorage: secureStorageSection,
      ira: iraSection,
      consultationsCTA_2: consultationsCTA2Section,
    } as any; // Type assertion needed - IDs may be string or number, and section types are complex

    console.log('Creating Service global...');
    await payload.updateGlobal({
      slug: 'service',
      data: serviceData,
    });
    console.log('Service global created successfully');

    console.log('Service migration completed successfully');
  } catch (error) {
    console.error('Error migrating service', JSON.stringify(error, null, 2));
    throw error;
  }
}
