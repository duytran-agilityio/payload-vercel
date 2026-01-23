interface StrapiImage {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        large?: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
          sizeInBytes: number;
        };
        small?: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
          sizeInBytes: number;
        };
        medium?: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
          sizeInBytes: number;
        };
        thumbnail?: {
          ext: string;
          url: string;
          hash: string;
          mime: string;
          name: string;
          path: string | null;
          size: number;
          width: number;
          height: number;
          sizeInBytes: number;
        };
      } | null;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: any;
      createdAt: string;
      updatedAt: string;
    };
  } | null;
}

export default interface StrapiHomepageResponse {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      Hero: {
        id: number;
        Title: string;
        Description: string;
        Banner: StrapiImage;
        MobileBanner: StrapiImage;
        PrimaryButton: {
          id: number;
          Title: string;
          URL: string;
        };
        SecondaryButton: {
          id: number;
          Title: string;
          URL: string;
        };
        Checklist: Array<{
          id: number;
          Item: string;
        }>;
      };
      Quotation: {
        id: number;
        Quote: string;
        Author: string;
        Image: StrapiImage;
        AdditionalImage: StrapiImage;
        Button: {
          id: number;
          Title: string;
          URL: string;
        } | null;
        MobileImage: StrapiImage;
      };
      CompanyInfo: {
        id: number;
        SubTitle: string;
        Description: string;
        Title: Array<{
          id: number;
          Title: string;
        }>;
        SliderItems: Array<{
          id: number;
          Title: string;
          Description: string;
          LinkText: string;
          LinkURL: string;
          Image: StrapiImage;
        }>;
      };
      HowItWorks: {
        id: number;
        Title: string;
        List: Array<{
          id: number;
          Heading: string;
          Description: string;
        }>;
        BackgroundImage: StrapiImage;
      };
      Comparison: {
        id: number;
        Title: string;
        Description: string;
        Link: {
          id: number;
          Title: string;
          URL: string;
        };
        BattalionPros: Array<{
          id: number;
          Heading: string;
          Description: string;
        }>;
        OtherCons: Array<{
          id: number;
          Heading: string;
          Description: string;
        }>;
        Logo: StrapiImage;
        BackgroundImage: StrapiImage;
      };
      ProductSlider: {
        id: number;
        Title: string;
        Description: string;
        Link: {
          id: number;
          Title: string;
          URL: string;
        };
      };
      Newsletter: {
        id: number;
        Heading: string;
        Description: string;
      };
    };
  };
  meta: {};
}

