import { Payload } from 'payload';
import { migrateMedia } from './utils/migrate-media';
import { fetchStrapiData } from './utils/fetch-strapi';
import StrapiBunkerResponse from './types/bunker.strapi.type';

export async function migrateBunker(payload: Payload) {
  try {
    console.log('Starting Bunker migration...');

    // Fetch data from Strapi API
    const strapiData = await fetchStrapiData<StrapiBunkerResponse>('bunker');
    console.log('Successfully fetched Bunker data from Strapi');

    const { attributes } = strapiData.data;

    // Migrate header section
    console.log('Migrating header section...');
    const headerImageId = await migrateMedia(payload, attributes.Header.HeaderImage, 'bunker');
    if (!headerImageId) {
      throw new Error('Failed to migrate header image');
    }

    // Validate and create primary button
    const hasValidPrimaryButton =
      attributes.Header.PrimaryButton &&
      typeof attributes.Header.PrimaryButton.Title === 'string' &&
      attributes.Header.PrimaryButton.Title.trim().length > 0 &&
      typeof attributes.Header.PrimaryButton.URL === 'string' &&
      attributes.Header.PrimaryButton.URL.trim().length > 0;

    if (!hasValidPrimaryButton) {
      throw new Error('Primary button is required and must have valid title and URL');
    }

    const primaryButtonBlock = [
      {
        blockType: 'button' as const,
        button: {
          title: attributes.Header.PrimaryButton.Title.trim(),
          url: attributes.Header.PrimaryButton.URL.trim(),
        },
      },
    ];

    // Validate and create secondary button
    const hasValidSecondaryButton =
      attributes.Header.SecondaryButton &&
      typeof attributes.Header.SecondaryButton.Title === 'string' &&
      attributes.Header.SecondaryButton.Title.trim().length > 0 &&
      typeof attributes.Header.SecondaryButton.URL === 'string' &&
      attributes.Header.SecondaryButton.URL.trim().length > 0;

    if (!hasValidSecondaryButton) {
      throw new Error('Secondary button is required and must have valid title and URL');
    }

    const secondaryButtonBlock = [
      {
        blockType: 'button' as const,
        button: {
          title: attributes.Header.SecondaryButton.Title.trim(),
          url: attributes.Header.SecondaryButton.URL.trim(),
        },
      },
    ];

    const headerSection: any = {
      pageHeader: {
        subtitle: attributes.Header.Heading.Subtitle || '',
        title: attributes.Header.Heading.Title || '',
        description: attributes.Header.Heading.Description || '',
      },
      primaryButton: primaryButtonBlock,
      secondaryButton: secondaryButtonBlock,
      headerImage: headerImageId,
      list: attributes.Header.List.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
    };

    // Migrate HowItWorks section
    console.log('Migrating HowItWorks section...');
    const howItWorksSection: any = {
      title: attributes.HowItWorks.Title || '',
      list: attributes.HowItWorks.List.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
    };

    // Migrate Pricing section
    console.log('Migrating Pricing section...');
    const pricingSection: any = {
      title: attributes.Pricing.Title || '',
      description: attributes.Pricing.Description || '',
      subtitle: attributes.Pricing.Subtitle || '',
      metalRates: attributes.Pricing.MetalRates.map((rate) => ({
        min: rate.Min,
        max: rate.Max,
        allocatedRate: rate.AllocatedRate,
        segregatedRate: rate.SegregatedRate,
      })),
    };

    // Migrate WhyBattalionBunker section
    console.log('Migrating WhyBattalionBunker section...');
    const whyBattalionBunkerButton = [
      {
        blockType: 'button' as const,
        button: {
          title: attributes.WhyBattalionBunker.Button.Title.trim(),
          url: attributes.WhyBattalionBunker.Button.URL.trim(),
        },
      },
    ];

    // Migrate icons for WhyBattalionBunker list items
    const whyBattalionBunkerList = await Promise.all(
      attributes.WhyBattalionBunker.List.map(async (item) => {
        const iconId = await migrateMedia(payload, item.Icon, 'bunker');
        if (!iconId) {
          throw new Error(`Failed to migrate icon for item: ${item.Heading}`);
        }
        return {
          heading: item.Heading || '',
          description: item.Description || '',
          icon: iconId,
        };
      }),
    );

    const whyBattalionBunkerSection: any = {
      title: attributes.WhyBattalionBunker.Title || '',
      description: attributes.WhyBattalionBunker.Description || '',
      button: whyBattalionBunkerButton,
      list: whyBattalionBunkerList,
    };

    // Migrate FAQ section
    console.log('Migrating FAQ section...');
    const faqQuestions = attributes.FAQ.Questions.map((question) => {
      return {
        question: question.Question || '',
        answerMarkdown: question.Answer || '',
      };
    });

    const faqBlock = [
      {
        blockType: 'faq' as const,
        title: attributes.FAQ.Title || '',
        questions: faqQuestions,
      },
    ];

    // Migrate ConsultationsCTA section
    console.log('Migrating ConsultationsCTA section...');
    const consultationsCTASection: any = {
      title: attributes.ConsultationsCTA.Title || '',
      description: attributes.ConsultationsCTA.Description || '',
      primaryButton: {
        title: attributes.ConsultationsCTA.PrimaryButton.Title.trim(),
        url: attributes.ConsultationsCTA.PrimaryButton.URL.trim(),
      },
      secondaryButton: {
        title: attributes.ConsultationsCTA.SecondaryButton.Title.trim(),
        url: attributes.ConsultationsCTA.SecondaryButton.URL.trim(),
      },
    };

    // Migrate Comparison section
    console.log('Migrating Comparison section...');
    const comparisonSection: any = {
      title: attributes.Comparison.Title || '',
      tableHeader: {
        heading_1: attributes.Comparison.TableHeader.Heading_1 || '',
        heading_2: attributes.Comparison.TableHeader.Heading_2 || '',
        heading_3: attributes.Comparison.TableHeader.Heading_3 || '',
        heading_4: attributes.Comparison.TableHeader.Heading_4 || '',
      },
      tableBody: attributes.Comparison.TableBody.map((row) => ({
        feature: row.Feature || '',
        battalionBunker: (row.BattalionBunker === 'Yes' ? 'Yes' : 'No') as 'Yes' | 'No',
        legacyStorage: (row.LegacyStorage === 'Yes' ? 'Yes' : 'No') as 'Yes' | 'No',
        homeStorage: (row.HomeStorage === 'Yes' ? 'Yes' : 'No') as 'Yes' | 'No',
      })),
    };

    // Create new Bunker global using updateGlobal (creates if doesn't exist)
    const bunkerData = {
      header: headerSection,
      howItWorks: howItWorksSection,
      pricing: pricingSection,
      whyBattalionBunker: whyBattalionBunkerSection,
      faq: faqBlock,
      consultationsCTA: consultationsCTASection,
      comparison: comparisonSection,
    } as any; // Type assertion needed - IDs may be string or number, and section types are complex

    console.log('Creating Bunker global...');
    await payload.updateGlobal({
      slug: 'bunker',
      data: bunkerData,
    });
    console.log('Bunker global created successfully');

    console.log('Bunker migration completed successfully');
  } catch (error) {
    console.error('Error migrating bunker', JSON.stringify(error, null, 2));
    throw error;
  }
}
