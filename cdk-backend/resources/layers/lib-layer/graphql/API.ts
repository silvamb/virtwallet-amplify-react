/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type RequestFileUploadInput = {
  accountId: string,
  walletId: string,
  parserId: string,
  fileName: string,
};

export type CreateAccountInput = {
  id?: string | null,
  ownerId: string,
  name: string,
  description?: string | null,
  members?: Array< string | null > | null,
  monthStartDateRule?: MonthStartDateRuleInput | null,
};

export type MonthStartDateRuleInput = {
  dayOfMonth: number,
  currentMonth: boolean,
  manuallySetPeriods?: Array< CustomPeriodInput | null > | null,
};

export type CustomPeriodInput = {
  startDate: string,
  endDate: string,
  month: string,
};

export type ModelAccountConditionInput = {
  ownerId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  members?: ModelStringInput | null,
  and?: Array< ModelAccountConditionInput | null > | null,
  or?: Array< ModelAccountConditionInput | null > | null,
  not?: ModelAccountConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export enum WalletType {
  CHECKING_ACCOUNT = "CHECKING_ACCOUNT",
  CREDIT_CARD = "CREDIT_CARD",
  CASH = "CASH",
  SAVINGS_ACCOUNT = "SAVINGS_ACCOUNT",
}


export enum CategoryType {
  INCOME = "INCOME",
  EXPENDITURE = "EXPENDITURE",
}


export enum CategoryRuleType {
  KEYWORD = "KEYWORD",
  EXPRESSION = "EXPRESSION",
}


export enum ExpressionRuleType {
  CONTAINS = "CONTAINS",
  STARTSWITH = "STARTSWITH",
  REGEX = "REGEX",
}


export type UpdateAccountInput = {
  id: string,
  ownerId?: string | null,
  name?: string | null,
  description?: string | null,
  members?: Array< string | null > | null,
  monthStartDateRule?: MonthStartDateRuleInput | null,
};

export type DeleteAccountInput = {
  id?: string | null,
};

export type CreateCategoryInput = {
  accountId: string,
  id?: string | null,
  name: string,
  description?: string | null,
  budget?: BudgetInput | null,
  type?: CategoryType | null,
};

export type BudgetInput = {
  type: BudgetType,
  value: number,
};

export enum BudgetType {
  MONTHLY = "MONTHLY",
  BIMONTHLY = "BIMONTHLY",
  YEARLY = "YEARLY",
}


export type ModelCategoryConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  type?: ModelCategoryTypeInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type ModelCategoryTypeInput = {
  eq?: CategoryType | null,
  ne?: CategoryType | null,
};

export type UpdateCategoryInput = {
  accountId: string,
  id: string,
  name?: string | null,
  description?: string | null,
  budget?: BudgetInput | null,
  type?: CategoryType | null,
};

export type DeleteCategoryInput = {
  accountId: string,
  id: string,
};

export type CreateWalletInput = {
  id?: string | null,
  accountId: string,
  ownerId: string,
  name: string,
  description?: string | null,
  balance?: number | null,
  type?: WalletType | null,
  statementParserId?: string | null,
};

export type ModelWalletConditionInput = {
  accountId?: ModelIDInput | null,
  ownerId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  balance?: ModelFloatInput | null,
  type?: ModelWalletTypeInput | null,
  statementParserId?: ModelStringInput | null,
  and?: Array< ModelWalletConditionInput | null > | null,
  or?: Array< ModelWalletConditionInput | null > | null,
  not?: ModelWalletConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelWalletTypeInput = {
  eq?: WalletType | null,
  ne?: WalletType | null,
};

export type UpdateWalletInput = {
  id: string,
  accountId?: string | null,
  ownerId?: string | null,
  name?: string | null,
  description?: string | null,
  balance?: number | null,
  type?: WalletType | null,
  statementParserId?: string | null,
};

export type DeleteWalletInput = {
  id?: string | null,
};

export type CreateCategoryRuleInput = {
  id?: string | null,
  accountId: string,
  categoryId: string,
  ruleType: CategoryRuleType,
  priority?: number | null,
  keyword?: string | null,
  name?: string | null,
  type?: ExpressionRuleType | null,
  parameter?: string | null,
};

export type ModelCategoryRuleConditionInput = {
  accountId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  ruleType?: ModelCategoryRuleTypeInput | null,
  priority?: ModelIntInput | null,
  keyword?: ModelStringInput | null,
  name?: ModelStringInput | null,
  type?: ModelExpressionRuleTypeInput | null,
  parameter?: ModelStringInput | null,
  and?: Array< ModelCategoryRuleConditionInput | null > | null,
  or?: Array< ModelCategoryRuleConditionInput | null > | null,
  not?: ModelCategoryRuleConditionInput | null,
};

export type ModelCategoryRuleTypeInput = {
  eq?: CategoryRuleType | null,
  ne?: CategoryRuleType | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelExpressionRuleTypeInput = {
  eq?: ExpressionRuleType | null,
  ne?: ExpressionRuleType | null,
};

export type UpdateCategoryRuleInput = {
  id: string,
  accountId?: string | null,
  categoryId?: string | null,
  ruleType?: CategoryRuleType | null,
  priority?: number | null,
  keyword?: string | null,
  name?: string | null,
  type?: ExpressionRuleType | null,
  parameter?: string | null,
};

export type DeleteCategoryRuleInput = {
  id?: string | null,
};

export type CreateTransactionInput = {
  id?: string | null,
  accountId: string,
  walletId: string,
  date: string,
  categoryId: string,
  dt?: string | null,
  referenceMonth: string,
  value: number,
  description: string,
  keyword: string,
  type?: string | null,
  balance?: number | null,
  balanceType?: BalanceType | null,
  source?: string | null,
  sourceType?: SourceType | null,
};

export enum BalanceType {
  CREDIT = "CREDIT",
  DEBIT = "DEBIT",
}


export enum SourceType {
  AUTOMATIC = "AUTOMATIC",
  MANUAL = "MANUAL",
}


export type ModelTransactionConditionInput = {
  categoryId?: ModelIDInput | null,
  dt?: ModelStringInput | null,
  referenceMonth?: ModelStringInput | null,
  value?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  keyword?: ModelStringInput | null,
  type?: ModelStringInput | null,
  balance?: ModelFloatInput | null,
  balanceType?: ModelBalanceTypeInput | null,
  source?: ModelStringInput | null,
  sourceType?: ModelSourceTypeInput | null,
  and?: Array< ModelTransactionConditionInput | null > | null,
  or?: Array< ModelTransactionConditionInput | null > | null,
  not?: ModelTransactionConditionInput | null,
};

export type ModelBalanceTypeInput = {
  eq?: BalanceType | null,
  ne?: BalanceType | null,
};

export type ModelSourceTypeInput = {
  eq?: SourceType | null,
  ne?: SourceType | null,
};

export type UpdateTransactionInput = {
  id: string,
  accountId: string,
  walletId: string,
  date: string,
  categoryId?: string | null,
  dt?: string | null,
  referenceMonth?: string | null,
  value?: number | null,
  description?: string | null,
  keyword?: string | null,
  type?: string | null,
  balance?: number | null,
  balanceType?: BalanceType | null,
  source?: string | null,
  sourceType?: SourceType | null,
};

export type DeleteTransactionInput = {
  accountId: string,
  date: string,
  walletId: string,
  id: string,
};

export type CreateMetricsInput = {
  id?: string | null,
  accountId: string,
  date: string,
  walletId: string,
  categoryId: string,
  granularity?: Granularity | null,
  sum?: number | null,
  count?: number | null,
};

export enum Granularity {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}


export type ModelMetricsConditionInput = {
  granularity?: ModelGranularityInput | null,
  sum?: ModelFloatInput | null,
  count?: ModelIntInput | null,
  and?: Array< ModelMetricsConditionInput | null > | null,
  or?: Array< ModelMetricsConditionInput | null > | null,
  not?: ModelMetricsConditionInput | null,
};

export type ModelGranularityInput = {
  eq?: Granularity | null,
  ne?: Granularity | null,
};

export type UpdateMetricsInput = {
  id: string,
  accountId: string,
  date: string,
  walletId: string,
  categoryId: string,
  granularity?: Granularity | null,
  sum?: number | null,
  count?: number | null,
};

export type DeleteMetricsInput = {
  accountId: string,
  date: string,
  walletId: string,
  categoryId: string,
};

export type CreateStatementFileProcessInput = {
  accountId: string,
  id?: string | null,
  fileName: string,
  currentStatus: FileStatus,
  history?: Array< StatementFileProcessHistoryInput | null > | null,
};

export enum FileStatus {
  NEW = "NEW",
  PROVISIONED = "PROVISIONED",
  UPLOADED = "UPLOADED",
  PARSING = "PARSING",
  PARSED = "PARSED",
  CLASSIFIED = "CLASSIFIED",
  FAILED = "FAILED",
}


export type StatementFileProcessHistoryInput = {
  status: FileStatus,
  statusDate: string,
  success: boolean,
  statusMessage?: string | null,
};

export type ModelStatementFileProcessConditionInput = {
  fileName?: ModelStringInput | null,
  currentStatus?: ModelFileStatusInput | null,
  and?: Array< ModelStatementFileProcessConditionInput | null > | null,
  or?: Array< ModelStatementFileProcessConditionInput | null > | null,
  not?: ModelStatementFileProcessConditionInput | null,
};

export type ModelFileStatusInput = {
  eq?: FileStatus | null,
  ne?: FileStatus | null,
};

export type UpdateStatementFileProcessInput = {
  accountId: string,
  id: string,
  fileName?: string | null,
  currentStatus?: FileStatus | null,
  history?: Array< StatementFileProcessHistoryInput | null > | null,
};

export type DeleteStatementFileProcessInput = {
  accountId: string,
  id: string,
};

export type ModelAccountFilterInput = {
  id?: ModelIDInput | null,
  ownerId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  members?: ModelStringInput | null,
  and?: Array< ModelAccountFilterInput | null > | null,
  or?: Array< ModelAccountFilterInput | null > | null,
  not?: ModelAccountFilterInput | null,
};

export type ModelIDKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelCategoryFilterInput = {
  accountId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  type?: ModelCategoryTypeInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelWalletFilterInput = {
  id?: ModelIDInput | null,
  accountId?: ModelIDInput | null,
  ownerId?: ModelStringInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  balance?: ModelFloatInput | null,
  type?: ModelWalletTypeInput | null,
  statementParserId?: ModelStringInput | null,
  and?: Array< ModelWalletFilterInput | null > | null,
  or?: Array< ModelWalletFilterInput | null > | null,
  not?: ModelWalletFilterInput | null,
};

export type ModelCategoryRuleFilterInput = {
  id?: ModelIDInput | null,
  accountId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  ruleType?: ModelCategoryRuleTypeInput | null,
  priority?: ModelIntInput | null,
  keyword?: ModelStringInput | null,
  name?: ModelStringInput | null,
  type?: ModelExpressionRuleTypeInput | null,
  parameter?: ModelStringInput | null,
  and?: Array< ModelCategoryRuleFilterInput | null > | null,
  or?: Array< ModelCategoryRuleFilterInput | null > | null,
  not?: ModelCategoryRuleFilterInput | null,
};

export type ModelTransactionPrimaryCompositeKeyConditionInput = {
  eq?: ModelTransactionPrimaryCompositeKeyInput | null,
  le?: ModelTransactionPrimaryCompositeKeyInput | null,
  lt?: ModelTransactionPrimaryCompositeKeyInput | null,
  ge?: ModelTransactionPrimaryCompositeKeyInput | null,
  gt?: ModelTransactionPrimaryCompositeKeyInput | null,
  between?: Array< ModelTransactionPrimaryCompositeKeyInput | null > | null,
  beginsWith?: ModelTransactionPrimaryCompositeKeyInput | null,
};

export type ModelTransactionPrimaryCompositeKeyInput = {
  date?: string | null,
  walletId?: string | null,
  id?: string | null,
};

export type ModelTransactionFilterInput = {
  id?: ModelIDInput | null,
  accountId?: ModelIDInput | null,
  walletId?: ModelIDInput | null,
  date?: ModelStringInput | null,
  categoryId?: ModelIDInput | null,
  dt?: ModelStringInput | null,
  referenceMonth?: ModelStringInput | null,
  value?: ModelFloatInput | null,
  description?: ModelStringInput | null,
  keyword?: ModelStringInput | null,
  type?: ModelStringInput | null,
  balance?: ModelFloatInput | null,
  balanceType?: ModelBalanceTypeInput | null,
  source?: ModelStringInput | null,
  sourceType?: ModelSourceTypeInput | null,
  and?: Array< ModelTransactionFilterInput | null > | null,
  or?: Array< ModelTransactionFilterInput | null > | null,
  not?: ModelTransactionFilterInput | null,
};

export type ModelMetricsPrimaryCompositeKeyConditionInput = {
  eq?: ModelMetricsPrimaryCompositeKeyInput | null,
  le?: ModelMetricsPrimaryCompositeKeyInput | null,
  lt?: ModelMetricsPrimaryCompositeKeyInput | null,
  ge?: ModelMetricsPrimaryCompositeKeyInput | null,
  gt?: ModelMetricsPrimaryCompositeKeyInput | null,
  between?: Array< ModelMetricsPrimaryCompositeKeyInput | null > | null,
  beginsWith?: ModelMetricsPrimaryCompositeKeyInput | null,
};

export type ModelMetricsPrimaryCompositeKeyInput = {
  date?: string | null,
  walletId?: string | null,
  categoryId?: string | null,
};

export type ModelMetricsFilterInput = {
  id?: ModelIDInput | null,
  accountId?: ModelIDInput | null,
  date?: ModelStringInput | null,
  walletId?: ModelIDInput | null,
  categoryId?: ModelIDInput | null,
  granularity?: ModelGranularityInput | null,
  sum?: ModelFloatInput | null,
  count?: ModelIntInput | null,
  and?: Array< ModelMetricsFilterInput | null > | null,
  or?: Array< ModelMetricsFilterInput | null > | null,
  not?: ModelMetricsFilterInput | null,
};

export type ModelStatementFileProcessFilterInput = {
  accountId?: ModelIDInput | null,
  id?: ModelIDInput | null,
  fileName?: ModelStringInput | null,
  currentStatus?: ModelFileStatusInput | null,
  and?: Array< ModelStatementFileProcessFilterInput | null > | null,
  or?: Array< ModelStatementFileProcessFilterInput | null > | null,
  not?: ModelStatementFileProcessFilterInput | null,
};

export type RequestFileUploadMutationVariables = {
  input?: RequestFileUploadInput | null,
};

export type RequestFileUploadMutation = {
  requestFileUpload:  {
    __typename: "RequestFileUploadResponse",
    s3Url: string,
    statementFileProcessId: string,
  } | null,
};

export type CreateAccountMutationVariables = {
  input: CreateAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type CreateAccountMutation = {
  createAccount:  {
    __typename: "Account",
    id: string,
    ownerId: string,
    name: string,
    description: string | null,
    members: Array< string | null > | null,
    monthStartDateRule:  {
      __typename: "MonthStartDateRule",
      dayOfMonth: number,
      currentMonth: boolean,
      manuallySetPeriods:  Array< {
        __typename: "CustomPeriod",
        startDate: string,
        endDate: string,
        month: string,
      } | null > | null,
    } | null,
    wallets:  {
      __typename: "ModelWalletConnection",
      items:  Array< {
        __typename: "Wallet",
        id: string,
        accountId: string,
        ownerId: string,
        name: string,
        description: string | null,
        balance: number | null,
        type: WalletType | null,
        statementParserId: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categories:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        accountId: string,
        id: string,
        name: string,
        description: string | null,
        type: CategoryType | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateAccountMutationVariables = {
  input: UpdateAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type UpdateAccountMutation = {
  updateAccount:  {
    __typename: "Account",
    id: string,
    ownerId: string,
    name: string,
    description: string | null,
    members: Array< string | null > | null,
    monthStartDateRule:  {
      __typename: "MonthStartDateRule",
      dayOfMonth: number,
      currentMonth: boolean,
      manuallySetPeriods:  Array< {
        __typename: "CustomPeriod",
        startDate: string,
        endDate: string,
        month: string,
      } | null > | null,
    } | null,
    wallets:  {
      __typename: "ModelWalletConnection",
      items:  Array< {
        __typename: "Wallet",
        id: string,
        accountId: string,
        ownerId: string,
        name: string,
        description: string | null,
        balance: number | null,
        type: WalletType | null,
        statementParserId: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categories:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        accountId: string,
        id: string,
        name: string,
        description: string | null,
        type: CategoryType | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteAccountMutationVariables = {
  input: DeleteAccountInput,
  condition?: ModelAccountConditionInput | null,
};

export type DeleteAccountMutation = {
  deleteAccount:  {
    __typename: "Account",
    id: string,
    ownerId: string,
    name: string,
    description: string | null,
    members: Array< string | null > | null,
    monthStartDateRule:  {
      __typename: "MonthStartDateRule",
      dayOfMonth: number,
      currentMonth: boolean,
      manuallySetPeriods:  Array< {
        __typename: "CustomPeriod",
        startDate: string,
        endDate: string,
        month: string,
      } | null > | null,
    } | null,
    wallets:  {
      __typename: "ModelWalletConnection",
      items:  Array< {
        __typename: "Wallet",
        id: string,
        accountId: string,
        ownerId: string,
        name: string,
        description: string | null,
        balance: number | null,
        type: WalletType | null,
        statementParserId: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categories:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        accountId: string,
        id: string,
        name: string,
        description: string | null,
        type: CategoryType | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory:  {
    __typename: "Category",
    accountId: string,
    id: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description: string | null,
    budget:  {
      __typename: "Budget",
      type: BudgetType,
      value: number,
    } | null,
    type: CategoryType | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory:  {
    __typename: "Category",
    accountId: string,
    id: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description: string | null,
    budget:  {
      __typename: "Budget",
      type: BudgetType,
      value: number,
    } | null,
    type: CategoryType | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory:  {
    __typename: "Category",
    accountId: string,
    id: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description: string | null,
    budget:  {
      __typename: "Budget",
      type: BudgetType,
      value: number,
    } | null,
    type: CategoryType | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateWalletMutationVariables = {
  input: CreateWalletInput,
  condition?: ModelWalletConditionInput | null,
};

export type CreateWalletMutation = {
  createWallet:  {
    __typename: "Wallet",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ownerId: string,
    name: string,
    description: string | null,
    balance: number | null,
    type: WalletType | null,
    statementParserId: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateWalletMutationVariables = {
  input: UpdateWalletInput,
  condition?: ModelWalletConditionInput | null,
};

export type UpdateWalletMutation = {
  updateWallet:  {
    __typename: "Wallet",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ownerId: string,
    name: string,
    description: string | null,
    balance: number | null,
    type: WalletType | null,
    statementParserId: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteWalletMutationVariables = {
  input: DeleteWalletInput,
  condition?: ModelWalletConditionInput | null,
};

export type DeleteWalletMutation = {
  deleteWallet:  {
    __typename: "Wallet",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ownerId: string,
    name: string,
    description: string | null,
    balance: number | null,
    type: WalletType | null,
    statementParserId: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCategoryRuleMutationVariables = {
  input: CreateCategoryRuleInput,
  condition?: ModelCategoryRuleConditionInput | null,
};

export type CreateCategoryRuleMutation = {
  createCategoryRule:  {
    __typename: "CategoryRule",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ruleType: CategoryRuleType,
    priority: number | null,
    keyword: string | null,
    name: string | null,
    type: ExpressionRuleType | null,
    parameter: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCategoryRuleMutationVariables = {
  input: UpdateCategoryRuleInput,
  condition?: ModelCategoryRuleConditionInput | null,
};

export type UpdateCategoryRuleMutation = {
  updateCategoryRule:  {
    __typename: "CategoryRule",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ruleType: CategoryRuleType,
    priority: number | null,
    keyword: string | null,
    name: string | null,
    type: ExpressionRuleType | null,
    parameter: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCategoryRuleMutationVariables = {
  input: DeleteCategoryRuleInput,
  condition?: ModelCategoryRuleConditionInput | null,
};

export type DeleteCategoryRuleMutation = {
  deleteCategoryRule:  {
    __typename: "CategoryRule",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ruleType: CategoryRuleType,
    priority: number | null,
    keyword: string | null,
    name: string | null,
    type: ExpressionRuleType | null,
    parameter: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateTransactionMutationVariables = {
  input: CreateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type CreateTransactionMutation = {
  createTransaction:  {
    __typename: "Transaction",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    dt: string | null,
    referenceMonth: string,
    value: number,
    description: string,
    keyword: string,
    type: string | null,
    balance: number | null,
    balanceType: BalanceType | null,
    source: string | null,
    sourceType: SourceType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateTransactionMutationVariables = {
  input: UpdateTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type UpdateTransactionMutation = {
  updateTransaction:  {
    __typename: "Transaction",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    dt: string | null,
    referenceMonth: string,
    value: number,
    description: string,
    keyword: string,
    type: string | null,
    balance: number | null,
    balanceType: BalanceType | null,
    source: string | null,
    sourceType: SourceType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteTransactionMutationVariables = {
  input: DeleteTransactionInput,
  condition?: ModelTransactionConditionInput | null,
};

export type DeleteTransactionMutation = {
  deleteTransaction:  {
    __typename: "Transaction",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    dt: string | null,
    referenceMonth: string,
    value: number,
    description: string,
    keyword: string,
    type: string | null,
    balance: number | null,
    balanceType: BalanceType | null,
    source: string | null,
    sourceType: SourceType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateMetricsMutationVariables = {
  input: CreateMetricsInput,
  condition?: ModelMetricsConditionInput | null,
};

export type CreateMetricsMutation = {
  createMetrics:  {
    __typename: "Metrics",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    granularity: Granularity | null,
    sum: number | null,
    count: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateMetricsMutationVariables = {
  input: UpdateMetricsInput,
  condition?: ModelMetricsConditionInput | null,
};

export type UpdateMetricsMutation = {
  updateMetrics:  {
    __typename: "Metrics",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    granularity: Granularity | null,
    sum: number | null,
    count: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteMetricsMutationVariables = {
  input: DeleteMetricsInput,
  condition?: ModelMetricsConditionInput | null,
};

export type DeleteMetricsMutation = {
  deleteMetrics:  {
    __typename: "Metrics",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    granularity: Granularity | null,
    sum: number | null,
    count: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateStatementFileProcessMutationVariables = {
  input: CreateStatementFileProcessInput,
  condition?: ModelStatementFileProcessConditionInput | null,
};

export type CreateStatementFileProcessMutation = {
  createStatementFileProcess:  {
    __typename: "StatementFileProcess",
    accountId: string,
    id: string,
    fileName: string,
    currentStatus: FileStatus,
    history:  Array< {
      __typename: "StatementFileProcessHistory",
      status: FileStatus,
      statusDate: string,
      success: boolean,
      statusMessage: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateStatementFileProcessMutationVariables = {
  input: UpdateStatementFileProcessInput,
  condition?: ModelStatementFileProcessConditionInput | null,
};

export type UpdateStatementFileProcessMutation = {
  updateStatementFileProcess:  {
    __typename: "StatementFileProcess",
    accountId: string,
    id: string,
    fileName: string,
    currentStatus: FileStatus,
    history:  Array< {
      __typename: "StatementFileProcessHistory",
      status: FileStatus,
      statusDate: string,
      success: boolean,
      statusMessage: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteStatementFileProcessMutationVariables = {
  input: DeleteStatementFileProcessInput,
  condition?: ModelStatementFileProcessConditionInput | null,
};

export type DeleteStatementFileProcessMutation = {
  deleteStatementFileProcess:  {
    __typename: "StatementFileProcess",
    accountId: string,
    id: string,
    fileName: string,
    currentStatus: FileStatus,
    history:  Array< {
      __typename: "StatementFileProcessHistory",
      status: FileStatus,
      statusDate: string,
      success: boolean,
      statusMessage: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetAccountQueryVariables = {
  id: string,
};

export type GetAccountQuery = {
  getAccount:  {
    __typename: "Account",
    id: string,
    ownerId: string,
    name: string,
    description: string | null,
    members: Array< string | null > | null,
    monthStartDateRule:  {
      __typename: "MonthStartDateRule",
      dayOfMonth: number,
      currentMonth: boolean,
      manuallySetPeriods:  Array< {
        __typename: "CustomPeriod",
        startDate: string,
        endDate: string,
        month: string,
      } | null > | null,
    } | null,
    wallets:  {
      __typename: "ModelWalletConnection",
      items:  Array< {
        __typename: "Wallet",
        id: string,
        accountId: string,
        ownerId: string,
        name: string,
        description: string | null,
        balance: number | null,
        type: WalletType | null,
        statementParserId: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categories:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        accountId: string,
        id: string,
        name: string,
        description: string | null,
        type: CategoryType | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListAccountsQueryVariables = {
  filter?: ModelAccountFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAccountsQuery = {
  listAccounts:  {
    __typename: "ModelAccountConnection",
    items:  Array< {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  accountId: string,
  id: string,
};

export type GetCategoryQuery = {
  getCategory:  {
    __typename: "Category",
    accountId: string,
    id: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description: string | null,
    budget:  {
      __typename: "Budget",
      type: BudgetType,
      value: number,
    } | null,
    type: CategoryType | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategorysQueryVariables = {
  accountId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListCategorysQuery = {
  listCategorys:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetWalletQueryVariables = {
  id: string,
};

export type GetWalletQuery = {
  getWallet:  {
    __typename: "Wallet",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ownerId: string,
    name: string,
    description: string | null,
    balance: number | null,
    type: WalletType | null,
    statementParserId: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListWalletsQueryVariables = {
  filter?: ModelWalletFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWalletsQuery = {
  listWallets:  {
    __typename: "ModelWalletConnection",
    items:  Array< {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCategoryRuleQueryVariables = {
  id: string,
};

export type GetCategoryRuleQuery = {
  getCategoryRule:  {
    __typename: "CategoryRule",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ruleType: CategoryRuleType,
    priority: number | null,
    keyword: string | null,
    name: string | null,
    type: ExpressionRuleType | null,
    parameter: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCategoryRulesQueryVariables = {
  filter?: ModelCategoryRuleFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategoryRulesQuery = {
  listCategoryRules:  {
    __typename: "ModelCategoryRuleConnection",
    items:  Array< {
      __typename: "CategoryRule",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      categoryId: string,
      category:  {
        __typename: "Category",
        accountId: string,
        id: string,
        name: string,
        description: string | null,
        type: CategoryType | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ruleType: CategoryRuleType,
      priority: number | null,
      keyword: string | null,
      name: string | null,
      type: ExpressionRuleType | null,
      parameter: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetTransactionQueryVariables = {
  accountId: string,
  date: string,
  walletId: string,
  id: string,
};

export type GetTransactionQuery = {
  getTransaction:  {
    __typename: "Transaction",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    dt: string | null,
    referenceMonth: string,
    value: number,
    description: string,
    keyword: string,
    type: string | null,
    balance: number | null,
    balanceType: BalanceType | null,
    source: string | null,
    sourceType: SourceType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListTransactionsQueryVariables = {
  accountId?: string | null,
  dateWalletIdId?: ModelTransactionPrimaryCompositeKeyConditionInput | null,
  filter?: ModelTransactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListTransactionsQuery = {
  listTransactions:  {
    __typename: "ModelTransactionConnection",
    items:  Array< {
      __typename: "Transaction",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      walletId: string,
      wallet:  {
        __typename: "Wallet",
        id: string,
        accountId: string,
        ownerId: string,
        name: string,
        description: string | null,
        balance: number | null,
        type: WalletType | null,
        statementParserId: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      date: string,
      categoryId: string,
      category:  {
        __typename: "Category",
        accountId: string,
        id: string,
        name: string,
        description: string | null,
        type: CategoryType | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      dt: string | null,
      referenceMonth: string,
      value: number,
      description: string,
      keyword: string,
      type: string | null,
      balance: number | null,
      balanceType: BalanceType | null,
      source: string | null,
      sourceType: SourceType | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetMetricsQueryVariables = {
  accountId: string,
  date: string,
  walletId: string,
  categoryId: string,
};

export type GetMetricsQuery = {
  getMetrics:  {
    __typename: "Metrics",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    granularity: Granularity | null,
    sum: number | null,
    count: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListMetricssQueryVariables = {
  accountId?: string | null,
  dateWalletIdCategoryId?: ModelMetricsPrimaryCompositeKeyConditionInput | null,
  filter?: ModelMetricsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListMetricssQuery = {
  listMetricss:  {
    __typename: "ModelMetricsConnection",
    items:  Array< {
      __typename: "Metrics",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      date: string,
      walletId: string,
      wallet:  {
        __typename: "Wallet",
        id: string,
        accountId: string,
        ownerId: string,
        name: string,
        description: string | null,
        balance: number | null,
        type: WalletType | null,
        statementParserId: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      categoryId: string,
      category:  {
        __typename: "Category",
        accountId: string,
        id: string,
        name: string,
        description: string | null,
        type: CategoryType | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      granularity: Granularity | null,
      sum: number | null,
      count: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetStatementFileProcessQueryVariables = {
  accountId: string,
  id: string,
};

export type GetStatementFileProcessQuery = {
  getStatementFileProcess:  {
    __typename: "StatementFileProcess",
    accountId: string,
    id: string,
    fileName: string,
    currentStatus: FileStatus,
    history:  Array< {
      __typename: "StatementFileProcessHistory",
      status: FileStatus,
      statusDate: string,
      success: boolean,
      statusMessage: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListStatementFileProcesssQueryVariables = {
  accountId?: string | null,
  id?: ModelIDKeyConditionInput | null,
  filter?: ModelStatementFileProcessFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListStatementFileProcesssQuery = {
  listStatementFileProcesss:  {
    __typename: "ModelStatementFileProcessConnection",
    items:  Array< {
      __typename: "StatementFileProcess",
      accountId: string,
      id: string,
      fileName: string,
      currentStatus: FileStatus,
      history:  Array< {
        __typename: "StatementFileProcessHistory",
        status: FileStatus,
        statusDate: string,
        success: boolean,
        statusMessage: string | null,
      } | null > | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateAccountSubscription = {
  onCreateAccount:  {
    __typename: "Account",
    id: string,
    ownerId: string,
    name: string,
    description: string | null,
    members: Array< string | null > | null,
    monthStartDateRule:  {
      __typename: "MonthStartDateRule",
      dayOfMonth: number,
      currentMonth: boolean,
      manuallySetPeriods:  Array< {
        __typename: "CustomPeriod",
        startDate: string,
        endDate: string,
        month: string,
      } | null > | null,
    } | null,
    wallets:  {
      __typename: "ModelWalletConnection",
      items:  Array< {
        __typename: "Wallet",
        id: string,
        accountId: string,
        ownerId: string,
        name: string,
        description: string | null,
        balance: number | null,
        type: WalletType | null,
        statementParserId: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categories:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        accountId: string,
        id: string,
        name: string,
        description: string | null,
        type: CategoryType | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateAccountSubscription = {
  onUpdateAccount:  {
    __typename: "Account",
    id: string,
    ownerId: string,
    name: string,
    description: string | null,
    members: Array< string | null > | null,
    monthStartDateRule:  {
      __typename: "MonthStartDateRule",
      dayOfMonth: number,
      currentMonth: boolean,
      manuallySetPeriods:  Array< {
        __typename: "CustomPeriod",
        startDate: string,
        endDate: string,
        month: string,
      } | null > | null,
    } | null,
    wallets:  {
      __typename: "ModelWalletConnection",
      items:  Array< {
        __typename: "Wallet",
        id: string,
        accountId: string,
        ownerId: string,
        name: string,
        description: string | null,
        balance: number | null,
        type: WalletType | null,
        statementParserId: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categories:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        accountId: string,
        id: string,
        name: string,
        description: string | null,
        type: CategoryType | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteAccountSubscription = {
  onDeleteAccount:  {
    __typename: "Account",
    id: string,
    ownerId: string,
    name: string,
    description: string | null,
    members: Array< string | null > | null,
    monthStartDateRule:  {
      __typename: "MonthStartDateRule",
      dayOfMonth: number,
      currentMonth: boolean,
      manuallySetPeriods:  Array< {
        __typename: "CustomPeriod",
        startDate: string,
        endDate: string,
        month: string,
      } | null > | null,
    } | null,
    wallets:  {
      __typename: "ModelWalletConnection",
      items:  Array< {
        __typename: "Wallet",
        id: string,
        accountId: string,
        ownerId: string,
        name: string,
        description: string | null,
        balance: number | null,
        type: WalletType | null,
        statementParserId: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categories:  {
      __typename: "ModelCategoryConnection",
      items:  Array< {
        __typename: "Category",
        accountId: string,
        id: string,
        name: string,
        description: string | null,
        type: CategoryType | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory:  {
    __typename: "Category",
    accountId: string,
    id: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description: string | null,
    budget:  {
      __typename: "Budget",
      type: BudgetType,
      value: number,
    } | null,
    type: CategoryType | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory:  {
    __typename: "Category",
    accountId: string,
    id: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description: string | null,
    budget:  {
      __typename: "Budget",
      type: BudgetType,
      value: number,
    } | null,
    type: CategoryType | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory:  {
    __typename: "Category",
    accountId: string,
    id: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    name: string,
    description: string | null,
    budget:  {
      __typename: "Budget",
      type: BudgetType,
      value: number,
    } | null,
    type: CategoryType | null,
    categoryRules:  {
      __typename: "ModelCategoryRuleConnection",
      items:  Array< {
        __typename: "CategoryRule",
        id: string,
        accountId: string,
        categoryId: string,
        ruleType: CategoryRuleType,
        priority: number | null,
        keyword: string | null,
        name: string | null,
        type: ExpressionRuleType | null,
        parameter: string | null,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateWalletSubscription = {
  onCreateWallet:  {
    __typename: "Wallet",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ownerId: string,
    name: string,
    description: string | null,
    balance: number | null,
    type: WalletType | null,
    statementParserId: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateWalletSubscription = {
  onUpdateWallet:  {
    __typename: "Wallet",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ownerId: string,
    name: string,
    description: string | null,
    balance: number | null,
    type: WalletType | null,
    statementParserId: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteWalletSubscription = {
  onDeleteWallet:  {
    __typename: "Wallet",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ownerId: string,
    name: string,
    description: string | null,
    balance: number | null,
    type: WalletType | null,
    statementParserId: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCategoryRuleSubscription = {
  onCreateCategoryRule:  {
    __typename: "CategoryRule",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ruleType: CategoryRuleType,
    priority: number | null,
    keyword: string | null,
    name: string | null,
    type: ExpressionRuleType | null,
    parameter: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCategoryRuleSubscription = {
  onUpdateCategoryRule:  {
    __typename: "CategoryRule",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ruleType: CategoryRuleType,
    priority: number | null,
    keyword: string | null,
    name: string | null,
    type: ExpressionRuleType | null,
    parameter: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCategoryRuleSubscription = {
  onDeleteCategoryRule:  {
    __typename: "CategoryRule",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    ruleType: CategoryRuleType,
    priority: number | null,
    keyword: string | null,
    name: string | null,
    type: ExpressionRuleType | null,
    parameter: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateTransactionSubscription = {
  onCreateTransaction:  {
    __typename: "Transaction",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    dt: string | null,
    referenceMonth: string,
    value: number,
    description: string,
    keyword: string,
    type: string | null,
    balance: number | null,
    balanceType: BalanceType | null,
    source: string | null,
    sourceType: SourceType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateTransactionSubscription = {
  onUpdateTransaction:  {
    __typename: "Transaction",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    dt: string | null,
    referenceMonth: string,
    value: number,
    description: string,
    keyword: string,
    type: string | null,
    balance: number | null,
    balanceType: BalanceType | null,
    source: string | null,
    sourceType: SourceType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteTransactionSubscription = {
  onDeleteTransaction:  {
    __typename: "Transaction",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    dt: string | null,
    referenceMonth: string,
    value: number,
    description: string,
    keyword: string,
    type: string | null,
    balance: number | null,
    balanceType: BalanceType | null,
    source: string | null,
    sourceType: SourceType | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMetricsSubscription = {
  onCreateMetrics:  {
    __typename: "Metrics",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    granularity: Granularity | null,
    sum: number | null,
    count: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMetricsSubscription = {
  onUpdateMetrics:  {
    __typename: "Metrics",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    granularity: Granularity | null,
    sum: number | null,
    count: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMetricsSubscription = {
  onDeleteMetrics:  {
    __typename: "Metrics",
    id: string,
    accountId: string,
    account:  {
      __typename: "Account",
      id: string,
      ownerId: string,
      name: string,
      description: string | null,
      members: Array< string | null > | null,
      monthStartDateRule:  {
        __typename: "MonthStartDateRule",
        dayOfMonth: number,
        currentMonth: boolean,
      } | null,
      wallets:  {
        __typename: "ModelWalletConnection",
        nextToken: string | null,
      } | null,
      categories:  {
        __typename: "ModelCategoryConnection",
        nextToken: string | null,
      } | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    date: string,
    walletId: string,
    wallet:  {
      __typename: "Wallet",
      id: string,
      accountId: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      ownerId: string,
      name: string,
      description: string | null,
      balance: number | null,
      type: WalletType | null,
      statementParserId: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    categoryId: string,
    category:  {
      __typename: "Category",
      accountId: string,
      id: string,
      account:  {
        __typename: "Account",
        id: string,
        ownerId: string,
        name: string,
        description: string | null,
        members: Array< string | null > | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      name: string,
      description: string | null,
      budget:  {
        __typename: "Budget",
        type: BudgetType,
        value: number,
      } | null,
      type: CategoryType | null,
      categoryRules:  {
        __typename: "ModelCategoryRuleConnection",
        nextToken: string | null,
      } | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    granularity: Granularity | null,
    sum: number | null,
    count: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateStatementFileProcessSubscription = {
  onCreateStatementFileProcess:  {
    __typename: "StatementFileProcess",
    accountId: string,
    id: string,
    fileName: string,
    currentStatus: FileStatus,
    history:  Array< {
      __typename: "StatementFileProcessHistory",
      status: FileStatus,
      statusDate: string,
      success: boolean,
      statusMessage: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateStatementFileProcessSubscription = {
  onUpdateStatementFileProcess:  {
    __typename: "StatementFileProcess",
    accountId: string,
    id: string,
    fileName: string,
    currentStatus: FileStatus,
    history:  Array< {
      __typename: "StatementFileProcessHistory",
      status: FileStatus,
      statusDate: string,
      success: boolean,
      statusMessage: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteStatementFileProcessSubscription = {
  onDeleteStatementFileProcess:  {
    __typename: "StatementFileProcess",
    accountId: string,
    id: string,
    fileName: string,
    currentStatus: FileStatus,
    history:  Array< {
      __typename: "StatementFileProcessHistory",
      status: FileStatus,
      statusDate: string,
      success: boolean,
      statusMessage: string | null,
    } | null > | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
