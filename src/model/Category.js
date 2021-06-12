import { API } from "aws-amplify";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../graphql/mutations";

export const listCategoriesbyAccount = /* GraphQL */ `
  query ListCategoriesFromAccount($filter: ModelCategoryFilterInput) {
    listCategorys(filter: $filter) {
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
  query GetCategoryDetails($id: ID!) {
    getCategory(id: $id) {
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

  const filter = accountId ? { accountId: { eq: accountId } } : undefined;

  try {
    const { data } = await API.graphql({
      query: listCategoriesbyAccount,
      variables: { filter },
    });

    const categories = data.listCategorys.items;
    console.log("Category Data", categories);
    return categories;
  } catch (err) {
    console.log("Error retrieving categories", err);
    throw new Error("Error retrieving Categories");
  }
};

export const retrieve = async (categoryId) => {
  console.log("Retrieving category details", categoryId);

  try {
    const { data } = await API.graphql({
      query: getCategoryDetails,
      variables: { id: categoryId },
    });
    console.log("Category Data", data);
    return data.getCategory;
  } catch (err) {
    console.log("Error retrieving category details", err);
    throw new Error("Error retrieving Category details");
  }
};

export const update = async (categoryId, details) => {
  console.log("Updating category", categoryId, "details", details);

  const categoryDetails = { id: categoryId, ...details };

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

export const remove = async (categoryId) => {
  console.log("Deleting category", categoryId);

  const deleteCategoryInput = { id: categoryId };

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
