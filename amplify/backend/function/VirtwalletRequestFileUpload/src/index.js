/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { S3 } = require("aws-sdk");
const { graphqlOperation } = require("virtwallet-lib/virtwallet-graphql-client");

const createStatementFileProcess = /* GraphQL */ `
  mutation CreateStatementFileProcess(
    $input: CreateStatementFileProcessInput!
  ) {
    createStatementFileProcess(input: $input) {
      accountId
      walletId
      id
      fileName
      currentStatus
      history {
        status
        statusDate
        success
        statusMessage
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

const s3 = new S3();

exports.handler = async (event) => {
  // Log the event to debug the application during development
  console.log(event);

  const input = event.arguments.input;
  const statementFileProcessRecord = await createStatementRecord(input);
  const s3Url = createSignedUrl(input, statementFileProcessRecord);
  await updateStatementRecord(statementFileProcessRecord);

  return {
    s3Url,
    statementFileProcessId: statementFileProcessRecord.id,
  };
};

async function createStatementRecord({ accountId, walletId, fileName }) {
  const input = {
    accountId,
    walletId,
    fileName,
    currentStatus: "NEW",
    history: {
      status: "NEW",
      statusDate: new Date(),
      success: true,
      statusMessage: "statement_file_process_created",
    },
  };

  const { data, errors } = await graphqlOperation({
    query: createStatementFileProcess,
    variables: { input },
  });

  if (errors) {
    console.log(
      "Error creating the statement file process in GraphQL API",
      errors
    );
    throw new Error("Error creating the statement file process");
  }

  return data.createStatementFileProcess;
}

function createSignedUrl(input, statementFileProcessRecord) {
  console.log("Creating a S3 URL for input", input);

  const s3Bucket = process.env.ACCOUNT_FILES_BUCKET;
  const s3Key = `statement-files/${input.parserId}/${input.accountId}/${input.walletId}/${input.fileName}`;

  const s3Params = {
    Bucket: s3Bucket,
    Key: s3Key,
    ContentType: input.contentType || "text/csv",
    StorageClass: "ONEZONE_IA",
    Metadata: {
      processId: statementFileProcessRecord.id,
    },
  };

  console.log("Creating signed URL with params", s3Params);

  const s3Url = s3.getSignedUrl("putObject", s3Params);
  console.log("URL generated ", s3Url);

  return s3Url;
}

async function updateStatementRecord(statementFileProcessRecord) {
  const updated = {
    currentStatus: "PROVISIONED",
    history: statementFileProcessRecord.history.concat([
      {
        status: "PROVISIONED",
        statusDate: new Date(),
        success: true,
        statusMessage: "statement_file_s3_url_created",
      },
    ]),
  };

  const input = { ...statementFileProcessRecord, ...updated };

  console.log("Updating statement record to", input);
  const { errors } = await graphqlOperation({
    query: updateStatementFileProcess,
    variables: { input },
  });

  if (errors) {
    console.log(
      "Error updating the statement file process in GraphQL API",
      errors
    );
  }
}
