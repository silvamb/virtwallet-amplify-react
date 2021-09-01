/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { parseCsvFile } = require("./ulster-csv-statement-parser");
const {
  processRecord: parseFile,
} = require("virtwallet-lib/transaction-file-parser");
const { logger } = require("virtwallet-lib/logger");

exports.handler = async (event) => {
  const records = event.Records || [];
  logger.info(
    `Parsing Ulster Statement CSV files from S3, total records ${records.length}`
  );

  const promises = records.map((record) => parseFile(record, parseCsvFile));

  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      logger.error(`Error processing record ${index}: ${result.reason}`);
    } else {
      logger.info(`Record ${index} processed with success`);
    }
  });

  logger.info("Finished parsing Ulster Statement CSV files from S3");
  return results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);
};

