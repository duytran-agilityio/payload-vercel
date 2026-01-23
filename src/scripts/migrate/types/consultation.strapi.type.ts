export default interface StrapiConsultationResponse {
  data: {
    id: number;
    attributes: {
      Heading: {
        id: number;
        Heading: {
          id: number;
          Subtitle: string;
          Title: string;
          Description: string;
        };
        LinkCard: Array<{
          id: number;
          Title: string;
          Description: string;
          Link: string;
          LinkTitle: string;
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
            } | null;
          };
        }>;
      };
      Information: {
        id: number;
        Title: string;
        Description: string;
        Items: Array<{
          id: number;
          Heading: string;
          Description: string;
        }>;
      };
    };
  };
}
