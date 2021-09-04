const mockGraphqlOperation = jest.fn();

jest.mock("../src/virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation };
});

const {
  createTransaction,
  putTransactions,
} = require("../src/transaction-loader");

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
  const baseEvent = {
    accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
    walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
    processId: "d4f34699-7076-4254-9eca-e7daad371a1f",
    fileName: "myfile.csv",
    transactions: [
      {
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
      },
    ],
  };

  it("should create transaction record with success", async () => {
    const createTransactionReponse = {
      data: {
        createTransaction: {
          referenceMonth: "2020-01",
          value: "100.10",
          categoryId: "b1420880-5396-4c91-9cca-e9367786f858",
        },
      },
    };

    mockGraphqlOperation.mockReturnValueOnce(createTransactionReponse);

    const results = await putTransactions(baseEvent);
    expect(results).toEqual({
      data: [createTransactionReponse.data.createTransaction],
      errors: [],
    });

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
  });

  it("should create transaction record with no category", async () => {
    const event = { ...baseEvent };
    delete event.transactions[0].categoryId;

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

    const results = await putTransactions(event);
    expect(results).toEqual({
      data: [createTransactionReponse.data.createTransaction],
      errors: [],
    });

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
  });

  it("should return error when creating transaction", async () => {
    const createTransactionReponse = {
      data: null,
      errors: [
        {
          path: null,
          locations: [
            {
              line: 2,
              column: 21,
              sourceName: null,
            },
          ],
          message: "Error",
        },
      ],
    };

    mockGraphqlOperation.mockReturnValueOnce(createTransactionReponse);

    const results = await putTransactions(baseEvent);
    expect(results).toEqual({
      data: [],
      errors: [new Error("Error")],
    });

  });

  afterEach(() => {
    mockGraphqlOperation.mockReset();
  });
});
