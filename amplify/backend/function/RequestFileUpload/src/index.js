/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { S3 } = require('aws-sdk');
const { graphqlOperation } = require('virtwallet-graphql-client');

const createStatementFileProcess =  /* GraphQL */ `
  mutation CreateStatementFileProcess($input: CreateStatementFileProcessInput!) {
    createStatementFileProcess(input: $input) {
      id
    }
  }
`;

const s3 = new S3();

exports.handler = async (event) => {
    // Log the event to debug the application during development
    console.log(event);

    const input = event.arguments.input;

    console.log("Creating a S3 URL for input", input);

    const s3Bucket = process.env.ACCOUNT_FILES_BUCKET;
    const s3Key = `statement-files/${input.accountId}/${input.walletId}/parsers/${input.parserId}/${input.fileName}`;

    const s3Params = {
        Bucket: s3Bucket,
        Key: s3Key,
        ContentType: input.contentType || "text/csv",
        StorageClass: "ONEZONE_IA",
        Metadata: {
            clientId: "anonymous"
        }
    };

    console.log("Creating signed URL with params", s3Params);

    const s3Url = s3.getSignedUrl('putObject', s3Params);
    console.log('URL generated ', s3Url);

    const statementFileProcessId = await createStatementRecord(input.accountId, input.walletId, input.fileName);

    return {
        s3Url,
        statementFileProcessId
    };
};

async function createStatementRecord(accountId, walletId, fileName) {
    const input = {
        accountId,
        walletId,
        fileName,
        currentStatus: "PROVISIONED",
        history: {
            status: "PROVISIONED",
            statusDate: new Date(),
            success: true,
            statusMessage: "file_upload_requested_with_success"
        }
    };

    const { data, errors } = await graphqlOperation({ query: createStatementFileProcess, variables: {input}})

    if(errors) {
        console.log("Error creating the statement file process in GraphQL API", errors);
        throw new Error("Error creating the statement file process");
    }

    return data.createStatementFileProcess.id;
}