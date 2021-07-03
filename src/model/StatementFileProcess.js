import { API } from "aws-amplify";
import { requestFileUpload } from "../graphql/mutations";
import { listStatementFileProcesss } from "../graphql/queries";

const listProcessedFilesQuery = /* GraphQL */ `
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
        success
        statusMessage
      }
    }
  }
`;

export const create = async ({ accountId, walletId, parserId, file }) => {
  console.log(
    "Creating Statement File Process",
    accountId,
    walletId,
    parserId,
    file
  );

  const requestFileUploadInput = {
    accountId,
    walletId,
    parserId,
    fileName: file.name,
    contentType: file.type,
  };

  try {
    const { data } = await API.graphql({
      query: requestFileUpload,
      variables: { input: requestFileUploadInput },
    });

    console.log("Creating Statement File Process", data);
    return data.requestFileUpload;
  } catch (err) {
    console.log("Creating Statement File Process", err);
    throw new Error("Creating Statement File Process");
  }
};

export const retrieve = async (accountId, walletId, id) => {
  console.log("Retrieving statement file process details", accountId, id);

  try {
    const { data } = await API.graphql({
      query: listProcessedFilesQuery,
      variables: { accountId, walletId, id },
    });
    console.log("Statement File Process Data", data);
    return data.getStatementFileProcess;
  } catch (err) {
    console.log("Error retrieving Statement File Process details", err);
    throw new Error("Error retrieving Statement File Process Details");
  }
};

export const list = async (accountId, walletId) => {
  console.log(
    "Retrieving statement file process from account ",
    accountId,
    "and wallet",
    walletId
  );

  try {
    const { data } = await API.graphql({
      query: listStatementFileProcesss,
      variables: { accountId, walletId },
    });
    const statementFileProcessList = data.listStatementFileProcesss.items;
    console.log("Statement file process data", statementFileProcessList);
    return statementFileProcessList;
  } catch (err) {
    console.log("Error retrieving statement file process list", err);
    throw new Error("Error retrieving processed statement files");
  }
};
