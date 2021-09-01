const mockGraphqlOperation = jest.fn();

jest.mock("virtwallet-lib/virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation };
});

const { createTransaction, handler } = require("./index");
const { incrementMetrics } = require('./metrics');

describe("ImportTransactions", () => {
  const event = {
    arguments: {
      input: {
        transactions: [
          {
            accountId: "1",
            balance: 379.13,
            balanceType: "DEBIT",
            categoryId: "1",
            date: "2021-03-19",
            description: "DESC",
            dt: "2021-03-19T00:00:00Z",
            id: "202103190001",
            keyword: "DESC",
            referenceMonth: "2021-03",
            source: "file.csv",
            sourceType: "AUTOMATIC",
            type: "POS",
            value: 4.98,
            walletId: "1",
          },
          {
            accountId: "1",
            balance: 45.65,
            balanceType: "DEBIT",
            categoryId: "1",
            date: "2021-03-19",
            description: "DESC",
            dt: "2021-03-19T00:00:00Z",
            id: "202103190002",
            keyword: "DESC",
            referenceMonth: "2021-03",
            source: "file.csv",
            sourceType: "AUTOMATIC",
            type: "POS",
            value: 1.28,
            walletId: "1",
          },
        ],
      },
    },
  };

  let result;

  beforeAll(async () => {
    mockGraphqlOperation.mockReturnValueOnce({
      data: {
        createTransaction: {
          id: "202103190001",
        },
      },
    }).mockRejectedValueOnce(new Error("Test Error"))
    .mockReturnValueOnce({
      data: {
        incrementMetrics: {
          date: "2021",
          categoryId: "1",
          granularity: "YEARLY",
          sum: 4.98,
          count: 1,
        },
      },
    })
    .mockReturnValueOnce({
      data: {
        incrementMetrics: {
          date: "2021-03",
          categoryId: "1",
          granularity: "MONTHLY",
          sum: 4.98,
          count: 1,
        },
      },
    });

    result = await handler(event);
  });

  afterAll(() => {
    mockGraphqlOperation.mockReset();
  });

  it("should import transactions", async () => {

    expect(result).toEqual({
      data: ["202103190001"],
      errors: [{id: "202103190002", message: "Test Error"}],
    });

    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: createTransaction,
      variables: { input: event.arguments.input.transactions[0] },
    });
  });

  it("should calculate the monthly metrics by month and category", async () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: incrementMetrics,
      variables: {
        input: {
          accountId: "1",
          walletId: "1",
          date: "2021-03",
          categoryId: "1",
          granularity: "MONTHLY",
          sum: 4.98,
          count: 1,
        },
      },
    });
  });

  it("should had calculated the yearly metrics by month and category", async () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: incrementMetrics,
      variables: {
        input: {
          accountId: "1",
          walletId: "1",
          date: "2021",
          categoryId: "1",
          granularity: "YEARLY",
          sum: 4.98,
          count: 1,
        },
      },
    });
  });
});
