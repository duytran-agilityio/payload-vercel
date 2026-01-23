export default interface StrapiBunkerResponse {
  data: {
    id: number;
    attributes: {
      Header: {
        id: number;
        Heading: {
          id: number;
          Subtitle: string;
          Title: string;
          Description: string;
        };
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
        HeaderImage: {
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
        List: Array<{
          id: number;
          Heading: string;
          Description: string;
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
      };
      Pricing: {
        id: number;
        Title: string;
        Description: string;
        Subtitle: string;
        MetalRates: Array<{
          id: number;
          Min: number;
          Max: number;
          AllocatedRate: number;
          SegregatedRate: number;
        }>;
      };
      WhyBattalionBunker: {
        id: number;
        Title: string;
        Description: string;
        Button: {
          id: number;
          Title: string;
          URL: string;
        };
        List: Array<{
          id: number;
          Heading: string;
          Description: string;
          Icon: {
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
        }>;
      };
      FAQ: {
        id: number;
        Title: string;
        Questions: Array<{
          id: number;
          Question: string;
          Answer: string;
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
      Comparison: {
        id: number;
        Title: string;
        TableHeader: {
          id: number;
          Heading_1: string;
          Heading_2: string;
          Heading_3: string;
          Heading_4: string;
        };
        TableBody: Array<{
          id: number;
          Feature: string;
          BattalionBunker: string;
          LegacyStorage: string;
          HomeStorage: string;
        }>;
      };
    };
  };
}
