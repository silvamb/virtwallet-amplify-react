import { API } from "aws-amplify";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../graphql/mutations";

const listCategoriesQuery = /* GraphQL */ `
  query ListCategories($accountId: ID!) {
    listCategorys(accountId: $accountId) {
      items {
        id
        name
        description
        type
        budget {
          type
          value
        }
      }
    }
  }
`;

export const listCategoriesAndAccountQuery = /* GraphQL */ `
  query ListCategoriesFromAccount($accountId: ID!) {
    listCategorys(accountId: $accountId) {
      items {
        accountId
        id
        name
        description
        budget {
          type
          value
        }
        account {
          name
        }
      }
    }
  }
`;

export const getCategoryDetails = /* GraphQL */ `
  query GetCategoryDetails($accountId: ID!, $id: ID!) {
    getCategory(accountId: $accountId, id: $id) {
      accountId
      id
      name
      description
      budget {
        type
        value
      }
      type
    }
  }
`;

export const list = async (accountId) => {
  console.log("Retrieving categories for account", accountId);

  try {
    const { data } = await API.graphql({
      query: listCategoriesQuery,
      variables: { accountId },
    });

    const categories = data.listCategorys.items;
    console.log("Category Data", categories);
    return categories;
  } catch (err) {
    console.log("Error retrieving categories", err);
    throw new Error("Error retrieving Categories");
  }
};

export const listCategoriesAndAccount = async (accountId) => {
  console.log("Retrieving categories for account", accountId);

  try {
    const { data } = await API.graphql({
      query: listCategoriesAndAccountQuery,
      variables: { accountId },
    });

    const categories = data.listCategorys.items;
    console.log("Category Data", categories);
    return categories;
  } catch (err) {
    console.log("Error retrieving categories", err);
    throw new Error("Error retrieving Categories");
  }
};

export const retrieve = async (accountId, categoryId) => {
  console.log("Retrieving category details for category", accountId, categoryId);

  try {
    const { data } = await API.graphql({
      query: getCategoryDetails,
      variables: { accountId, id: categoryId },
    });
    console.log("Category Data", data);
    return data.getCategory;
  } catch (err) {
    console.log("Error retrieving category details", err);
    throw new Error("Error retrieving Category details");
  }
};

export const update = async (accountId, categoryId, details) => {
  console.log("Updating category", accountId, categoryId, "details", details);

  const categoryDetails = { accountId, id: categoryId, ...details };

  try {
    const { data } = await API.graphql({
      query: updateCategory,
      variables: { input: categoryDetails },
    });
    console.log("Updated Category Data", data);
    return data.updateCategory;
  } catch (err) {
    console.log("Error updating category", err);
    throw new Error("Error updating Category");
  }
};

export const remove = async (accountId, categoryId) => {
  console.log("Deleting category", accountId, categoryId);

  const deleteCategoryInput = { accountId, id: categoryId };

  try {
    const { data } = await API.graphql({
      query: deleteCategory,
      variables: { input: deleteCategoryInput },
    });
    console.log("Delete Category Result", data);
    return data.deleteCategory;
  } catch (err) {
    console.log("Error deleting category", err);
    throw new Error("Error deleting category");
  }
};

export const create = async (categoryDetails) => {
  console.log("Creating category", categoryDetails);
  try {
    const { data } = await API.graphql({
      query: createCategory,
      variables: { input: categoryDetails },
    });
    console.log("Create Category Data", data);
    return data.createCategory;
  } catch (err) {
    console.log("Error creating category", err);
    throw new Error("Error creating category");
  }
};
