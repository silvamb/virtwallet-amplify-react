/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAccount = /* GraphQL */ `
  subscription OnCreateAccount {
    onCreateAccount {
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
          statementParserId
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
export const onUpdateAccount = /* GraphQL */ `
  subscription OnUpdateAccount {
    onUpdateAccount {
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
          statementParserId
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
export const onDeleteAccount = /* GraphQL */ `
  subscription OnDeleteAccount {
    onDeleteAccount {
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
          statementParserId
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateWallet = /* GraphQL */ `
  subscription OnCreateWallet {
    onCreateWallet {
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
      statementParserId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateWallet = /* GraphQL */ `
  subscription OnUpdateWallet {
    onUpdateWallet {
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
      statementParserId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteWallet = /* GraphQL */ `
  subscription OnDeleteWallet {
    onDeleteWallet {
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
      statementParserId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategoryRule = /* GraphQL */ `
  subscription OnCreateCategoryRule {
    onCreateCategoryRule {
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
export const onUpdateCategoryRule = /* GraphQL */ `
  subscription OnUpdateCategoryRule {
    onUpdateCategoryRule {
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
export const onDeleteCategoryRule = /* GraphQL */ `
  subscription OnDeleteCategoryRule {
    onDeleteCategoryRule {
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
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction {
    onCreateTransaction {
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
        statementParserId
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction {
    onUpdateTransaction {
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
        statementParserId
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction {
    onDeleteTransaction {
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
        statementParserId
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
export const onCreateMetrics = /* GraphQL */ `
  subscription OnCreateMetrics {
    onCreateMetrics {
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
        statementParserId
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
export const onUpdateMetrics = /* GraphQL */ `
  subscription OnUpdateMetrics {
    onUpdateMetrics {
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
        statementParserId
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
export const onDeleteMetrics = /* GraphQL */ `
  subscription OnDeleteMetrics {
    onDeleteMetrics {
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
        statementParserId
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
export const onCreateStatementFileProcess = /* GraphQL */ `
  subscription OnCreateStatementFileProcess {
    onCreateStatementFileProcess {
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
        statementParserId
        createdAt
        updatedAt
      }
      id
      fileName
      currentStatus
      history {
        status
        statusDate
        success
        statusMessage
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateStatementFileProcess = /* GraphQL */ `
  subscription OnUpdateStatementFileProcess {
    onUpdateStatementFileProcess {
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
        statementParserId
        createdAt
        updatedAt
      }
      id
      fileName
      currentStatus
      history {
        status
        statusDate
        success
        statusMessage
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteStatementFileProcess = /* GraphQL */ `
  subscription OnDeleteStatementFileProcess {
    onDeleteStatementFileProcess {
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
        statementParserId
        createdAt
        updatedAt
      }
      id
      fileName
      currentStatus
      history {
        status
        statusDate
        success
        statusMessage
      }
      createdAt
      updatedAt
    }
  }
`;
