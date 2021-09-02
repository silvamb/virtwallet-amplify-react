const { logger } = require("./logger");
const {
  GraphQLError,
  graphqlOperation,
} = require("./virtwallet-graphql-client");

const listCategoryRulesQuery = /* GraphQL */ `
  query ListCategoryRules($accountId: ID!, $nextToken: String) {
    listCategoryRules(filter: { accountId: { eq: $accountId }}, nextToken: $nextToken) {
      items {
        categoryId
        keyword
        name
        parameter
        priority
        ruleType
        type
      }
      nextToken
    }
  }
`;

const classify = async (accountId, transactions) => {

  const categoryRules = await getCategoryRules(accountId);

  transactions.forEach((tx) => classifyTransaction(tx, categoryRules));
};

async function getCategoryRules(accountId) {
  logger.info("Retrieving category rules", { accountId });
  const { data, errors } =
    await graphqlOperation({
      query: listCategoryRulesQuery,
      variables: { accountId },
    });

  if (errors) {
    throw new GraphQLError(
      "Error retrieving category rules",
      errors
    );
  }

  return data.listCategoryRules.items;
}

function classifyTransaction(transaction, categoryRulesList) {
  const categoryRules = new CategoryRules(categoryRulesList);

  const rule =
    categoryRules.findFirstKeyword(transaction.keyword) ||
    categoryRules.findFirstExpression(transaction.description);

  if (rule) {
    transaction.categoryId = rule.categoryId;
  } else {
    logger.debug("Transaction not classified", {transaction});
  }
}

class CategoryRules {
  exprEvaluators = {
    CONTAINS: (parameter = "", value = "") => value.indexOf(parameter) >= 0,
    STARTS_WITH: (parameter = "", value = "") => value.startsWith(parameter),
    REGEX: (parameter = "", value = "") => new RegExp(parameter).test(value),
  };

  constructor(categoryRules = []) {
    this.keywords = categoryRules.filter((rule) => rule.ruleType === "KEYWORD");
    this.expressionRules = categoryRules.filter(
      (rule) => rule.ruleType === "EXPRESSION"
    );
    this.keywords.sort((k1, k2) => k2.priority - k1.priority);
    this.expressionRules.sort((e1, e2) => e2.priority - e1.priority);
  }

  findFirstKeyword(keyword) {
    return this.keywords.find(
      (k) => k.keyword.toUpperCase() === keyword.toUpperCase()
    );
  }

  findFirstExpression(value) {
    return this.expressionRules.find((rule) =>
      this.exprEvaluators[rule.type](
        rule.parameter.toUpperCase(),
        value.toUpperCase()
      )
    );
  }
}

exports.listCategoryRulesQuery = listCategoryRulesQuery;
exports.classify = classify;