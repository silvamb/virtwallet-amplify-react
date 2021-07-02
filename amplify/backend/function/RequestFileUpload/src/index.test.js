const mockS3 = {
  getSignedUrl: jest.fn().mockReturnThis(),
};

jest.mock("aws-sdk", () => {
  return { S3: jest.fn(() => mockS3) };
});

const mockGraphqlOperation = jest.fn();

jest.mock("virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation };
});

process.env.ACCOUNT_FILES_BUCKET = "s3Bucket";

const { handler } = require("./index");

test("S3 URL generated", async () => {
  mockS3.getSignedUrl.mockReturnValue("S3URL");

  const expectedResponse = {
    data: {
      createStatementFileProcess: {
        id: "23d0c554-b4c4-4e12-934c-a64832b8500a",
      },
    },
  };

  mockGraphqlOperation.mockReturnValue(expectedResponse);

  const event = {
    typeName: "type",
    fieldName: "field",
    arguments: {
      input: {
        accountId: "account1",
        walletId: "wallet1",
        parserId: "parser",
        fileName: "file.csv",
      },
    },
  };

  const s3Url = handler(event);

  await expect(s3Url).resolves.toEqual({
    s3Url: "S3URL",
    statementFileProcessId: "23d0c554-b4c4-4e12-934c-a64832b8500a",
  });

  const expectedParams = {
    Bucket: "s3Bucket",
    Key: "statement-files/account1/wallet1/parsers/parser/file.csv",
    ContentType: "text/csv",
    StorageClass: "ONEZONE_IA",
    Metadata: {
      clientId: "anonymous",
    },
  };
  expect(mockS3.getSignedUrl).toHaveBeenCalledWith("putObject", expectedParams);
});
