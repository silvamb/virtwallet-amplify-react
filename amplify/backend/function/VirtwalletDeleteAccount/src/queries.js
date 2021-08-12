exports.listMetrics = /* GraphQL */ `
  query ListMetrics(
    $accountId: ID!
    $nextToken: String
  ) {
    listMetricss(
      accountId: $accountId
      nextToken: $nextToken
    ) {
      items {
        accountId
        date
        walletId
        categoryId
      }
      nextToken
    }
  }
`;

exports.deleteMetrics = /* GraphQL */ `
  mutation DeleteMetrics(
    $input: DeleteMetricsInput!
  ) {
    deleteMetrics(input: $input) {
      accountId
    }
  }
`;

exports.listTransactions = /* GraphQL */ `
  query ListTransactions(
    $accountId: ID!
    $nextToken: String
  ) {
    listTransactions(
      accountId: $accountId
      nextToken: $nextToken
    ) {
      items {
        accountId
        date
        walletId
        id
      }
      nextToken
    }
  }
`;

exports.deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
  ) {
    deleteTransaction(input: $input) {
      accountId
    }
  }
`;

exports.listWallets = /* GraphQL */ `
  query ListWallets(
    $filter: ModelWalletFilterInput
    $nextToken: String
  ) {
    listWallets(
      filter: $filter
      nextToken: $nextToken
    ) {
      items {
        id
      }
      nextToken
    }
  }
`;

exports.deleteWallet = /* GraphQL */ `
  mutation DeleteWallets(
    $input: DeleteWalletInput!
  ) {
    deleteWallet(input: $input) {
      id
    }
  }
`;

exports.listCategories = /* GraphQL */ `
  query ListCategories(
    $accountId: ID!
    $nextToken: String
  ) {
    listCategorys(
      accountId: $accountId
      nextToken: $nextToken
    ) {
      items {
        accountId
        id
      }
      nextToken
    }
  }
`;

exports.deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
  ) {
    deleteCategory(input: $input) {
      id
    }
  }
`;

exports.listCategoryRules = /* GraphQL */ `
  query ListCategoryRule(
    $filter: ModelCategoryRuleFilterInput
    $nextToken: String
  ) {
    listCategoryRules(
      filter: $filter
      nextToken: $nextToken
    ) {
      items {
        id
      }
      nextToken
    }
  }
`;

exports.deleteCategoryRule = /* GraphQL */ `
  mutation DeleteCategoryRule(
    $input: DeleteCategoryRuleInput!
  ) {
    deleteCategoryRule(input: $input) {
      id
    }
  }
`;

exports.deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
  ) {
    deleteAccount(input: $input) {
      id
    }
  }
`;