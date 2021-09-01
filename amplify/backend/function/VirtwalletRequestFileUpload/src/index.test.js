const mockS3 = {
  getSignedUrl: jest.fn().mockReturnThis(),
};

jest.mock("aws-sdk", () => {
  return { S3: jest.fn(() => mockS3) };
});

const mockGraphqlOperation = jest.fn();

jest.mock("virtwallet-lib/virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation };
});

process.env.ACCOUNT_FILES_BUCKET = "s3Bucket";

const { handler } = require("./index");

test("S3 URL generated", async () => {
  mockS3.getSignedUrl.mockReturnValue("S3URL");

  const createRecordReponse = {
    data: {
      createStatementFileProcess: {
        accountId: "account1",
        walletId: "wallet1",
        id: "23d0c554-b4c4-4e12-934c-a64832b8500a",
        history: [
          {
            status: "NEW",
            statusDate: "2021-07-05T21:21:14.223Z",
            statusMessage: "statement_file_process_created",
            success: true,
          },
        ],
        currentStatus: "NEW",
        fileName: "file.csv",
      },
    },
  };

  const updateRecordReponse = {
    data: {
      updateStatementFileProcess: {
        id: "23d0c554-b4c4-4e12-934c-a64832b8500a",
        Status: "PROVISIONED",
      },
    },
  };

  mockGraphqlOperation.mockReturnValueOnce(createRecordReponse).mockReturnValueOnce(updateRecordReponse);

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
    Key: "statement-files/parser/account1/wallet1/file.csv",
    ContentType: "text/csv",
    StorageClass: "ONEZONE_IA",
    Metadata: {
      processId: "23d0c554-b4c4-4e12-934c-a64832b8500a",
    },
  };
  expect(mockS3.getSignedUrl).toHaveBeenCalledWith("putObject", expectedParams);
  expect(mockGraphqlOperation.mock.calls.length).toEqual(2);
});
