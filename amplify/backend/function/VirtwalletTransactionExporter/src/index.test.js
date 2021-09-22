const mockGraphqlOperation = jest.fn(() => {
  return Promise.resolve({
    data: {
      listTransactions: {
        items: [
          {
            accountId: "1",
            walletId: "1",
            id: "202110040001",
            dt: "2020-10-04T00:00:00.00Z",
            date: "2020-10-04",
            referenceMonth: "2020-10",
            description: "Description, Line 2",
            keyword: "Description",
            value: "1.23",
            category: {
              name: "Category 1",
            },
            source: "1",
            sourceType: "1",
            type: "POS",
            balance: "5.01",
            balanceType: "DEBIT",
            categoryId: "1",
          },
        ],
      },
    },
  });
});
jest.mock("virtwallet-lib/virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation };
});

const { createWriteStream, readFileSync, existsSync } = require("fs");
const writeStream = createWriteStream("csv/test.csv", { flags: "w" });
function writeToFile(uploadParams) {
  return new Promise((resolve, reject) => {
    try {
      uploadParams.Body.pipe(writeStream);
      writeStream.on("close", function () {
        resolve({
          ETag: "6805f2cfc46c0f04559748bb039d69ae",
          VersionId: "pSKidl4pHBiNwukdbcPXAIs.sshFFOc0",
        });
      });
    } catch (err) {
      reject(err);
    }
  });
}

const mockS3 = {
  getSignedUrl: jest.fn().mockReturnThis(),
  upload: jest.fn((uploadParams) => {
    return {
      promise: () => writeToFile(uploadParams),
    };
  }),
};

jest.mock("aws-sdk", () => {
  return { S3: jest.fn(() => mockS3) };
});

process.env.ACCOUNT_FILES_BUCKET = "s3Bucket";

const { logger } = require("virtwallet-lib/logger");
logger.level = "debug";
const { handler } = require("./index");

describe("UploadTest", () => {
  it("should generate the S3 URL", async () => {
    mockS3.getSignedUrl.mockReturnValue("S3URL");

    const event = {
      typeName: "Mutation",
      fieldName: "exportTransactions",
      arguments: {
        input: {
          accountId: "1",
          walletId: "1",
        },
      },
    };

    const s3Url = await handler(event);

    expect(mockGraphqlOperation.mock.calls.length).toEqual(1);

    expect(s3Url).toEqual({
      s3Url: "S3URL",
    });

    expect(mockS3.upload.mock.calls.length).toEqual(1);
    expect(mockS3.getSignedUrl.mock.calls.length).toEqual(1);
    expect(existsSync("csv/test.csv")).toEqual(true);
    const expectedFileContent = readFileSync("csv/expected.csv").toString();
    const actualFileContent = readFileSync("csv/test.csv").toString();
    expect(actualFileContent).toEqual(expectedFileContent);
  });
});
