export default interface StrapiAboutResponse {
  data: {
    id: number;
    attributes: {
      HeroBannerImage: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string | null;
            url: string;
            mime: string;
            size: number;
            width: number;
            height: number;
          };
        };
      };
      MarkdownSection: {
        id: number;
        Subtitle: string;
        Title: string;
        MarkdownContent: string;
        Button: {
          id: number;
          Title: string;
          URL: string;
        } | null;
      };
      QuotationSection: {
        id: number;
        Quote: string;
        Author: string;
        Image: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string | null;
              url: string;
              mime: string;
              size: number;
              width: number;
              height: number;
            };
          };
        };
        AdditionalImage: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string | null;
              url: string;
              mime: string;
              size: number;
              width: number;
              height: number;
            };
          } | null;
        };
        MobileImage: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string | null;
              url: string;
              mime: string;
              size: number;
              width: number;
              height: number;
            };
          };
        };
        Button: {
          id: number;
          Title: string;
          URL: string;
        } | null;
      };
    };
  };
}
