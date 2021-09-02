const mockCreateReadStream = jest.fn();

const mockS3 = {
  getObject: jest.fn(() => {
    return {
      on: (_, callback) =>
        callback(_, {
          "x-amz-meta-processid": "d4f34699-7076-4254-9eca-e7daad371a1f",
        }),
      createReadStream: mockCreateReadStream,
    };
  }),
};

jest.mock("aws-sdk", () => {
  return { S3: jest.fn(() => mockS3) };
});

const mockGraphqlOperation = jest.fn();

jest.mock("../src/virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation };
});

const mockUpdateRecord = jest.fn();
jest.mock("../src/transaction-file-parse-process", () => {
  return { updateRecord: mockUpdateRecord };
});

const mockClassifier = jest.fn();
jest.mock("../src/transaction-classifier", () => {
  return { classify: mockClassifier };
});

const mockPutTransactions = jest.fn();
jest.mock("../src/transaction-loader", () => {
  return { putTransactions: mockPutTransactions };
});

const mockIncrementMetrics = jest.fn();
jest.mock("../src/metrics", () => {
  return { incrementMetrics: mockIncrementMetrics };
});

const parseCsvFile = jest.fn();

process.env.ACCOUNT_FILES_BUCKET = "s3Bucket";

const {
  getAccountQuery,
  processRecord,
} = require("../src/transaction-file-parser");

it("should process transactions with success", async () => {
  const getAccountDataResponse = {
    data: {
      getAccount: {
        monthStartDateRule: {
          currentMonth: false,
          dayOfMonth: 25,
          manuallySetPeriods: null,
        },
      },
    },
  };

  const listCategoryRulesResponse = {
    data: {
      listCategoryRules: {
        items: [],
      },
    },
  };

  mockGraphqlOperation
    .mockReturnValueOnce(getAccountDataResponse)
    .mockReturnValueOnce(listCategoryRulesResponse);

  parseCsvFile.mockReturnValueOnce([]);

  mockPutTransactions.mockReturnValueOnce({ data: [{}], errors: [] });
  mockIncrementMetrics.mockReturnValueOnce({ data: [], errors: [] });

  const record = {
    s3: {
      bucket: {
        name: "virtwallet-account-files-bucket",
      },
      object: {
        key: "statement-files/ulster_csv/4306bec7-c283-42a8-b67d-04ec3f4dccf6/5694a155-960a-4553-8e92-c16dfaec0509/myfile.csv",
      },
    },
  };

  const result = await processRecord(record, parseCsvFile);
  expect(result).toEqual([]);

  expect(mockGraphqlOperation).toHaveBeenCalledWith({
    query: getAccountQuery,
    variables: { accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6" },
  });

  expect(mockCreateReadStream).toHaveBeenCalled();

  expect(parseCsvFile).toHaveBeenCalledWith(
    undefined,
    getAccountDataResponse.data.getAccount.monthStartDateRule
  );

  expect(mockClassifier).toHaveBeenCalledWith(
    "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
    []
  );

  expect(mockPutTransactions).toHaveBeenCalledWith({
    transactions: [],
    accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
    walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
    fileName: "myfile.csv",
  });

  expect(mockIncrementMetrics).toHaveBeenCalledWith({
    accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
    walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
    transactions: [{}],
  });
});
