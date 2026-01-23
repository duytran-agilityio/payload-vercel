export default interface StrapiContactResponse {
  data: {
    id: number;
    attributes: {
      createdAt: string;
      updatedAt: string;
      ContactDetails: string;
      Heading: {
        id: number;
        Heading: string;
        Description: string;
      };
    };
  };
  meta: {};
}

