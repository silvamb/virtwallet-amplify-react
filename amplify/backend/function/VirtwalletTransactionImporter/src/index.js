/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { graphqlOperation } = require("virtwallet-graphql-client");
const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
      id
    }
  }
`;

const metrics = require("./metrics");

exports.handler = async (event) => {
  const { transactions } = event.arguments.input;

  console.log("Importing", transactions.length, "transaction(s)");
  const data = [];
  const errors = [];
  for (let transaction of transactions) {
    try {
      const result = await putTransaction(transaction);
      data.push(result.id);
    } catch (err) {
      console.log(err);
      errors.push({ id: transaction.id, message: err.message });
    }
  }

  console.log(
    "Transactions Imported:",
    data.length,
    ", Errors:",
    errors.length
  );

  const groupedTransactions = transactions
    .filter((transaction) => data.indexOf(transaction.id) >= 0)
    .reduce((acc, transaction) => {
      const key = `${transaction.accountId}#${transaction.walletId}`;

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(transaction);

      return acc;
    }, {});

  for (let key in groupedTransactions) {
    const [accountId, walletId] = key.split("#");

    try {
      await metrics.processRecord({
        accountId,
        walletId,
        transactions: groupedTransactions[key],
      });
    } catch (err) {
      console.log("Error processing metrics for", accountId, walletId, err);
    }
  }

  return {
    data,
    errors,
  };
};

async function putTransaction(transaction) {
  const { data, errors } = await graphqlOperation({
    query: createTransaction,
    variables: { input: transaction },
  });

  if (errors) {
    console.error("Error creating transaction in GraphQL API", errors);

    throw new Error("Error creating transaction " + transaction.id);
  }

  return data.createTransaction;
}

exports.createTransaction = createTransaction;
