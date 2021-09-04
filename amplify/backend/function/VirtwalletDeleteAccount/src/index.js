/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { graphqlOperation } = require("virtwallet-lib/virtwallet-graphql-client");
const queries = require("./queries");

exports.handler = async (event) => {
  const { accountId } = event.arguments.input;
  console.log("Deleting account", accountId);

  const metricsDeleted = await deleteMetrics(accountId);
  console.log("Metrics deleted", metricsDeleted);

  const transactionsDeleted = await deleteTransactions(accountId);
  console.log("Transactions deleted", metricsDeleted);

  const walletsDeleted = await deleteWallets(accountId);
  console.log("Wallets deleted", metricsDeleted);

  const categoriesDeleted = await deleteCategories(accountId);
  console.log("Metrics deleted", metricsDeleted);

  const categoryRulesDeleted = await deleteCategoryRules(accountId);
  console.log("Category Rules deleted", metricsDeleted);

  const accountDeleted = await deleteAccount(accountId);

  console.log("Account deleted", accountId);

  return {
    metricsDeleted,
    transactionsDeleted,
    walletsDeleted,
    categoriesDeleted,
    categoryRulesDeleted,
    accountDeleted,
  };
};

async function deleteAll({ queryParams, query, mutation, queryName }) {
  let nextToken;
  let deleted = 0;
  let errorCount = 0;

  do {
    console.log("Executing query", queryName);
    const { data } = await graphqlOperation({
      query,
      variables: { ...queryParams, nextToken },
    });

    console.log("Total returned for query", queryName, data[queryName].items.length);
    for (let item of data[queryName].items) {
      const { errors } = await graphqlOperation({
        query: mutation,
        variables: { input: item },
      });

      if (errors) {
        console.log("Error deleting item", item, errors);
        errorCount++;
      } else {
        deleted++;
      }
    }

    nextToken = data[queryName].nextToken;
  } while (nextToken);

  return {
    deleted,
    errors: errorCount,
  };
}

function deleteMetrics(accountId) {
  console.log("Deleting metrics from account", accountId);
  return deleteAll({
    queryParams: { accountId },
    mutation: queries.deleteMetrics,
    query: queries.listMetrics,
    queryName: "listMetrics",
  });
}

function deleteTransactions(accountId) {
  console.log("Deleting transactions from account", accountId);
  return deleteAll({
    queryParams: { accountId },
    mutation: queries.deleteTransaction,
    query: queries.listTransactions,
    queryName: "listTransactions",
  });
}

function deleteWallets(accountId) {
  console.log("Deleting wallets from account", accountId);
  return deleteAll({
    queryParams: { filter: { accountId: { eq: accountId } } },
    mutation: queries.deleteWallet,
    query: queries.listWallets,
    queryName: "listWallets",
  });
}

function deleteCategories(accountId) {
  console.log("Deleting Categories from account", accountId);
  return deleteAll({
    queryParams: { accountId },
    mutation: queries.deleteCategory,
    query: queries.listCategories,
    queryName: "listCategories",
  });
}

function deleteCategoryRules(accountId) {
  console.log("Deleting Category Rules from account", accountId);
  return deleteAll({
    queryParams: { filter: { accountId: { eq: accountId } } },
    mutation: queries.deleteCategoryRule,
    query: queries.listCategoryRules,
    queryName: "listCategoryRules",
  });
}

async function deleteAccount(accountId) {
  const { errors } = await graphqlOperation({
    query: queries.deleteAccount,
    variables: { input: {id: accountId} },
  });

  if (errors) {
    console.log("Error deleting account", accountId, errors);
  }

  return {
    deleted: errors ? 0 : 1,
    errors: errors ? 1 : 0,
  };
}
