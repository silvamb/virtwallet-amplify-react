const { graphqlOperation } = require("./virtwallet-graphql-client");

exports.createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
      referenceMonth
      value
      categoryId
    }
  }
`;

exports.putTransactions = async ({
  transactions,
  accountId,
  walletId,
  fileName,
}) => {
  const promises = transactions.map((transaction) => {
    return putTransaction({ transaction, accountId, walletId, fileName });
  });

  const results = await Promise.allSettled(promises);

  const errors = results
  .filter((result) => result.status === "rejected")
  .map((result) => result.reason);

  const data = results
  .filter((result) => result.status === "fulfilled")
  .map((result) => result.value); 

  return {
    data,
    errors
  }
};

async function putTransaction({ transaction, accountId, walletId, fileName }) {
  const commonData = {
    accountId,
    walletId,
    source: fileName,
    sourceType: "AUTOMATIC",
  };

  console.log("Creating transaction", transaction.id);
  const { data, errors } = await graphqlOperation({
    query: exports.createTransaction,
    variables: { input: { ...transaction, ...commonData } },
  });

  if (errors) {
    console.error("Error creating transaction in GraphQL API", errors);

    throw new CreateTransactionError(transaction, errors[0].message);
  }

  return data.createTransaction;
}

class CreateTransactionError extends Error {
  constructor(transaction, message) {
    super(message);
    this.transaction = transaction;
  }
}
