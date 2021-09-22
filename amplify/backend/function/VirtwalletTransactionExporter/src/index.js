/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { Readable } = require("stream");
const { logger } = require("virtwallet-lib/logger");
const { S3 } = require("aws-sdk");
const s3 = new S3();

const {
  graphqlOperation,
} = require("virtwallet-lib/virtwallet-graphql-client");

const listTransactionsByWallet = /* GraphQL */ `
  query ListTransactionsByWallet(
    $accountId: ID
    $sortKey: ModelTransactionPrimaryCompositeKeyConditionInput
    $nextToken: String
  ) {
    listTransactions(
      accountId: $accountId
      dateWalletIdId: $sortKey
      nextToken: $nextToken
      limit: 200
    ) {
      items {
        accountId
        walletId
        id
        dt
        date
        referenceMonth
        description
        keyword
        value
        category {
          name
        }
        source
        sourceType
        type
        balance
        balanceType
        categoryId
      }
      nextToken
    }
  }
`;
exports.listTransactionsByWallet = listTransactionsByWallet;

exports.handler = async (event) => {
  const { accountId, walletId } = event.arguments.input;

  const csvStream = new TransactionCsvReader({ accountId, walletId });

  const s3Url = await uploadFileToS3({ accountId, walletId, csvStream });
  const totalLoaded = csvStream.totalRead;

  logger.info("Finished exporting files", { totalLoaded, s3Url });

  return {
    s3Url,
  };
};

class TransactionCsvReader extends Readable {
  constructor({ options, accountId, walletId }) {
    super(options);

    this.accountId = accountId;
    this.walletId = walletId;
    this.totalRead = 0;
    this.nextToken = null;
    this.loading = false;
  }

  _read(_size) {
    const queryParams = {
      accountId: this.accountId,
      sortKey: {
        between: [
          {
            date: "1900-01-01",
            walletId: this.walletId,
          },
          {
            date: "9999-12-31",
            walletId: this.walletId,
          },
        ],
      },
    };

    if (!this.loading && this.totalRead === 0 && !this.nextToken) {
      logger.info("Writing file header");
      this.push(buildHeader());
    }

    if (!this.loading) {
      this.loading = true;
      graphqlOperation({
        query: listTransactionsByWallet,
        variables: { ...queryParams, nextToken: this.nextToken },
      })
        .then((result) => {
          if (result.errors) {
            logger.error("Error loading transactions", {
              errors: result.errors,
            });
            throw new Error("Error loading transactions");
          }

          result.data.listTransactions.items.forEach((transaction) => {
            this.push(convertToDsv(transaction));
          });

          if (!result.data.listTransactions.nextToken) {
            this.push(null);
          }

          if (this.totalRead > 1500) {
            logger.info("Reached maximum number of transactions to export");
            this.push(null);
          }

          this.totalRead += result.data.listTransactions.items.length;
          this.nextToken = result.data.listTransactions.nextToken;
          logger.info("Transactions read", {
            totalRead: this.totalRead,
            nextToken: this.nextToken,
          });
        })
        .catch((err) => {
          logger.error("Error reading next transaction chunk", err);
          throw err;
        })
        .finally(() => (this.loading = false));
    }
  }
}

function buildHeader(delimiter = ",", lineSeparator = "\r\n") {
  const attributes = [
    "accountId",
    "walletId",
    "id",
    "dt",
    "date",
    "referenceMonth",
    "description",
    "keyword",
    "value",
    "category",
    "source",
    "sourceType",
    "type",
    "balance",
    "balanceType",
    "categoryId",
  ];

  return attributes.join(delimiter).concat(lineSeparator);
}

function convertToDsv(transaction, delimiter = ",", lineSeparator = "\r\n") {
  const attributes = Object.keys(transaction);

  return attributes
    .map((attr) => {
      let attributeValue;

      if (attr === "category" && transaction.category) {
        attributeValue = transaction.category.name || "";
      } else {
        attributeValue = String(transaction[attr] || "");
      }

      return attributeValue.indexOf(delimiter) >= 0
        ? `"${attributeValue}"`
        : attributeValue;
    })
    .join(delimiter)
    .concat(lineSeparator);
}

async function uploadFileToS3({ accountId, walletId, csvStream }) {
  const now = new Date().toISOString();
  const dateMask = now.replace(/[-T:.]/gi, "");
  const fileName = `transactions_${accountId}_${walletId}_${dateMask}.csv`;
  const s3Key = `export-files/${accountId}/${walletId}/${fileName}`;

  const uploadParams = {
    Bucket: process.env.ACCOUNT_FILES_BUCKET,
    Key: s3Key,
    ContentType: "text/csv",
    StorageClass: "ONEZONE_IA",
    Body: csvStream,
  };

  logger.info("Uploading file to S3 bucket", {
    s3Key,
    bucket: process.env.ACCOUNT_FILES_BUCKET,
  });

  const uploadResponse = await s3.upload(uploadParams).promise();
  logger.info("File uploaded", { uploadResponse });

  const getSignedUrlParams = {
    Bucket: process.env.ACCOUNT_FILES_BUCKET,
    Key: s3Key,
  };

  logger.info("Creating signed URL with params", { getSignedUrlParams });
  const url = s3.getSignedUrl("getObject", getSignedUrlParams);
  logger.info("Signed URL generated", { url });

  return url;
}
