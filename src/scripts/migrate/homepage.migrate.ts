import { Payload } from 'payload';
import { migrateMedia } from './utils/migrate-media';
import { fetchStrapiData } from './utils/fetch-strapi';
import StrapiHomepageResponse from './types/homepage.strapi.type';

export async function migrateHomepage(payload: Payload) {
  try {
    console.log('Starting Homepage migration...');

    // Fetch data from Strapi API
    const strapiData = await fetchStrapiData<StrapiHomepageResponse>('homepage');
    console.log('Successfully fetched Homepage data from Strapi');

    const { attributes } = strapiData.data;

    // Migrate Hero section
    console.log('Migrating Hero section...');
    const heroBannerId = await migrateMedia(payload, attributes.Hero.Banner, 'homepage');
    if (!heroBannerId) {
      throw new Error('Failed to migrate hero banner image');
    }

    const heroMobileBannerId = await migrateMedia(
      payload,
      attributes.Hero.MobileBanner,
      'homepage',
    );

    // Validate and create primary button
    const hasValidPrimaryButton =
      attributes.Hero.PrimaryButton &&
      typeof attributes.Hero.PrimaryButton.Title === 'string' &&
      attributes.Hero.PrimaryButton.Title.trim().length > 0 &&
      typeof attributes.Hero.PrimaryButton.URL === 'string' &&
      attributes.Hero.PrimaryButton.URL.trim().length > 0;

    if (!hasValidPrimaryButton) {
      throw new Error('Primary button is required and must have valid title and URL');
    }

    const primaryButtonBlock = [
      {
        blockType: 'button' as const,
        button: {
          title: attributes.Hero.PrimaryButton.Title.trim(),
          url: attributes.Hero.PrimaryButton.URL.trim(),
        },
      },
    ];

    // Validate and create secondary button
    const hasValidSecondaryButton =
      attributes.Hero.SecondaryButton &&
      typeof attributes.Hero.SecondaryButton.Title === 'string' &&
      attributes.Hero.SecondaryButton.Title.trim().length > 0 &&
      typeof attributes.Hero.SecondaryButton.URL === 'string' &&
      attributes.Hero.SecondaryButton.URL.trim().length > 0;

    if (!hasValidSecondaryButton) {
      throw new Error('Secondary button is required and must have valid title and URL');
    }

    const secondaryButtonBlock = [
      {
        blockType: 'button' as const,
        button: {
          title: attributes.Hero.SecondaryButton.Title.trim(),
          url: attributes.Hero.SecondaryButton.URL.trim(),
        },
      },
    ];

    const heroSection: any = {
      banner: heroBannerId,
      title: attributes.Hero.Title || '',
      description: attributes.Hero.Description || '',
      primaryButton: primaryButtonBlock,
      secondaryButton: secondaryButtonBlock,
      checklist: attributes.Hero.Checklist.map((item) => ({
        item: item.Item || '',
      })),
    };

    if (heroMobileBannerId) {
      heroSection.mobileBanner = heroMobileBannerId;
    }

    // Migrate Quotation section
    console.log('Migrating Quotation section...');
    const quotationImageId = await migrateMedia(payload, attributes.Quotation.Image, 'homepage');
    if (!quotationImageId) {
      throw new Error('Failed to migrate quotation image');
    }

    const quotationAdditionalImageId = await migrateMedia(
      payload,
      attributes.Quotation.AdditionalImage,
      'homepage',
    );

    const quotationMobileImageId = await migrateMedia(
      payload,
      attributes.Quotation.MobileImage,
      'homepage',
    );

    // Validate quotation button
    const quotationButtonData = attributes.Quotation.Button;
    const hasValidQuotationButton =
      quotationButtonData !== null &&
      quotationButtonData !== undefined &&
      typeof quotationButtonData.Title === 'string' &&
      quotationButtonData.Title.trim().length > 0 &&
      typeof quotationButtonData.URL === 'string' &&
      quotationButtonData.URL.trim().length > 0;

    const quotationButtonBlock = hasValidQuotationButton
      ? [
          {
            blockType: 'button' as const,
            button: {
              title: quotationButtonData!.Title.trim(),
              url: quotationButtonData!.URL.trim(),
            },
          },
        ]
      : undefined;

    const quotationSection: any = {
      quote: attributes.Quotation.Quote || '',
      author: attributes.Quotation.Author || '',
      image: quotationImageId,
    };

    if (quotationAdditionalImageId) {
      quotationSection.additionalImage = quotationAdditionalImageId;
    }
    if (quotationMobileImageId) {
      quotationSection.mobileImage = quotationMobileImageId;
    }
    if (quotationButtonBlock) {
      quotationSection.button = quotationButtonBlock;
    }

    // Migrate CompanyInfo section
    console.log('Migrating CompanyInfo section...');
    const markdownContent = attributes.CompanyInfo.Description || '';

    const sliderItems = await Promise.all(
      attributes.CompanyInfo.SliderItems.map(async (item) => {
        const imageId = await migrateMedia(payload, item.Image, 'homepage');
        if (!imageId) {
          throw new Error(`Failed to migrate image for slider item: ${item.Title}`);
        }
        return {
          title: item.Title || '',
          description: item.Description || '',
          linkText: item.LinkText || '',
          linkUrl: item.LinkURL || '',
          image: imageId,
        };
      }),
    );

    const companyInfoSection: any = {
      subTitle: attributes.CompanyInfo.SubTitle || '',
      title: attributes.CompanyInfo.Title.map((t) => ({
        title: t.Title || '',
      })),
      description: markdownContent,
      sliderItems,
    };

    // Migrate HowItWorks section
    console.log('Migrating HowItWorks section...');
    const howItWorksBackgroundImageId = await migrateMedia(
      payload,
      attributes.HowItWorks.BackgroundImage,
      'homepage',
    );
    if (!howItWorksBackgroundImageId) {
      throw new Error('Failed to migrate HowItWorks background image');
    }

    const howItWorksSection: any = {
      title: attributes.HowItWorks.Title || '',
      list: attributes.HowItWorks.List.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
      backgroundImage: howItWorksBackgroundImageId,
    };

    // Migrate Comparison section
    console.log('Migrating Comparison section...');
    const comparisonMarkdownContent = attributes.Comparison.Description || '';

    // Validate comparison link button
    const hasValidComparisonLink =
      attributes.Comparison.Link &&
      typeof attributes.Comparison.Link.Title === 'string' &&
      attributes.Comparison.Link.Title.trim().length > 0 &&
      typeof attributes.Comparison.Link.URL === 'string' &&
      attributes.Comparison.Link.URL.trim().length > 0;

    if (!hasValidComparisonLink) {
      throw new Error('Comparison link is required and must have valid title and URL');
    }

    const comparisonLinkBlock = [
      {
        blockType: 'button' as const,
        button: {
          title: attributes.Comparison.Link.Title.trim(),
          url: attributes.Comparison.Link.URL.trim(),
        },
      },
    ];

    const comparisonLogoId = await migrateMedia(payload, attributes.Comparison.Logo, 'homepage');
    const comparisonBackgroundImageId = await migrateMedia(
      payload,
      attributes.Comparison.BackgroundImage,
      'homepage',
    );

    const comparisonSection: any = {
      title: attributes.Comparison.Title || '',
      description: comparisonMarkdownContent,
      link: comparisonLinkBlock,
      battalionPros: attributes.Comparison.BattalionPros.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
      otherCons: attributes.Comparison.OtherCons.map((item) => ({
        heading: item.Heading || '',
        description: item.Description || '',
      })),
    };

    if (comparisonLogoId) {
      comparisonSection.logo = comparisonLogoId;
    }
    if (comparisonBackgroundImageId) {
      comparisonSection.backgroundImage = comparisonBackgroundImageId;
    }

    // Migrate ProductSlider section
    console.log('Migrating ProductSlider section...');
    const hasValidProductSliderLink =
      attributes.ProductSlider.Link &&
      typeof attributes.ProductSlider.Link.Title === 'string' &&
      attributes.ProductSlider.Link.Title.trim().length > 0 &&
      typeof attributes.ProductSlider.Link.URL === 'string' &&
      attributes.ProductSlider.Link.URL.trim().length > 0;

    if (!hasValidProductSliderLink) {
      throw new Error('ProductSlider link is required and must have valid title and URL');
    }

    const productSliderLinkBlock = [
      {
        blockType: 'button' as const,
        button: {
          title: attributes.ProductSlider.Link.Title.trim(),
          url: attributes.ProductSlider.Link.URL.trim(),
        },
      },
    ];

    const productSliderSection: any = {
      title: attributes.ProductSlider.Title || '',
      description: attributes.ProductSlider.Description || '',
      link: productSliderLinkBlock,
    };

    // Migrate Newsletter section
    console.log('Migrating Newsletter section...');
    const newsletterSection: any = {
      heading: attributes.Newsletter.Heading || '',
      description: attributes.Newsletter.Description || '',
    };

    // Create new Homepage global using updateGlobal (creates if doesn't exist)
    const homepageData = {
      hero: heroSection,
      quotation: quotationSection,
      companyInfo: companyInfoSection,
      howItWorks: howItWorksSection,
      comparison: comparisonSection,
      productSlider: productSliderSection,
      newsletter: newsletterSection,
    } as any; // Type assertion needed - IDs may be string or number, and section types are complex

    console.log('Creating Homepage global...');
    await payload.updateGlobal({
      slug: 'homepage',
      data: homepageData,
    });
    console.log('Homepage global created successfully');

    console.log('Homepage migration completed successfully');
  } catch (error) {
    console.error('Error migrating homepage', JSON.stringify(error, null, 2));
    throw error;
  }
}

