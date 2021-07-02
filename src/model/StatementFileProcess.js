import { API } from "aws-amplify";
import { requestFileUpload } from "../graphql/mutations";

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
