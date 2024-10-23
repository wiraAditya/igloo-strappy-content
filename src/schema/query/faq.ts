import { gql } from "graphql-request";

export const GET_FAQS = gql`
  query Faqs {
    igloohomeFaqs(
      locale: "en"
      sort: "Category.id:asc"
      pagination: { pageSize: 1000 }
    ) {
      data {
        id
        attributes {
          Title
          Content
          Category {
            data {
              id
              attributes {
                Name
              }
            }
          }
        }
      }
    }
  }
`;
export const GET_UNPUBLISHED_FAQS = gql`
  query Faqs {
    igloohomeFaqs(
      locale: "en"
      sort: "Category.id:asc"
      pagination: { pageSize: 1000 }
      publicationState: PREVIEW
      filters: { publishedAt: { eq: null } }
    ) {
      data {
        id
        attributes {
          Title
          Content
          Category {
            data {
              id
              attributes {
                Name
              }
            }
          }
        }
      }
    }
  }
`;
export const GET_FAQ_BY_ID = gql`
  query Faq($id: ID) {
    igloohomeFaq(id: $id) {
      data {
        id
        attributes {
          Title
          localizations(pagination: { pageSize: 1000 }) {
            data {
              id
              attributes {
                locale
              }
            }
          }
        }
      }
    }
  }
`;

export const SUBMIT_FAQ = gql`
  mutation CreateIgloohomeFaqLocalization(
    $locale: I18NLocaleCode
    $id: ID
    $data: IgloohomeFaqInput
  ) {
    createIgloohomeFaqLocalization(locale: $locale, id: $id, data: $data) {
      data {
        id
      }
    }
  }
`;
export const UPDATE_FAQ = gql`
  mutation UpdateIgloohomeFaq($id: ID!, $data: IgloohomeFaqInput!) {
    updateIgloohomeFaq(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`;
