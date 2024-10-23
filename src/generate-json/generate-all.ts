import { fetchData } from "../api.js";
import {
  CategoriesQuery,
  ChangelogsQuery,
  FaqsQuery,
} from "../schema/generated/graphql.js";
import { GET_CATEGORIES } from "../schema/query/category.js";
import { GET_CHANGELOGS } from "../schema/query/changelog.js";
import { GET_FAQS } from "../schema/query/faq.js";
import { ICategory, IChangelog, IFAQ } from "../types.js";
import { writeFile } from "../utils.js";

async function generateCategories() {
  try {
    const response = await fetchData<CategoriesQuery>(GET_CATEGORIES);
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
    const response = await fetchData<ChangelogsQuery>(GET_CHANGELOGS);
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
    const response = await fetchData<FaqsQuery>(GET_FAQS);
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
