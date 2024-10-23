import * as dotenv from "dotenv";
import { gql, GraphQLClient, Variables } from "graphql-request";
import { ChangelogsQuery } from "./schema/generated/graphql.js";

dotenv.config({ path: "../../.env" });

const token = process.env.AUTH_STRAPY ?? "";
const apiUrl = process.env.API_URL ?? "";
console.log("api", apiUrl);
export function fetchData<T, U extends Variables = Variables>(
  queries: string,
  variable?: U
): Promise<T> {
  const client = new GraphQLClient(apiUrl, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return client.request<T>(queries, variable);
}
