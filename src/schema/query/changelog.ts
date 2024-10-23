import { gql } from "graphql-request";

export const GET_CHANGELOGS = gql`
  query Changelogs {
    igloohomeChangelogs(
      locale: "en"
      sort: "ReleaseDate:asc"
      pagination: { pageSize: 1000 }
      publicationState: PREVIEW
    ) {
      data {
        id
        attributes {
          AppVersion
          ReleaseDate
          Changes
        }
      }
    }
  }
`;

export const GET_UNPUBLSHED_CHANGELOGS = gql`
  query Changelogs {
    igloohomeChangelogs(
      locale: "en"
      sort: "ReleaseDate:asc"
      pagination: { pageSize: 1000 }
      publicationState: PREVIEW
      filters: { publishedAt: { eq: null } }
    ) {
      data {
        id
        attributes {
          AppVersion
          ReleaseDate
          Changes
        }
      }
    }
  }
`;
export const GET_CHANGELOG_BY_ID = gql`
  query Changelog($id: ID) {
    igloohomeChangelog(id: $id) {
      data {
        id
        attributes {
          AppVersion
          ReleaseDate
          Changes
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

export const SUBMIT_CHANGELOG = gql`
  mutation CreateIgloohomeChangelogLocalization(
    $locale: I18NLocaleCode
    $id: ID
    $data: IgloohomeChangelogInput
  ) {
    createIgloohomeChangelogLocalization(
      locale: $locale
      id: $id
      data: $data
    ) {
      data {
        id
      }
    }
  }
`;
export const UPDATE_CHANGELOG = gql`
  mutation UpdateChangelog($id: ID!, $data: IgloohomeChangelogInput!) {
    updateIgloohomeChangelog(id: $id, data: $data) {
      data {
        id
      }
    }
  }
`;
