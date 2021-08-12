/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { graphqlOperation } = require("virtwallet-graphql-client");
const queries = require("./queries");

exports.handler = async (event) => {
  const { accountId } = event.arguments.input;
  console.log("Deleting account", accountId);

  const metricsDeleted = await deleteMetrics(accountId);
  const transactionsDeleted = await deleteTransactions(accountId);
  const walletsDeleted = await deleteWallets(accountId);
  const categoriesDeleted = await deleteCategories(accountId);
  const categoryRulesDeleted = await deleteCategoryRules(accountId);
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
    const { data } = await graphqlOperation({
      query,
      variables: { ...queryParams, nextToken },
    });

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
  return deleteAll({
    queryParams: { accountId },
    mutation: queries.deleteMetrics,
    query: queries.listMetrics,
    queryName: "listMetricss",
  });
}

async function deleteTransactions(accountId) {
  return deleteAll({
    queryParams: { accountId },
    mutation: queries.deleteTransaction,
    query: queries.listTransactions,
    queryName: "listTransactions",
  });
}

async function deleteWallets(accountId) {
  return deleteAll({
    queryParams: { filter: { accountId: { eq: accountId } } },
    mutation: queries.deleteWallet,
    query: queries.listWallets,
    queryName: "listWallets",
  });
}

async function deleteCategories(accountId) {
  return deleteAll({
    queryParams: { accountId },
    mutation: queries.deleteCategory,
    query: queries.listCategories,
    queryName: "listCategorys",
  });
}

async function deleteCategoryRules(accountId) {
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
