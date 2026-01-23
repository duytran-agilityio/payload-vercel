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

export default interface StrapiIRAResponse {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      Header: {
        id: number;
        Heading: {
          id: number;
          Subtitle: string;
          Title: string;
          Description: string;
        };
        Image: StrapiImage;
      };
      WhyUs: {
        id: number;
        Title: string;
        Description: string;
        Image: StrapiImage;
        List: Array<{
          id: number;
          Heading: string;
          Description: string;
        }>;
      };
      Benefits: {
        id: number;
        Title: string;
        List: Array<{
          id: number;
          Heading: string;
          Description: string;
        }>;
      };
      HowToGetStarted: {
        id: number;
        Title: string;
        List: Array<{
          id: number;
          Heading: string;
          Description: string;
        }>;
      };
      ConsultationsCTA: {
        id: number;
        Title: string;
        Description: string;
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
      };
    };
  };
  meta: {};
}

