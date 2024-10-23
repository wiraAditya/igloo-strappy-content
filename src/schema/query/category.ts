import { gql } from "graphql-request";

export const GET_CATEGORIES = gql`
  query Categories {
    igloohomeFaqCategories(
      locale: "en"
      pagination: { pageSize: 1000 }
      publicationState: PREVIEW
      filters: { publishedAt: { eq: null } }
    ) {
      data {
        id
        attributes {
          Name
        }
      }
    }
  }
`;
export const GET_UNPUBLISHED_CATEGORIES = gql`
  query Categories {
    igloohomeFaqCategories(
      locale: "en"
      pagination: { pageSize: 1000 }
      publicationState: PREVIEW
      filters: { publishedAt: { eq: null } }
    ) {
      data {
        id
        attributes {
          Name
        }
      }
    }
  }
`;
export const GET_CATEGORIES_BY_ID = gql`
  query Category($id: ID) {
    igloohomeFaqCategory(id: $id) {
      data {
        id
        attributes {
          Name
          publishedAt
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

export const SUBMIT_CATEGORY = gql`
  mutation CreateIgloohomeFaqCategoryLocalization(
    $locale: I18NLocaleCode
    $id: ID
    $data: IgloohomeFaqCategoryInput
  ) {
    createIgloohomeFaqCategoryLocalization(
      locale: $locale
      id: $id
      data: $data
    ) {
      data {
        id
        attributes {
          Name
        }
      }
    }
  }
`;
export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory($id: ID!, $data: IgloohomeFaqCategoryInput!) {
    updateIgloohomeFaqCategory(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`;
