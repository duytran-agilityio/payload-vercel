export default interface StrapiPagesResponse {
  data: Array<{
    id: number;
    attributes: {
      MetaTitle: string;
      MetaDescription: string;
      link: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string | null;
      hideFromIndex: boolean | null;
      Components?: Array<
        | {
            id: number;
            __component: 'components.markdown-with-title';
            Title: string | null;
            Content: string;
          }
        | {
            id: number;
            __component: 'components.q-and-a-section';
            Title: string;
            Questions: Array<{
              id: number;
              Question: string;
              Answer: string;
            }>;
          }
        | {
            id: number;
            __component: 'components.rich-text-with-title';
            Title: string | null;
            Text: string; // JSON string representing lexical format
          }
      >;
    };
  }>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
