/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { graphqlOperation } = require("virtwallet-graphql-client");

exports.createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
      id
      accountId
      walletId
      date
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

exports.handler = async ({ responsePayload = []}) => {
  const promises = responsePayload.map(processRecord);

  await Promise.allSettled(promises);
};

async function processRecord(record) {
  const { transactions } = record;

  const promises = transactions.map((transaction) => putTransaction(transaction, record));

  await Promise.allSettled(promises);
  return updateRecord(record);
}

async function putTransaction(transaction, {accountId, walletId, fileName}) {
  const commonData = {
    accountId,
    walletId,
    source: fileName,
    sourceType: "AUTOMATIC"
  }

  console.log("Creating transaction", transaction.id);
  const { errors } = await graphqlOperation({
    query: exports.createTransaction,
    variables: { input: {...transaction, ...commonData} },
  });

  if (errors) {
    console.error(
      "Error creating transaction in GraphQL API",
      errors
    );
  }
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