/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	FUNCTION_VIRTWALLETTRANSACTIONCLASSIFIER_NAME
	REGION
Amplify Params - DO NOT EDIT */
const { S3 } = require("aws-sdk");
const s3 = new S3();
const { parseCsvFile } = require("./ulster-csv-statement-parser");
const { graphqlOperation } = require("virtwallet-graphql-client");
const log = require("loglevel");

const getStatementFileProcess = /* GraphQL */ `
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

const updateStatementFileProcess = /* GraphQL */ `
  mutation UpdateStatementFileProcess(
    $input: UpdateStatementFileProcessInput!
  ) {
    updateStatementFileProcess(input: $input) {
      id
      currentStatus
    }
  }
`;

exports.handler = async (event) => {
  const records = event.Records || [];
  log.info(
    `Parsing Ulster Statement CSV files from S3, total records ${records.length}`
  );

  const promises = records.map(processRecord);

  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      log.error(`Error processing record ${index}: ${result.reason}`);
    } else {
      log.info(`Record ${index} processed with success`);
    }
  });

  log.info("Finished parsing Ulster Statement CSV files from S3");
  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
};

async function processRecord(record) {
  const { bucket, object } = record.s3;

  const s3Bucket = bucket.name;
  const s3Key = object.key;

  const s3Params = {
    Bucket: s3Bucket,
    Key: s3Key,
  };

  log.info(`Retrieving object [${s3Key}] from bucket [${s3Bucket}]`);
  const request = s3.getObject(s3Params);
  const s3Stream = request.createReadStream();

  const processId = await getProcessId(request);
  log.debug(`Retrieved process ID from Metadata: [${processId}]`);

  const { accountId, walletId, fileName } = getInfoFromObjKey(s3Key);
  const fileRecord = await updateRecord({ accountId, walletId, processId });

  try {
    log.info(`Parsing transactions from file ${fileName}`);
    const transactions = await parseCsvFile(s3Stream);

    return {
      accountId,
      walletId,
      processId,
      fileName,
      transactions,
    };
  } catch (error) {
    log.error(`Error processing file ${fileName}`, error);
    await updateRecordOnError(fileRecord);
  }
}

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

async function updateRecord({ accountId, walletId, processId }) {
  log.debug(
    "Retrieving statement file process",
    accountId,
    walletId,
    processId
  );
  const { data, errors: createErrors } = await graphqlOperation({
    query: getStatementFileProcess,
    variables: { accountId, walletId, id: processId },
  });

  if (createErrors) {
    log.error(
      "Error retrieving the statement file process in GraphQL API",
      createErrors
    );
    throw new Error("Error retrieving the statement file process");
  }

  const currentRecord = data.getStatementFileProcess;

  const updated = {
    currentStatus: "PARSING",
    history: currentRecord.history.concat([
      {
        status: "PARSING",
        statusDate: new Date(),
        success: true,
        statusMessage: "parsing_statement_file",
      },
    ]),
  };

  const input = { ...currentRecord, ...updated };

  log.info("Updating statement record to", input);
  const { errors: updateErrors } = await graphqlOperation({
    query: updateStatementFileProcess,
    variables: { input },
  });

  if (updateErrors) {
    log.error(
      "Error updating the statement file process in GraphQL API",
      updateErrors
    );

    return currentRecord;
  }

  return input;
}

async function updateRecordOnError(currentRecord) {
  const updated = {
    currentStatus: "FAILED",
    history: currentRecord.history.concat([
      {
        status: "FAILED",
        statusDate: new Date(),
        success: true,
        statusMessage: "failed_parsing",
      },
    ]),
  };

  const input = { ...currentRecord, ...updated };

  log.info("Updating statement record to", input);
  const { errors: updateErrors } = await graphqlOperation({
    query: updateStatementFileProcess,
    variables: { input },
  });

  if (updateErrors) {
    log.error(
      "Error updating the statement file process in GraphQL API",
      updateErrors
    );
  }
}

exports.getStatementFileProcessQuery = getStatementFileProcess;
exports.updateStatementFileProcessMutation = updateStatementFileProcess;
