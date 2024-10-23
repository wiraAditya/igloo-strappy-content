import { fetchData } from "../api.js";
import {
  CategoriesQuery,
  ChangelogsQuery,
  FaqsQuery,
} from "../schema/generated/graphql.js";
import {
  GET_CATEGORIES,
  GET_UNPUBLISHED_CATEGORIES,
} from "../schema/query/category.js";
import {
  GET_CHANGELOGS,
  GET_UNPUBLSHED_CHANGELOGS,
} from "../schema/query/changelog.js";
import { GET_FAQS, GET_UNPUBLISHED_FAQS } from "../schema/query/faq.js";
import { ICategory, IChangelog, IFAQ } from "../types.js";
import { writeFile } from "../utils.js";
// ---------------------------------------------------------------------
// UNTRANSLATED MEAN THE DATA IS NEW OR WE NEED TO UPDATE THE TRANSLATION
// SET THE CONTENT ON THE STRAPY TO UNPUBISHED TO FILTER THE DATA
// FOR GENERATE ALL THE LIVE CONTENT USE generate-all.ts
// ---------------------------------------------------------------------

async function generateCategories() {
  try {
    const response = await fetchData<CategoriesQuery>(
      GET_UNPUBLISHED_CATEGORIES
    );
    const updatedData: ICategory[] =
      response.igloohomeFaqCategories?.data.map((row) => {
        return {
          id: row.id ?? "",
          category: row.attributes?.Name ?? "",
        };
      }) ?? [];

    writeFile({
      dirname: "./generated",
      data: updatedData,
      fileName: "categories.json",
    });
  } catch (err) {
    console.log("cant get categories", err);
  }
}
async function generateChangelogs() {
  try {
    const response = await fetchData<ChangelogsQuery>(
      GET_UNPUBLSHED_CHANGELOGS
    );
    const updatedData: IChangelog[] =
      response.igloohomeChangelogs?.data.map((row) => {
        return {
          id: row.id ?? "",
          appVersion: row.attributes?.AppVersion ?? "",
          changes: row.attributes?.Changes ?? "",
          releaseDate: row.attributes?.ReleaseDate ?? "",
        };
      }) ?? [];

    writeFile({
      dirname: "./generated",
      data: updatedData,
      fileName: "changelogs.json",
    });
  } catch (err) {
    console.log("cant get changelogs", err);
  }
}

async function generateFAQ() {
  try {
    const response = await fetchData<FaqsQuery>(GET_UNPUBLISHED_FAQS);
    console.log("faq data", JSON.stringify(response));
    const updatedData: IFAQ[] =
      response.igloohomeFaqs?.data.map((row) => {
        return {
          id: row.id ?? "",
          title: row.attributes?.Title ?? "",
          category: row.attributes?.Category?.data?.id ?? "",
          content: row.attributes?.Content ?? "",
        };
      }) ?? [];

    writeFile({
      dirname: "./generated",
      data: updatedData,
      fileName: "faqs.json",
    });
  } catch (err) {
    console.log("cant get faq", err);
  }
}

generateCategories();
generateChangelogs();
generateFAQ();
