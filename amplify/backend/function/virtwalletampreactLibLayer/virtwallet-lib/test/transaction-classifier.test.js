const categoryRules = [
  {
    categoryId: "1",
    keyword: "A KEYWORD",
    priority: 100,
    ruleType: "KEYWORD",
  },
  {
    categoryId: "2",
    name: "Starts With Pay",
    type: "STARTS_WITH",
    parameter: "PAY",
    priority: 100,
    ruleType: "EXPRESSION",
  },
  {
    categoryId: "3",
    name: "Contains Lidl",
    type: "CONTAINS",
    parameter: "LIDL",
    priority: 100,
    ruleType: "EXPRESSION",
  },
  {
    categoryId: "4",
    name: "Ends with Bank",
    type: "REGEX",
    parameter: "BANK$",
    priority: 100,
    ruleType: "EXPRESSION",
  },
  {
    categoryId: "5",
    name: "Contains Parking",
    type: "CONTAINS",
    parameter: "PARKING",
    priority: 100,
    ruleType: "EXPRESSION",
  },
  {
    categoryId: "6",
    name: "Starts With Park",
    type: "STARTS_WITH",
    parameter: "PARK",
    priority: 110,
    ruleType: "EXPRESSION",
  },
  {
    categoryId: "7",
    keyword: "RAIL",
    priority: 100,
    ruleType: "KEYWORD",
  },
  {
    categoryId: "8",
    name: "Contains Rail",
    type: "CONTAINS",
    parameter: "RAIL",
    priority: 110,
    ruleType: "EXPRESSION",
  },
];

const mockGraphqlOperation = jest.fn();

jest.mock("../src/virtwallet-graphql-client", () => {
  return { graphqlOperation: mockGraphqlOperation };
});

mockGraphqlOperation.mockReturnValue({
  data: {
    listCategoryRules: {
      items: categoryRules,
    },
  },
});

const { classify } = require("../src/transaction-classifier");
const accountId = "4306bec7-c283-42a8-b67d-04ec3f4dccf6";

test("Should classify a transaction according to a keyword", async () => {
  const transactions = [
    {
      id: "1",
      description: "A Keyword, More Words",
      keyword: "A Keyword",
    },
  ];

  await classify(accountId, transactions);

  expect(transactions[0].categoryId).toEqual("1");
});

test("Should classify a transaction matching a starts with rule", async () => {
  const transactions = [
    {
      id: "2",
      description: "PAYPAL, Some store",
      keyword: "PAYPAL",
    },
  ];

  await classify(accountId, transactions);

  expect(transactions[0].categoryId).toEqual("2");
});

test("Should classify a transaction matching a contains rule", async () => {
  const transactions = [
    {
      id: "3",
      description: "LIDL, Coolock",
      keyword: "LIDL",
    },
  ];

  await classify(accountId, transactions);

  expect(transactions[0].categoryId).toEqual("3");
});

test("Should classify a transaction matching a regex rule", async () => {
  const transactions = [
    {
      id: "4",
      description: "Taxes, Ulster Bank",
      keyword: "Taxes",
    },
  ];

  await classify(accountId, transactions);

  expect(transactions[0].categoryId).toEqual("4");
});

test("Should classify a transaction according to a expression with higher priority", async () => {
  const transactions = [
    {
      id: "5",
      description: "PARKING LOT",
      keyword: "PARKING LOT",
    },
  ];

  await classify(accountId, transactions);

  expect(transactions[0].categoryId).toEqual("6");
});

test("Should classify a transaction according to a keyword that also matches an expression rule", async () => {
  const transactions = [
    {
      id: "6",
      description: "RAIL, COMPANY",
      keyword: "RAIL",
    },
  ];

  await classify(accountId, transactions);

  expect(transactions[0].categoryId).toEqual("7");
});

test("Should not match any rule", async () => {
  const transactions = [
    {
      id: "7",
      description: "Mc Donalds, Dublin",
      keyword: "Mc Donalds",
    },
  ];

  await classify(accountId, transactions);

  expect(transactions[0].categoryId).toBeUndefined();
});
