const { readFileSync } = require("fs");
const mockGraphqlOperation = jest.fn();

jest.mock("virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation };
});

const {
  handler,
  createTransaction,
  getStatementFileProcess,
} = require("./index");

const getRecordResponse = {
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
        {
          status: "CLASSIFYING",
          statusDate: "2021-07-05T21:21:16.877Z",
          statusMessage: "classifying_statement_file",
          success: true,
        },
      ],
    },
  },
};

const updateRecordReponse = {
  data: {
    updateStatementFileProcess: {
      id: "d4f34699-7076-4254-9eca-e7daad371a1f",
      Status: "DONE",
    },
  },
};

describe("CreateTransaction", () => {
  it("should create transaction record with success", async () => {
    const event = JSON.parse(readFileSync("event.json"));

    const createTransactionReponse = {
      data: {
        createTransaction: {
          referenceMonth: "2020-01",
          value: "100.10",
          categoryId: "b1420880-5396-4c91-9cca-e9367786f858",
        },
      },
    };

    mockGraphqlOperation
      .mockReturnValueOnce(createTransactionReponse)
      .mockReturnValueOnce(getRecordResponse)
      .mockReturnValueOnce(updateRecordReponse);

    const results = await handler(event);
    expect(results).toEqual([
      {
        accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
        walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
        transactions: [
          {
            referenceMonth: "2020-01",
            value: "100.10",
            categoryId: "b1420880-5396-4c91-9cca-e9367786f858",
          },
        ],
      },
    ]);

    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: createTransaction,
      variables: {
        input: {
          accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
          walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
          date: "2020-01-02",
          id: "202001020001",
          dt: "2020-01-02T00:00:00Z",
          referenceMonth: "2020-01",
          description: "POS 1 LINE",
          type: "POS",
          balance: "1988.00",
          value: "100.10",
          balanceType: "DEBIT",
          keyword: "POS 1 LINE",
          categoryId: "b1420880-5396-4c91-9cca-e9367786f858",
          source: "myfile.csv",
          sourceType: "AUTOMATIC",
        },
      },
    });
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: getStatementFileProcess,
      variables: {
        accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
        walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
        id: "d4f34699-7076-4254-9eca-e7daad371a1f",
      },
    });
  });

  it("should create transaction record with no category", async () => {
    const event = JSON.parse(readFileSync("event.json"));
    delete event.responsePayload[0].transactions[0].categoryId;

    const createTransactionReponse = {
      data: {
        createTransaction: {
          referenceMonth: "2020-01",
          value: "100.10",
        },
      },
    };

    mockGraphqlOperation
      .mockReturnValueOnce(createTransactionReponse)
      .mockReturnValueOnce(getRecordResponse)
      .mockReturnValueOnce(updateRecordReponse);

    const results = await handler(event);
    expect(results).toEqual([
      {
        accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
        walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
        transactions: [
          {
            referenceMonth: "2020-01",
            value: "100.10",
          },
        ],
      },
    ]);

    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: createTransaction,
      variables: {
        input: {
          accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
          walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
          date: "2020-01-02",
          id: "202001020001",
          dt: "2020-01-02T00:00:00Z",
          referenceMonth: "2020-01",
          description: "POS 1 LINE",
          type: "POS",
          balance: "1988.00",
          value: "100.10",
          balanceType: "DEBIT",
          keyword: "POS 1 LINE",
          source: "myfile.csv",
          sourceType: "AUTOMATIC",
        },
      },
    });
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: getStatementFileProcess,
      variables: {
        accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
        walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
        id: "d4f34699-7076-4254-9eca-e7daad371a1f",
      },
    });
  });

  afterEach(() => {
    mockGraphqlOperation.mockReset();
  });
});
