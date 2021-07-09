const { readFileSync } = require("fs");
const mockGraphqlOperation = jest.fn();

jest.mock("virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation };
});

const mockClassify = jest.fn(([transaction]) => {
  if (transaction.id == "1") {
    throw new Error("Error");
  }
  transaction.categoryId = "1";
});

jest.mock("./transaction-classifier", () => {
  return { classify: mockClassify };
});

const { handler, getDataQuery } = require("./index");

test("Should create a record and classify with success", async () => {
  const event = JSON.parse(readFileSync("event.json"));

  const getDataReponse = {
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
          {
            status: "PARSING",
            statusDate: "2021-07-05T21:21:15.101Z",
            statusMessage: "parsing_statement_file",
            success: true,
          },
        ],
      },
      listCategoryRules: {
        items: [
          {
            categoryId: "1",
            keyword: "Keyword",
            priority: 100,
            ruleType: "KEYWORD",
          },
          {
            categoryId: "2",
            name: "Contains Rule",
            priority: 100,
            ruleType: "EXPRESSION",
            type: "CONTAINS",
            parameter: "Rule",
          },
        ],
      },
    },
  };

  const updateRecordReponse = {
    data: {
      updateStatementFileProcess: {
        id: "d4f34699-7076-4254-9eca-e7daad371a1f",
        Status: "CLASSIFYING",
      },
    },
  };

  mockGraphqlOperation
    .mockReturnValueOnce(getDataReponse)
    .mockReturnValueOnce(updateRecordReponse);

  const results = await handler(event);

  expect(results.length).toEqual(1);
  expect(results).toEqual([
    {
      accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
      walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
      processId: "d4f34699-7076-4254-9eca-e7daad371a1f",
      fileName: "myfile.csv",
      transactions: [
        {
          date: "2020-01-02",
          id: "202001020001",
          dt: "2020-01-02T00:00:00Z",
          description: "POS 1 LINE",
          type: "POS",
          balance: "1988.00",
          value: "100.10",
          balanceType: "DEBIT",
          keyword: "POS 1 LINE",
          categoryId: "1",
        },
      ],
    },
  ]);
  expect(mockGraphqlOperation).toHaveBeenCalledTimes(2);
  expect(mockGraphqlOperation).toHaveBeenCalledWith({
    query: getDataQuery,
    variables: {
      accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
      walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
      id: "d4f34699-7076-4254-9eca-e7daad371a1f",
    },
  });
});

test("Should fail on retrieving file process record", async () => {
  const event = JSON.parse(readFileSync("event.json"));
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
    query: getDataQuery,
    variables: {
      accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
      walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
      id: "d4f34699-7076-4254-9eca-e7daad371a1f",
    },
  });
});

test("Should fail on classifying the records", async () => {
  const event = JSON.parse(readFileSync("event.json"));
  event.responsePayload[0].transactions[0].id = "1";
  const getDataReponse = {
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
          {
            status: "PARSING",
            statusDate: "2021-07-05T21:21:15.101Z",
            statusMessage: "parsing_statement_file",
            success: true,
          },
        ],
      },
      listCategoryRules: {
        items: [
          {
            categoryId: "1",
            keyword: "Keyword",
            priority: 100,
            ruleType: "KEYWORD",
          },
          {
            categoryId: "2",
            name: "Contains Rule",
            priority: 100,
            ruleType: "EXPRESSION",
            type: "CONTAINS",
            parameter: "Rule",
          },
        ],
      },
    },
  };

  const updateRecordReponse = {
    data: {
      updateStatementFileProcess: {
        id: "d4f34699-7076-4254-9eca-e7daad371a1f",
        Status: "CLASSIFYING",
      },
    },
  };

  mockGraphqlOperation
    .mockReturnValueOnce(getDataReponse)
    .mockReturnValue(updateRecordReponse);

  const results = await handler(event);
  expect(results).toEqual([]);
  expect(mockGraphqlOperation).toHaveBeenCalledTimes(3);
  expect(mockGraphqlOperation).toHaveBeenCalledWith({
    query: getDataQuery,
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
