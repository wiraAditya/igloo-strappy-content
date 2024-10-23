// src/queries.ts
import { gql } from "graphql-request";

export const GET_SUPPORT_LANG = gql`
  query I18NLocales {
    i18NLocales(filters: { id: { notIn: 1 } }, pagination: { pageSize: 20 }) {
      data {
        id
        attributes {
          code
        }
      }
    }
  }
`;
