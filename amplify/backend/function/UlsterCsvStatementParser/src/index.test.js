const mockS3 = {
  getObject: jest.fn(() => {
    return {
      on: (_, callback) =>
        callback(_, {
          "x-amz-meta-processid": "d4f34699-7076-4254-9eca-e7daad371a1f",
        }),
      createReadStream: jest.fn()
    };
  }),
};

jest.mock("aws-sdk", () => {
  return { S3: jest.fn(() => mockS3) };
});

const mockGraphqlOperation = jest.fn();

jest.mock("virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation };
});

const mockParseCsvFile = jest.fn();

jest.mock("./ulster-csv-statement-parser", () => {
  return { parseCsvFile: mockParseCsvFile };
});

process.env.ACCOUNT_FILES_BUCKET = "s3Bucket";

const { handler, getStatementFileProcessQuery } = require("./index");

test("Test processing single record", async () => {
  const event = {
    Records: [
      {
        s3: {
          bucket: {
            name: "virtwallet-account-files-bucket",
          },
          object: {
            key: "statement-files/ulster_csv/4306bec7-c283-42a8-b67d-04ec3f4dccf6/5694a155-960a-4553-8e92-c16dfaec0509/myfile.csv",
          },
        },
      },
    ],
  };

  const getRecordReponse = {
    data: {
      getStatementFileProcess: {
        accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
        walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
        id: "d4f34699-7076-4254-9eca-e7daad371a1f",
        fileName: "myfile.csv",
        currentStatus: "PROVISIONED",
        history: [
          {
            status: "NEW",
            statusDate: "2021-07-05T21:21:13.897Z",
            success: true,
            statusMessage: "statement_file_process_created",
          },
          {
            status: "PROVISIONED",
            statusDate: "2021-07-05T21:21:14.223Z",
            statusMessage: "statement_file_s3_url_created",
            success: true,
          },
        ],
      },
    },
  };

  const updateRecordReponse = {
    data: {
      updateStatementFileProcess: {
        id: "23d0c554-b4c4-4e12-934c-a64832b8500a",
        Status: "PARSING",
      },
    },
  };

  mockGraphqlOperation
    .mockReturnValueOnce(getRecordReponse)
    .mockReturnValueOnce(updateRecordReponse);

  mockParseCsvFile.mockReturnValueOnce([]);

  const results = await handler(event);

  expect(results.length).toEqual(1);
  expect(results).toEqual([{
    accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
    walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
    processId: "d4f34699-7076-4254-9eca-e7daad371a1f",
    fileName: "myfile.csv",
    transactions: [],
  }]);
  expect(mockGraphqlOperation).toHaveBeenCalledTimes(2);
  expect(mockGraphqlOperation).toHaveBeenCalledWith({
    query: getStatementFileProcessQuery,
    variables: {
      accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
      walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
      id: "d4f34699-7076-4254-9eca-e7daad371a1f",
    },
  });
});

test("Should fail on retrieving file process record", async () => {
  const event = {
    Records: [
      {
        s3: {
          bucket: {
            name: "virtwallet-account-files-bucket",
          },
          object: {
            key: "statement-files/ulster_csv/4306bec7-c283-42a8-b67d-04ec3f4dccf6/5694a155-960a-4553-8e92-c16dfaec0509/myfile.csv",
          },
        },
      },
    ],
  };

  const getRecordReponse = {
    data: null,
    errors: [
      {
        message: "Unauthorized",
      },
    ],
  };

  mockGraphqlOperation.mockReturnValueOnce(getRecordReponse);

  const results = await handler(event);
  expect(results).toEqual([]);
  expect(mockGraphqlOperation).toHaveBeenCalledTimes(1);
  expect(mockGraphqlOperation).toHaveBeenCalledWith({
    query: getStatementFileProcessQuery,
    variables: {
      accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
      walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
      id: "d4f34699-7076-4254-9eca-e7daad371a1f",
    },
  });
});

test("Should fail on updating file process record", async () => {
  const event = {
    Records: [
      {
        s3: {
          bucket: {
            name: "virtwallet-account-files-bucket",
          },
          object: {
            key: "statement-files/ulster_csv/4306bec7-c283-42a8-b67d-04ec3f4dccf6/5694a155-960a-4553-8e92-c16dfaec0509/myfile.csv",
          },
        },
      },
    ],
  };

  const getRecordReponse = {
    data: {
      getStatementFileProcess: {
        accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
        walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
        id: "d4f34699-7076-4254-9eca-e7daad371a1f",
        fileName: "myfile.csv",
        currentStatus: "PROVISIONED",
        history: [
          {
            status: "NEW",
            statusDate: "2021-07-05T21:21:13.897Z",
            success: true,
            statusMessage: "statement_file_process_created",
          },
          {
            status: "PROVISIONED",
            statusDate: "2021-07-05T21:21:14.223Z",
            statusMessage: "statement_file_s3_url_created",
            success: true,
          },
        ],
      },
    },
  };

  const updateRecordReponse = {
    data: null,
    errors: [
      {
        message: "Unauthorized",
      },
    ],
  };

  mockGraphqlOperation.mockReturnValueOnce(getRecordReponse).mockReturnValueOnce(updateRecordReponse);
  mockParseCsvFile.mockReturnValueOnce([]);
  const results = await handler(event);

  expect(results).toEqual([{
    accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
    walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
    processId: "d4f34699-7076-4254-9eca-e7daad371a1f",
    fileName: "myfile.csv",
    transactions: [],
  }]);
  expect(mockGraphqlOperation).toHaveBeenCalledTimes(2);
  expect(mockGraphqlOperation).toHaveBeenCalledWith({
    query: getStatementFileProcessQuery,
    variables: {
      accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
      walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
      id: "d4f34699-7076-4254-9eca-e7daad371a1f",
    },
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
