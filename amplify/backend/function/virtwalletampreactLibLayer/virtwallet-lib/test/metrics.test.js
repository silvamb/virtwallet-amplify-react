const mockGraphqlOperation = jest.fn();

jest.mock("../src/virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation, GraphQLError: Error };
});

const { incrementMetrics, incrementMetricsQuery } = require("../src/metrics");

const event = {
  accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
  walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
  transactions: [
    {
      referenceMonth: "2020-01",
      value: "1.10",
      categoryId: "b1420880-5396-4c91-9cca-e9367786f858",
    },
    {
      referenceMonth: "2020-01",
      value: "2",
      categoryId: "b1420880-5396-4c91-9cca-e9367786f858",
    },
    {
      referenceMonth: "2020-02",
      value: "3.20",
      categoryId: "b1420880-5396-4c91-9cca-e9367786f858",
    },
    {
      referenceMonth: "2020-02",
      value: "4.3",
      categoryId: "230e1e02-ee15-458d-ae91-b715133890c5",
    },
    {
      referenceMonth: "2020-01",
      value: "5.45",
    },
    {
      referenceMonth: "2020-02",
      value: "6.56",
    },
  ],
};

describe("UpdateMetricsTests", () => {
  const incrementMetricsReponse = {
    data: {
      incrementMetrics: {
        date: "2020",
        categoryId: "b1420880-5396-4c91-9cca-e9367786f858",
        granularity: "YEARLY",
        sum: 250,
        count: 4,
      },
    },
  };

  let result;

  beforeAll(async () => {
    mockGraphqlOperation.mockReturnValue(incrementMetricsReponse);
    result = await incrementMetrics(event);
  });

  afterAll(() => {
    mockGraphqlOperation.mockReset();
  });

  it("should calculate metrics", async () => {
    expect(result).toEqual({
      data: Array(8).fill(incrementMetricsReponse.data.incrementMetrics),
      errors: [],
    });
  });

  it("should had calculated the monthly metrics by month and category", async () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: incrementMetricsQuery,
      variables: {
        input: {
          accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
          walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
          date: "2020-01",
          categoryId: "b1420880-5396-4c91-9cca-e9367786f858",
          granularity: "MONTHLY",
          sum: 3.1,
          count: 2,
        },
      },
    });
  });

  it("should had calculated the yearly metrics by month and category", async () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: incrementMetricsQuery,
      variables: {
        input: {
          accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
          walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
          date: "2020",
          categoryId: "b1420880-5396-4c91-9cca-e9367786f858",
          granularity: "YEARLY",
          sum: 6.3,
          count: 3,
        },
      },
    });
  });

  it("should had calculated the monthly metrics by month without category", async () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: incrementMetricsQuery,
      variables: {
        input: {
          accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
          walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
          date: "2020-01",
          categoryId: "",
          granularity: "MONTHLY",
          sum: 5.45,
          count: 1,
        },
      },
    });
  });

  it("should had calculated the yearly metrics by month without category", async () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: incrementMetricsQuery,
      variables: {
        input: {
          accountId: "4306bec7-c283-42a8-b67d-04ec3f4dccf6",
          walletId: "5694a155-960a-4553-8e92-c16dfaec0509",
          date: "2020",
          categoryId: "",
          granularity: "YEARLY",
          sum: 12.01,
          count: 2,
        },
      },
    });
  });
});

describe("UpdateMetricsErrorTests", () => {
  afterAll(() => {
    mockGraphqlOperation.mockReset();
  });

  it("should return empty list when there are errors updating metrics", async () => {
    const incrementMetricsReponse = {
      data: null,
      errors: [
        {
          message: "Unauthorized",
        },
      ],
    };
    mockGraphqlOperation.mockReturnValue(incrementMetricsReponse);
    const results = await incrementMetrics(event);
    expect(results).toEqual({
      data: [],
      errors: Array(8).fill(new Error("Error updating metrics")),
    });
  });
});
