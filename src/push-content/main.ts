import { fetchData } from "../api.js";
import {
  CategoryQuery,
  CategoryQueryVariables,
  ChangelogQuery,
  ChangelogQueryVariables,
  CreateIgloohomeChangelogLocalizationMutation,
  CreateIgloohomeChangelogLocalizationMutationVariables,
  CreateIgloohomeFaqCategoryLocalizationMutation,
  CreateIgloohomeFaqCategoryLocalizationMutationVariables,
  CreateIgloohomeFaqLocalizationMutation,
  CreateIgloohomeFaqLocalizationMutationVariables,
  FaqQuery,
  FaqQueryVariables,
  I18NLocalesQuery,
  UpdateCategoryMutation,
  UpdateCategoryMutationVariables,
  UpdateChangelogMutation,
  UpdateChangelogMutationVariables,
  UpdateIgloohomeFaqMutation,
  UpdateIgloohomeFaqMutationVariables,
} from "../schema/generated/graphql.js";
import { GET_SUPPORT_LANG } from "../schema/query.js";
import {
  GET_CATEGORIES_BY_ID,
  SUBMIT_CATEGORY,
  UPDATE_CATEGORY,
} from "../schema/query/category.js";
import {
  GET_CHANGELOG_BY_ID,
  SUBMIT_CHANGELOG,
  UPDATE_CHANGELOG,
} from "../schema/query/changelog.js";
import { GET_FAQ_BY_ID, SUBMIT_FAQ, UPDATE_FAQ } from "../schema/query/faq.js";
import { readFile } from "../utils.js";
import ora from "ora";

async function syncBulkDataCategory(lang: string) {
  try {
    const faqDir = "./translate/categories";
    const faqPrefixFileName = "categories_";

    const data = await readFile<{ id: string; category: string }[]>(
      `${faqDir}/${faqPrefixFileName}${lang}.json`
    );
    for (const rowData of data) {
      // getting the data by id
      const CategorybyId = await fetchData<
        CategoryQuery,
        CategoryQueryVariables
      >(GET_CATEGORIES_BY_ID, { id: rowData.id });

      // this used to check is the id have the selected language
      // if any will update the selected data, otherwise will do insert
      if (
        CategorybyId.igloohomeFaqCategory?.data?.attributes?.localizations?.data.some(
          (row) => row.attributes?.locale == lang
        )
      ) {
        const selectedLangCategory =
          CategorybyId.igloohomeFaqCategory?.data?.attributes?.localizations?.data.find(
            (row) => row.attributes?.locale == lang
          );
        await fetchData<
          UpdateCategoryMutation,
          UpdateCategoryMutationVariables
        >(UPDATE_CATEGORY, {
          id: selectedLangCategory?.id ?? "",
          data: {
            Name: rowData.category,
            publishedAt: new Date(),
          },
        });
      } else {
        // this id refers to the id on the english that we inserted into the strappy
        await fetchData<
          CreateIgloohomeFaqCategoryLocalizationMutation,
          CreateIgloohomeFaqCategoryLocalizationMutationVariables
        >(SUBMIT_CATEGORY, {
          locale: lang,
          id: rowData.id,
          data: {
            Name: rowData.category,
            publishedAt: new Date(),
          },
        });
      }
    }
    // data.forEach(async (rowData) => );
  } catch (err) {
    console.log("cant get categories", err);
  }
}
async function syncBulkDataFaq(lang: string) {
  try {
    const faqDir = "./translate/faqs";
    const faqPrefixFileName = "faqs_";

    const data = await readFile<
      { id: string; title: string; category: string; content: string }[]
    >(`${faqDir}/${faqPrefixFileName}${lang}.json`);
    for (const rowData of data) {
      // getting the data by id
      const FAQbyId = await fetchData<FaqQuery, FaqQueryVariables>(
        GET_FAQ_BY_ID,
        { id: rowData.id }
      );
      // getting the category by lang,
      const CategorybyId = await fetchData<
        CategoryQuery,
        CategoryQueryVariables
      >(GET_CATEGORIES_BY_ID, { id: rowData.category });
      const filteredCategory =
        CategorybyId.igloohomeFaqCategory?.data?.attributes?.localizations?.data.find(
          (row) => row.attributes?.locale == lang
        );
      // this used to check is the id have the selected language
      // if any will update the selected data, otherwise will do insert
      if (
        FAQbyId.igloohomeFaq?.data?.attributes?.localizations?.data.some(
          (row) => row.attributes?.locale == lang
        )
      ) {
        const selectedLangFaq =
          FAQbyId.igloohomeFaq?.data?.attributes?.localizations?.data.find(
            (row) => row.attributes?.locale == lang
          );
        await fetchData<
          UpdateIgloohomeFaqMutation,
          UpdateIgloohomeFaqMutationVariables
        >(UPDATE_FAQ, {
          id: selectedLangFaq?.id ?? "",
          data: {
            Title: rowData.title,
            Category: !!filteredCategory
              ? filteredCategory.id
              : rowData.category,
            Content: rowData.content,
            publishedAt: new Date(),
          },
        });
      } else {
        // this id refers to the id on the english that we inserted into the strappy
        await fetchData<
          CreateIgloohomeFaqLocalizationMutation,
          CreateIgloohomeFaqLocalizationMutationVariables
        >(SUBMIT_FAQ, {
          locale: lang,
          id: rowData.id,
          data: {
            Title: rowData.title,
            Category: !!filteredCategory
              ? filteredCategory.id
              : rowData.category,
            Content: rowData.content,
            publishedAt: new Date(),
          },
        });
      }
    }
    // data.forEach(async (rowData) => );
  } catch (err) {
    console.log("cant get categories", err);
  }
}

async function syncBulkDataChangelog(lang: string) {
  try {
    const faqDir = "./translate/changelogs";
    const faqPrefixFileName = "changelogs_";

    const data = await readFile<
      {
        id: string;
        appVersion: string;
        changes: string;
        releaseDate: string;
      }[]
    >(`${faqDir}/${faqPrefixFileName}${lang}.json`);
    for (const rowData of data) {
      // getting the data by id
      const ChangelogbyId = await fetchData<
        ChangelogQuery,
        ChangelogQueryVariables
      >(GET_CHANGELOG_BY_ID, { id: rowData.id });

      // this used to check is the id have the selected language
      // if any will update the selected data, otherwise will do insert
      if (
        ChangelogbyId.igloohomeChangelog?.data?.attributes?.localizations?.data.some(
          (row) => row.attributes?.locale == lang
        )
      ) {
        const selectedLanChangelog =
          ChangelogbyId.igloohomeChangelog?.data?.attributes?.localizations?.data.find(
            (row) => row.attributes?.locale == lang
          );
        await fetchData<
          UpdateChangelogMutation,
          UpdateChangelogMutationVariables
        >(UPDATE_CHANGELOG, {
          id: selectedLanChangelog?.id ?? "",
          data: {
            AppVersion: rowData.appVersion,
            Changes: rowData.changes,
            ReleaseDate: rowData.releaseDate,
            publishedAt: new Date(),
          },
        });
      } else {
        // this id refers to the id on the english that we inserted into the strappy
        await fetchData<
          CreateIgloohomeChangelogLocalizationMutation,
          CreateIgloohomeChangelogLocalizationMutationVariables
        >(SUBMIT_CHANGELOG, {
          locale: lang,
          id: rowData.id,
          data: {
            AppVersion: rowData.appVersion,
            Changes: rowData.changes,
            ReleaseDate: rowData.releaseDate,
            publishedAt: new Date(),
          },
        });
      }
    }
    // data.forEach(async (rowData) => );
  } catch (err) {
    console.log("cant get categories", err);
  }
}

async function syncData() {
  const proccess = ora("submiting data...").start();
  try {
    const response = await fetchData<I18NLocalesQuery>(GET_SUPPORT_LANG);

    if (!response.i18NLocales?.data.length) {
      return console.error("empty language support");
    }
    for (const row of response.i18NLocales.data) {
      // console.log('start bulk category');
      proccess.text = `syncing ${row.attributes?.code} category...`;
      await syncBulkDataCategory(row.attributes?.code ?? "en");
      // console.log('end bulk category');

      // console.log('start bulk faq');
      proccess.text = `syncing ${row.attributes?.code} FAQ...`;

      await syncBulkDataFaq(row.attributes?.code ?? "en");
      // console.log('end bulk faq');

      // console.log("start bulk changelog");
      proccess.text = `syncing ${row.attributes?.code} Changelog...`;

      await syncBulkDataChangelog(row.attributes?.code ?? "en");
      // console.log("end bulk changelog");
    }
  } catch (error) {
    proccess.fail("something wrong");
    console.error("error when sync data: ", error);
  } finally {
    proccess.stop();
    proccess.clear();
  }
}
syncData();
