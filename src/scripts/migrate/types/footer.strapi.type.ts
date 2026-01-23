export default interface StrapiFooterResponse {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      Logo: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string | null;
            caption: string | null;
            width: number;
            height: number;
            formats: {
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
            };
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
      };
      Socials: {
        id: number;
        Instagram: string;
        YouTube: string;
        X: string;
        TikTok: string;
        LinkedIn: string;
        Facebook: string;
      };
      MenuColumns: Array<{
        id: number;
        Title: string;
        Items: Array<{
          id: number;
          Item: string;
          Link: string;
        }>;
      }>;
    };
  };
  meta: {};
}

