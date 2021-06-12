/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAccount = /* GraphQL */ `
  query GetAccount($id: ID!) {
    getAccount(id: $id) {
      id
      ownerId
      name
      description
      members
      monthStartDateRule {
        dayOfMonth
        currentMonth
        manuallySetPeriods {
          startDate
          endDate
          month
        }
      }
      wallets {
        items {
          id
          accountId
          ownerId
          name
          description
          balance
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      categories {
        items {
          id
          accountId
          name
          description
          type
          createdAt
          updatedAt
        }
        nextToken
      }
      categoryRules {
        items {
          id
          accountId
          categoryId
          ruleType
          priority
          keyword
          name
          type
          parameter
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ownerId
        name
        description
        members
        monthStartDateRule {
          dayOfMonth
          currentMonth
        }
        wallets {
          nextToken
        }
        categories {
          nextToken
        }
        categoryRules {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      accountId
      account {
        id
        ownerId
        name
        description
        members
        monthStartDateRule {
          dayOfMonth
          currentMonth
        }
        wallets {
          nextToken
        }
        categories {
          nextToken
        }
        categoryRules {
          nextToken
        }
        createdAt
        updatedAt
      }
      name
      description
      budget {
        type
        value
      }
      type
      categoryRules {
        items {
          id
          accountId
          categoryId
          ruleType
          priority
          keyword
          name
          type
          parameter
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        accountId
        account {
          id
          ownerId
          name
          description
          members
          createdAt
          updatedAt
        }
        name
        description
        budget {
          type
          value
        }
        type
        categoryRules {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getWallet = /* GraphQL */ `
  query GetWallet($id: ID!) {
    getWallet(id: $id) {
      id
      accountId
      account {
        id
        ownerId
        name
        description
        members
        monthStartDateRule {
          dayOfMonth
          currentMonth
        }
        wallets {
          nextToken
        }
        categories {
          nextToken
        }
        categoryRules {
          nextToken
        }
        createdAt
        updatedAt
      }
      ownerId
      name
      description
      balance
      type
      createdAt
      updatedAt
    }
  }
`;
export const listWallets = /* GraphQL */ `
  query ListWallets(
    $filter: ModelWalletFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listWallets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        accountId
        account {
          id
          ownerId
          name
          description
          members
          createdAt
          updatedAt
        }
        ownerId
        name
        description
        balance
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategoryRule = /* GraphQL */ `
  query GetCategoryRule($id: ID!) {
    getCategoryRule(id: $id) {
      id
      accountId
      account {
        id
        ownerId
        name
        description
        members
        monthStartDateRule {
          dayOfMonth
          currentMonth
        }
        wallets {
          nextToken
        }
        categories {
          nextToken
        }
        categoryRules {
          nextToken
        }
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        accountId
        account {
          id
          ownerId
          name
          description
          members
          createdAt
          updatedAt
        }
        name
        description
        budget {
          type
          value
        }
        type
        categoryRules {
          nextToken
        }
        createdAt
        updatedAt
      }
      ruleType
      priority
      keyword
      name
      type
      parameter
      createdAt
      updatedAt
    }
  }
`;
export const listCategoryRules = /* GraphQL */ `
  query ListCategoryRules(
    $filter: ModelCategoryRuleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategoryRules(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        accountId
        account {
          id
          ownerId
          name
          description
          members
          createdAt
          updatedAt
        }
        categoryId
        category {
          id
          accountId
          name
          description
          type
          createdAt
          updatedAt
        }
        ruleType
        priority
        keyword
        name
        type
        parameter
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTransaction = /* GraphQL */ `
  query GetTransaction(
    $accountId: ID!
    $date: AWSDate!
    $walletId: ID!
    $id: ID!
  ) {
    getTransaction(
      accountId: $accountId
      date: $date
      walletId: $walletId
      id: $id
    ) {
      id
      accountId
      account {
        id
        ownerId
        name
        description
        members
        monthStartDateRule {
          dayOfMonth
          currentMonth
        }
        wallets {
          nextToken
        }
        categories {
          nextToken
        }
        categoryRules {
          nextToken
        }
        createdAt
        updatedAt
      }
      walletId
      wallet {
        id
        accountId
        account {
          id
          ownerId
          name
          description
          members
          createdAt
          updatedAt
        }
        ownerId
        name
        description
        balance
        type
        createdAt
        updatedAt
      }
      date
      categoryId
      category {
        id
        accountId
        account {
          id
          ownerId
          name
          description
          members
          createdAt
          updatedAt
        }
        name
        description
        budget {
          type
          value
        }
        type
        categoryRules {
          nextToken
        }
        createdAt
        updatedAt
      }
      dt
      referenceMonth
      value
      description
      keyword
      type
      balance
      balanceType
      source
      sourceType
      createdAt
      updatedAt
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $accountId: ID
    $dateWalletIdId: ModelTransactionPrimaryCompositeKeyConditionInput
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listTransactions(
      accountId: $accountId
      dateWalletIdId: $dateWalletIdId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        accountId
        account {
          id
          ownerId
          name
          description
          members
          createdAt
          updatedAt
        }
        walletId
        wallet {
          id
          accountId
          ownerId
          name
          description
          balance
          type
          createdAt
          updatedAt
        }
        date
        categoryId
        category {
          id
          accountId
          name
          description
          type
          createdAt
          updatedAt
        }
        dt
        referenceMonth
        value
        description
        keyword
        type
        balance
        balanceType
        source
        sourceType
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMetrics = /* GraphQL */ `
  query GetMetrics(
    $accountId: ID!
    $date: String!
    $walletId: ID!
    $categoryId: ID!
  ) {
    getMetrics(
      accountId: $accountId
      date: $date
      walletId: $walletId
      categoryId: $categoryId
    ) {
      id
      accountId
      account {
        id
        ownerId
        name
        description
        members
        monthStartDateRule {
          dayOfMonth
          currentMonth
        }
        wallets {
          nextToken
        }
        categories {
          nextToken
        }
        categoryRules {
          nextToken
        }
        createdAt
        updatedAt
      }
      date
      walletId
      wallet {
        id
        accountId
        account {
          id
          ownerId
          name
          description
          members
          createdAt
          updatedAt
        }
        ownerId
        name
        description
        balance
        type
        createdAt
        updatedAt
      }
      categoryId
      category {
        id
        accountId
        account {
          id
          ownerId
          name
          description
          members
          createdAt
          updatedAt
        }
        name
        description
        budget {
          type
          value
        }
        type
        categoryRules {
          nextToken
        }
        createdAt
        updatedAt
      }
      granularity
      sum
      count
      createdAt
      updatedAt
    }
  }
`;
export const listMetricss = /* GraphQL */ `
  query ListMetricss(
    $accountId: ID
    $dateWalletIdCategoryId: ModelMetricsPrimaryCompositeKeyConditionInput
    $filter: ModelMetricsFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listMetricss(
      accountId: $accountId
      dateWalletIdCategoryId: $dateWalletIdCategoryId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        accountId
        account {
          id
          ownerId
          name
          description
          members
          createdAt
          updatedAt
        }
        date
        walletId
        wallet {
          id
          accountId
          ownerId
          name
          description
          balance
          type
          createdAt
          updatedAt
        }
        categoryId
        category {
          id
          accountId
          name
          description
          type
          createdAt
          updatedAt
        }
        granularity
        sum
        count
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
