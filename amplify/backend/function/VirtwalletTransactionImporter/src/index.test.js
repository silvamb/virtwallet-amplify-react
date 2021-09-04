const mockPutTransactions = jest.fn();
jest.mock("virtwallet-lib/transaction-loader", () => {
  return { putTransactions: mockPutTransactions };
});

const mockIncrementMetrics = jest.fn();
jest.mock("virtwallet-lib/metrics", () => {
  return { incrementMetrics: mockIncrementMetrics };
});

const { handler } = require("./index");

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
    mockPutTransactions.mockReturnValueOnce({
      data: [
        {
          referenceMonth: "2021-03",
          value: 4.98,
          categoryId: "1",
        },
      ],
      errors: [new Error("Test Error")],
    });

    result = await handler(event);
  });

  afterAll(() => {
    mockPutTransactions.mockReset();
    mockIncrementMetrics.mockReset();
  });

  it("should import transactions", async () => {
    expect(result).toEqual({
      errors: [new Error("Test Error")],
    });
  });

  it("should have called putTransactions with correct values", async () => {
    expect(mockPutTransactions).toHaveBeenCalledWith({
      accountId: "1",
      walletId: "1",
      transactions: event.arguments.input.transactions,
    });
  });

  it("should have called incrementMetrics with correct values", async () => {
    expect(mockIncrementMetrics).toHaveBeenCalledWith({
      accountId: "1",
      walletId: "1",
      transactions: [
        {
          categoryId: "1",
          referenceMonth: "2021-03",
          value: 4.98,
        },
      ],
    });
  });

  it("should process empty transaction without errors", async () => {
    const emptyEvent = {
      arguments: {
        input: {
          transactions: [],
        },
      },
    };
    const result = await handler(emptyEvent);
    expect(result).toEqual({
      errors: [],
    });
  });
});
