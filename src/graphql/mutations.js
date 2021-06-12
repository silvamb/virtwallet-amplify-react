/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createAccount = /* GraphQL */ `
  mutation CreateAccount(
    $input: CreateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    createAccount(input: $input, condition: $condition) {
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
          accountId
          id
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
export const updateAccount = /* GraphQL */ `
  mutation UpdateAccount(
    $input: UpdateAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    updateAccount(input: $input, condition: $condition) {
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
          accountId
          id
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
export const deleteAccount = /* GraphQL */ `
  mutation DeleteAccount(
    $input: DeleteAccountInput!
    $condition: ModelAccountConditionInput
  ) {
    deleteAccount(input: $input, condition: $condition) {
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
          accountId
          id
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      accountId
      id
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      accountId
      id
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      accountId
      id
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
export const createWallet = /* GraphQL */ `
  mutation CreateWallet(
    $input: CreateWalletInput!
    $condition: ModelWalletConditionInput
  ) {
    createWallet(input: $input, condition: $condition) {
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
export const updateWallet = /* GraphQL */ `
  mutation UpdateWallet(
    $input: UpdateWalletInput!
    $condition: ModelWalletConditionInput
  ) {
    updateWallet(input: $input, condition: $condition) {
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
export const deleteWallet = /* GraphQL */ `
  mutation DeleteWallet(
    $input: DeleteWalletInput!
    $condition: ModelWalletConditionInput
  ) {
    deleteWallet(input: $input, condition: $condition) {
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
export const createCategoryRule = /* GraphQL */ `
  mutation CreateCategoryRule(
    $input: CreateCategoryRuleInput!
    $condition: ModelCategoryRuleConditionInput
  ) {
    createCategoryRule(input: $input, condition: $condition) {
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
        accountId
        id
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
export const updateCategoryRule = /* GraphQL */ `
  mutation UpdateCategoryRule(
    $input: UpdateCategoryRuleInput!
    $condition: ModelCategoryRuleConditionInput
  ) {
    updateCategoryRule(input: $input, condition: $condition) {
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
        accountId
        id
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
export const deleteCategoryRule = /* GraphQL */ `
  mutation DeleteCategoryRule(
    $input: DeleteCategoryRuleInput!
    $condition: ModelCategoryRuleConditionInput
  ) {
    deleteCategoryRule(input: $input, condition: $condition) {
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
        accountId
        id
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
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
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
        accountId
        id
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
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
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
        accountId
        id
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
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
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
        accountId
        id
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
export const createMetrics = /* GraphQL */ `
  mutation CreateMetrics(
    $input: CreateMetricsInput!
    $condition: ModelMetricsConditionInput
  ) {
    createMetrics(input: $input, condition: $condition) {
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
        accountId
        id
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
export const updateMetrics = /* GraphQL */ `
  mutation UpdateMetrics(
    $input: UpdateMetricsInput!
    $condition: ModelMetricsConditionInput
  ) {
    updateMetrics(input: $input, condition: $condition) {
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
        accountId
        id
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
export const deleteMetrics = /* GraphQL */ `
  mutation DeleteMetrics(
    $input: DeleteMetricsInput!
    $condition: ModelMetricsConditionInput
  ) {
    deleteMetrics(input: $input, condition: $condition) {
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
        accountId
        id
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
