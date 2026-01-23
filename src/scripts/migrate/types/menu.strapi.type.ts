export default interface StrapiMenuResponse {
  data: Array<{
    id: number;
    attributes: {
      title: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      items: {
        data: Array<{
          id: number;
          attributes: {
            order: number;
            title: string;
            url: string | null;
            target: string | null;
            createdAt: string;
            updatedAt: string;
            parent: {
              data: {
                id: number;
                attributes: {
                  order: number;
                  title: string;
                  url: string | null;
                  target: string | null;
                };
              } | null;
            };
            custom_image: {
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
            };
          };
        }>;
      };
    };
  }>;
  meta: {};
}

