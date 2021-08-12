const queries = require("./queries");

const mockGraphqlOperation = jest.fn();

jest.mock("virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation };
});

const { handler } = require("./index");

const emptyData = {
  data: {},
};

describe("DeleteAccount", () => {
  const event = {
    arguments: {
      input: {
        accountId: "1",
      },
    },
  };

  const listMetricsResult = {
    data: {
      listMetricss: {
        items: [
          {
            accountId: "1",
            categoryId: "1",
            date: "2020",
            walletId: "1",
          },
        ],
      },
    },
  };

  const listTransactionsResult = {
    data: {
      listTransactions: {
        items: [
          {
            accountId: "1",
            date: "2021-06-03",
            walletId: "1",
            id: "202106040001",
          },
        ],
      },
    },
  };

  const listWalletsResult = {
    data: {
      listWallets: {
        items: [
          {
            id: "1",
          },
        ],
      },
    },
  };

  const listCategoriesResult = {
    data: {
      listCategorys: {
        items: [
          {
            accountId: "1",
            id: "1",
          },
        ],
      },
    },
  };


  const listCategoryRulesResult = {
    data: {
      listCategoryRules: {
        items: [
          {
            id: "1",
          },
        ],
      },
    },
  };

  let result;

  beforeAll(async () => {
    mockGraphqlOperation
      .mockReturnValueOnce(listMetricsResult)
      .mockReturnValueOnce(emptyData)
      .mockReturnValueOnce(listTransactionsResult)
      .mockReturnValueOnce(emptyData)
      .mockReturnValueOnce(listWalletsResult)
      .mockReturnValueOnce(emptyData)
      .mockReturnValueOnce(listCategoriesResult)
      .mockReturnValueOnce(emptyData)
      .mockReturnValueOnce(listCategoryRulesResult)
      .mockReturnValueOnce(emptyData)
      .mockReturnValueOnce(emptyData);

    result = await handler(event);
  });

  afterAll(() => {
    mockGraphqlOperation.mockReset();
  });

  it("should delete all items from the acount", () => {
    expect(result).toEqual({
      metricsDeleted: {
        deleted: 1,
        errors: 0,
      },
      transactionsDeleted: {
        deleted: 1,
        errors: 0,
      },
      walletsDeleted: {
        deleted: 1,
        errors: 0,
      },
      categoriesDeleted: {
        deleted: 1,
        errors: 0,
      },
      categoryRulesDeleted: {
        deleted: 1,
        errors: 0,
      },
      accountDeleted: {
        deleted: 1,
        errors: 0,
      },
    });
  });

  it("should delete all metrics from the account", () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: queries.listMetrics,
      variables: { accountId: "1" },
    });

    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: queries.deleteMetrics,
      variables: { input: listMetricsResult.data.listMetricss.items[0] },
    });
  });

  it("should delete all transactions from the account", () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: queries.listTransactions,
      variables: { accountId: "1" },
    });

    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: queries.deleteTransaction,
      variables: {
        input: listTransactionsResult.data.listTransactions.items[0],
      },
    });
  });

  it("should delete all wallets from the account", () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: queries.listWallets,
      variables: { filter: { accountId: { eq: "1" } } },
    });

    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: queries.deleteWallet,
      variables: {
        input: listWalletsResult.data.listWallets.items[0],
      },
    });
  });

  it("should delete all categories from the account", () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: queries.listCategories,
      variables: { accountId: "1"},
    });

    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: queries.deleteCategory,
      variables: {
        input: listCategoriesResult.data.listCategorys.items[0],
      },
    });
  });

  it("should delete all category rules from the account", () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: queries.listCategoryRules,
      variables: { filter: { accountId: { eq: "1" } } },
    });

    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: queries.deleteCategoryRule,
      variables: {
        input: listCategoryRulesResult.data.listCategoryRules.items[0],
      },
    });
  });

  it("should delete the account", () => {
    expect(mockGraphqlOperation).toHaveBeenCalledWith({
      query: queries.deleteAccount,
      variables: {
        input: {id: "1"},
      },
    });
  });
});
