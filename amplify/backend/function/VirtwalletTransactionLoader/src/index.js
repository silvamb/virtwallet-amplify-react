/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	FUNCTION_VIRTWALLETUPDATEMETRICS_NAME
	REGION
Amplify Params - DO NOT EDIT */
const { graphqlOperation } = require("virtwallet-graphql-client");

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

exports.getStatementFileProcess = /* GraphQL */ `
  query GetStatementFileProcess($accountId: ID!, $walletId: ID!, $id: ID!) {
    getStatementFileProcess(
      accountId: $accountId
      walletId: $walletId
      id: $id
    ) {
      accountId
      walletId
      id
      fileName
      currentStatus
      history {
        status
        statusDate
        statusMessage
        success
      }
    }
  }
`;

exports.updateStatementFileProcess = /* GraphQL */ `
  mutation UpdateStatementFileProcess(
    $input: UpdateStatementFileProcessInput!
  ) {
    updateStatementFileProcess(input: $input) {
      id
      currentStatus
    }
  }
`;

exports.handler = async ({ responsePayload = [] }) => {
  const promises = responsePayload.map(processRecord);

  const results = await Promise.allSettled(promises);

  results
    .filter((result) => result.status === "rejected")
    .forEach((result, index) =>
      console.log("Error processing record", index, result.reason)
    );

  return results
    .filter((result) => result.status === "fulfilled")
    .reduce((acc, result) => acc.concat(result.value), []);
};

async function processRecord(record) {
  const { transactions } = record;

  const promises = transactions.map((transaction) => {
    return putTransaction(transaction, record);
  });

  const results = await Promise.allSettled(promises);

  results
    .filter((result) => result.status === "rejected")
    .forEach((result, index) =>
      console.log("Error processing transaction", index, result.reason)
    );

  await updateRecord(record);

  const transactionsProjection = results
    .filter((result) => result.status === "fulfilled" && result.value)
    .map((result) => result.value);

  const { accountId, walletId } = record;
  return { accountId, walletId, transactions: transactionsProjection };
}

async function putTransaction(transaction, { accountId, walletId, fileName }) {
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

    return undefined;
  }

  return data.createTransaction;
}

async function updateRecord({ accountId, walletId, processId }) {
  console.debug(
    "Retrieving statement file process",
    accountId,
    walletId,
    processId
  );
  const { data, errors: createErrors } = await graphqlOperation({
    query: exports.getStatementFileProcess,
    variables: { accountId, walletId, id: processId },
  });

  if (createErrors) {
    console.error(
      "Error retrieving the statement file process in GraphQL API",
      createErrors
    );
    throw new Error("Error retrieving the statement file process");
  }

  const currentRecord = data.getStatementFileProcess;

  const updated = {
    currentStatus: "DONE",
    history: currentRecord.history.concat([
      {
        status: "DONE",
        statusDate: new Date(),
        success: true,
        statusMessage: "statement_file_processed",
      },
    ]),
  };

  const input = { ...currentRecord, ...updated };

  console.log("Updating statement record to", input);
  const { errors: updateErrors } = await graphqlOperation({
    query: exports.updateStatementFileProcess,
    variables: { input },
  });

  if (updateErrors) {
    console.error(
      "Error updating the statement file process in GraphQL API",
      updateErrors
    );

    throw new Error("Error updating statement file process status");
  }

  return input;
}
