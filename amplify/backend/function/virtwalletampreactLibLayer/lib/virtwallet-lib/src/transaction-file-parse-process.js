const { logger } = require("./logger");

const {
  graphqlOperation,
} = require("./virtwallet-graphql-client");

const getStatementFileProcessQuery = /* GraphQL */ `
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

const updateStatementFileProcessMutation = /* GraphQL */ `
  mutation UpdateStatementFileProcess(
    $input: UpdateStatementFileProcessInput!
  ) {
    updateStatementFileProcess(input: $input) {
      id
      currentStatus
    }
  }
`;

async function getFileProcessData({ accountId, walletId, processId }) {
  logger.info("Retrieving process id", { processId });
  const { data, errors } = await graphqlOperation({
    query: getStatementFileProcessQuery,
    variables: { accountId, walletId, id: processId },
  });

  if (errors) {
    logger.error("Error retrieving data from GraphQL API", { errors });
    throw new GraphQLError("Error retrieving process data", errors);
  }

  const { getStatementFileProcess } = data;
  return getStatementFileProcess;
}

async function updateRecord({
  accountId,
  walletId,
  processId,
  status,
  statusMessage,
}) {
  const currentRecord = await getFileProcessData({
    accountId,
    walletId,
    processId,
  });
  const updated = {
    currentStatus: status,
    history: currentRecord.history.concat([
      {
        status,
        statusDate: new Date(),
        success: true,
        statusMessage,
      },
    ]),
  };

  const input = { ...currentRecord, ...updated };

  logger.debug("Updating statement record to", { input });
  const { errors } = await graphqlOperation({
    query: updateStatementFileProcessMutation,
    variables: { input },
  });

  if (errors) {
    logger.error("Error updating the statement file process in GraphQL API", {
      errors,
    });

    throw new GraphQLError("Error updating process data", errors);
  }

  return input;
}

async function updateRecordOnError({
  accountId,
  walletId,
  processId,
  statusMessage = "failed_parsing",
}) {
  return updateRecord({
    accountId,
    walletId,
    processId,
    statusMessage,
    status: "FAILED",
  });
}

class GraphQLError extends Error {
  constructor(message, errors) {
    super(message);
    this.name = "GraphQLError";
    this.errors = errors;
  }
}

exports.getStatementFileProcessQuery = getStatementFileProcessQuery;
exports.updateStatementFileProcessMutation = updateStatementFileProcessMutation;
exports.getFileProcessData = getFileProcessData;
exports.updateRecord = updateRecord;
exports.updateRecordOnError = updateRecordOnError;
