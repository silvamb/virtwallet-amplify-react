const { logger } = require("./logger");
const {
  GraphQLError,
  graphqlOperation,
} = require("./virtwallet-graphql-client");
const { classify } = require("./transaction-classifier");
const { putTransactions } = require("./transaction-loader");
const { incrementMetrics } = require("./metrics");
const {
  updateRecord,
  updateRecordOnError,
} = require("./transaction-file-parse-process");
const { S3 } = require("aws-sdk");
const s3 = new S3();

const listCategoryRulesQuery = /* GraphQL */ `
  query ListCategoryRules($limit: Int, $nextToken: String) {
    listCategoryRules(filter: { accountId: { eq: $accountId } }) {
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

const getAccountQuery = /* GraphQL */ `
  query GetAccount($accountId: ID!) {
    getAccount(id: $accountId) {
      monthStartDateRule {
        currentMonth
        dayOfMonth
        manuallySetPeriods {
          endDate
          month
          startDate
        }
      }
    }
  }
`;

exports.processRecord = async (record, parseCsvFile) => {
  const { bucket, object } = record.s3;

  const s3Bucket = bucket.name;
  const s3Key = object.key;

  const s3Params = {
    Bucket: s3Bucket,
    Key: s3Key,
  };

  logger.info("Retrieving object from bucket", { s3Key, s3Bucket });
  const request = s3.getObject(s3Params);
  const s3Stream = request.createReadStream();

  const processId = await getProcessId(request);
  logger.debug("Retrieved process ID from Metadata", { processId });

  const { accountId, walletId, fileName } = getInfoFromObjKey(s3Key);

  const errors = [];
  const updateRecordError = await updateFileProcessRecord({
    accountId,
    walletId,
    processId,
    status: "PARSING",
    statusMessage: "parsing_statement_file",
  });

  if (updateRecordError) {
    errors.push(updateRecordError);
  }

  const transactions = await parseTransactions({
    accountId,
    walletId,
    fileName,
    parseCsvFile,
    processId,
    s3Stream,
  });

  logger.info("Finished processing transactions from file", { fileName });
  const { data: createdTransactions, errors: putTransactionsErrors } =
    await putTransactions({
      transactions,
      accountId,
      walletId,
      fileName,
    });

  errors.push(...putTransactionsErrors);

  const result = await updateFileProcessRecord({
    accountId,
    walletId,
    processId,
    status: "DONE",
    statusMessage: "file_processed",
  });

  if (result) {
    errors.push(result);
  }

  const { errors: metricsErrors } = await incrementMetrics({
    accountId,
    walletId,
    transactions: createdTransactions,
  });

  errors.push(...metricsErrors);

  return errors;
};

function getInfoFromObjKey(s3Key) {
  const keyRegex = /statement-files\/(\w+)\/([0-9a-f\-]+)\/([0-9a-f\-]+)\/(.*)/;

  const matches = s3Key.match(keyRegex);

  if (!matches) {
    throw new Error("S3 Object does not match the expected key format");
  }

  return {
    parserName: matches[1],
    accountId: matches[2],
    walletId: matches[3],
    fileName: matches[4],
  };
}

function getProcessId(request) {
  return new Promise((resolve) => {
    request.on("httpHeaders", (_statusCode, httpHeaders) => {
      resolve(httpHeaders["x-amz-meta-processid"]);
    });
  });
}

async function updateFileProcessRecord({
  accountId,
  walletId,
  processId,
  status,
  statusMessage,
}) {
  try {
    await updateRecord({
      accountId,
      walletId,
      processId,
      status,
      statusMessage,
    });
  } catch (error) {
    logger.warn("Error updating the file process record, ignoring it");
    return error;
  }
}

async function getData(accountId) {
  logger.debug("Retrieving account data", { accountId });
  const { data: getAccountResult, errors: getAccountErrors } =
    await graphqlOperation({
      query: getAccountQuery,
      variables: { accountId },
    });

  if (getAccountErrors) {
    logger.error("Error retrieving data from GraphQL API", getAccountErrors);
    throw new GraphQLError("Error retrieving account data", getAccountErrors);
  }

  logger.debug("Retrieving category rules", { accountId });
  const { data: getCategoryRulesResult, errors: getCategoryRulesErrors } =
    await graphqlOperation({
      query: listCategoryRulesQuery,
      variables: { accountId },
    });

  if (getCategoryRulesErrors) {
    logger.error("Error retrieving data from GraphQL API", getAccountErrors);
    throw new GraphQLError(
      "Error retrieving category rules",
      getCategoryRulesErrors
    );
  }

  return {
    account: getAccountResult.getAccount,
    categoryRules: getCategoryRulesResult.listCategoryRules,
  };
}

async function parseTransactions({
  accountId,
  walletId,
  processId,
  fileName,
  parseCsvFile,
  s3Stream,
}) {
  try {
    const data = await getData(accountId);

    logger.info("Processing transactions from file", { fileName });
    const transactions = await parseCsvFile(
      s3Stream,
      data.account.monthStartDateRule
    );

    classify(transactions, data.categoryRules);

    logger.info("Finished processing transactions from file", fileName);

    return transactions;
  } catch (error) {
    const statusMessage = error.statusMessage || "error_parsing_file";

    logger.error("Error processing file", { fileName, error });
    await updateRecordOnError({
      accountId,
      walletId,
      processId,
      statusMessage,
    });

    throw error;
  }
}

exports.getAccountQuery = getAccountQuery;
exports.listCategoryRulesQuery = listCategoryRulesQuery;
