import { API } from "aws-amplify";

import {
  createCategoryRule,
  deleteCategoryRule,
  updateCategoryRule,
} from "../graphql/mutations";

export const listKeywordsByAccount = /* GraphQL */ `
  query ListCategoriesFromAccount($filter: ModelCategoryRuleFilterInput) {
    listCategoryRules(filter: $filter) {
      items {
        accountId
        categoryId
        id
        keyword
        priority
        account {
          name
        }
        category {
          name
        }
      }
    }
  }
`;

export const listExpressionRulesByAccount = /* GraphQL */ `
  query ListCategoriesFromAccount($filter: ModelCategoryRuleFilterInput) {
    listCategoryRules(filter: $filter) {
      items {
        accountId
        categoryId
        id
        name
        type
        parameter
        priority
        account {
          name
        }
        category {
          name
        }
      }
    }
  }
`;

export const getKeywordDetails = /* GraphQL */ `
  query GetKeywordDetails($id: ID!) {
    getCategoryRule(id: $id) {
      accountId
      categoryId
      id
      keyword
      priority
      account {
        name
      }
      category {
        name
      }
    }
  }
`;

export const getExpressionRuleDetails = /* GraphQL */ `
  query GetExpressionRuleDetails($id: ID!) {
    getCategoryRule(id: $id) {
      accountId
      categoryId
      id
      name
      type
      parameter
      priority
      account {
        name
      }
      category {
        name
      }
    }
  }
`;

const list = async (accountId, ruleType) => {
  console.log("Retrieving category rules for account", accountId, ", type:", ruleType);

  const queryType = ruleType === "KEYWORD" ? listKeywordsByAccount : listExpressionRulesByAccount ;

  const filter = {
    accountId: { eq: accountId },
    ruleType: {eq: ruleType}
  };

  try {
    const { data } = await API.graphql({
      query: queryType,
      variables: { filter },
    });

    const categoryRules = data.listCategoryRules.items;
    console.log("CategoryRule Data", categoryRules);
    return categoryRules;
  } catch (err) {
    console.log("Error retrieving categoryRules", err);
    throw new Error("Error retrieving Categories");
  }
};


export const listKeywords = async (accountId) => {
  return list(accountId, "KEYWORD");
}

export const listExpressionRules = async (accountId) => {
  return list(accountId, "EXPRESSION");
}

export const retrieve = async (categoryRuleId, ruleType) => {
  console.log("Retrieving category rule details", categoryRuleId);

  const queryType = ruleType === "KEYWORD" ? getKeywordDetails : getExpressionRuleDetails ;

  try {
    const { data } = await API.graphql({
      query: queryType,
      variables: { id: categoryRuleId },
    });
    console.log("CategoryRule Data", data);
    return data.getCategoryRule;
  } catch (err) {
    console.log("Error retrieving category rule rule details", err);
    throw new Error("Error retrieving CategoryRule details");
  }
};

export const update = async (categoryRuleId, details) => {
  console.log("Updating category", categoryRuleId, "details", details);

  const categoryRuleDetails = { id: categoryRuleId, ...details };

  try {
    const { data } = await API.graphql({
      query: updateCategoryRule,
      variables: { input: categoryRuleDetails },
    });
    console.log("Updated CategoryRule Data", data);
    return data.updateCategoryRule;
  } catch (err) {
    console.log("Error updating category", err);
    throw new Error("Error updating CategoryRule");
  }
};

export const remove = async (categoryRuleId) => {
  console.log("Deleting category", categoryRuleId);

  const deleteCategoryRuleInput = { id: categoryRuleId };

  try {
    const { data } = await API.graphql({
      query: deleteCategoryRule,
      variables: { input: deleteCategoryRuleInput },
    });
    console.log("Delete CategoryRule Result", data);
    return data.deleteCategoryRule;
  } catch (err) {
    console.log("Error deleting category", err);
    throw new Error("Error deleting category");
  }
};

export const create = async (categoryRuleDetails) => {
  console.log("Creating category rule", categoryRuleDetails);
  try {
    const { data } = await API.graphql({
      query: createCategoryRule,
      variables: { input: categoryRuleDetails },
    });
    console.log("Create CategoryRule Data", data);
    return data.createCategoryRule;
  } catch (err) {
    console.log("Error creating category", err);
    throw new Error("Error creating category");
  }
};

export const EXPRESSION_RULE_TYPE = [
    "CONTAINS",
    "STARTSWITH",
    "REGEX",
];