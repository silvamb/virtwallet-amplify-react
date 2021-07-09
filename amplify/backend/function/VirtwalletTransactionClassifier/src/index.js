/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { classify } = require("./transaction-classifier");
const { graphqlOperation } = require("virtwallet-graphql-client");

const getData = /* GraphQL */ `
  query GetDataToClassify($accountId: ID!, $walletId: ID!, $id: ID!) {
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
		listCategoryRules(filter: {accountId: {eq: $accountId}}) {
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

exports.getDataQuery = getData;

exports.handler = async (event) => {
  const promises = event.responsePayload.map(classifyTransactions);

  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(`Error processing record ${index}: ${result.reason}`);
    } else {
      console.log(`Record ${index} processed with success`);
    }
  });

  console.log("Finished classifying Ulster Statement CSV transactions");
  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
};

async function classifyTransactions(data) {
  const { accountId, walletId, processId, fileName, transactions } = data;

  console.log("Classifying transactions for", {
    accountId,
    walletId,
    processId,
    fileName,
  });

  const { fileProcess, categoryRules } = await queryData(
    accountId,
    walletId,
    processId
  );
  const currentRecord = await updateRecord(fileProcess);

  try {
    classify(transactions, categoryRules);
  } catch (error) {
    console.log(error);
    await updateRecordOnError(currentRecord);
    throw error;
  }

  return data;
}

async function queryData(accountId, walletId, processId) {
  console.log(
    "Retrieving process data and category rules",
    accountId,
    walletId,
    processId
  );
  const { data, errors } = await graphqlOperation({
    query: getData,
    variables: { accountId, walletId, id: processId },
  });

  if (errors) {
    console.error(
      "Error retrieving data from GraphQL API",
      errors
    );
    throw new Error("Error retrieving data from GraphQL API");
  }

  return {
    fileProcess: data.getStatementFileProcess,
    categoryRules: data.listCategoryRules.items,
  };
}

async function updateRecord(fileProcessRecord) {
  const updated = {
    currentStatus: "CLASSIFYING",
    history: fileProcessRecord.history.concat([
      {
        status: "CLASSIFYING",
        statusDate: new Date(),
        success: true,
        statusMessage: "classifying_transactions",
      },
    ]),
  };

  const input = { ...fileProcessRecord, ...updated };

  console.info("Updating statement record to", input);
  const { errors: updateErrors } = await graphqlOperation({
    query: updateStatementFileProcess,
    variables: { input },
  });

  if (updateErrors) {
    console.error(
      "Error updating the statement file process in GraphQL API",
      updateErrors
    );
    return fileProcessRecord;
  } else {
    return input;
  }
}

async function updateRecordOnError(currentRecord) {
  const parsingStatus = currentRecord.history[currentRecord.history.length - 1]
  parsingStatus.success = false;
  parsingStatus.statusDate = new Date();
  parsingStatus.statusMessage = "parsing_failed";
  
  console.info("Updating statement record to", currentRecord);
  const { errors: updateErrors } = await graphqlOperation({
    query: updateStatementFileProcess,
    variables: { currentRecord },
  });

  if (updateErrors) {
    console.error(
      "Error updating the statement file process in GraphQL API",
      updateErrors
    );
  }
}
