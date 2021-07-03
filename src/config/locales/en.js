import { defineMessages } from 'react-intl'

const accountMessages = {
  account_dashboard: 'Account Dashboard',
  accounts: 'Accounts',
  list_accounts: 'List Accounts',
  view_account: 'View Account',
  edit_account: 'Edit Account',
  new_account: 'New Account',
  account_details: 'Account Details',
  month_start_date_rule: 'Month Start Date Rule',
  current_month: 'Current Month?',
  day_of_the_month: 'Day of the Month:',
  manually_set_periods: 'Manually Set Periods',
  members: 'Members',
  wallets: 'Wallets',
  category_rules: 'Category Rules',
  earned: 'Earned',
  spent: 'Spent',
  budgeted: 'Budgeted',
};

const walletMessages = {
  wallets: 'Wallets',
  list_wallets: 'List Wallets',
  view_wallet: 'View Wallet',
  edit_wallet: 'Edit Wallet',
  new_wallet: 'New Wallet',
  wallet_details: 'Wallet Details',
  balance: 'Balance',
  CHECKING_ACCOUNT: 'Checking Account',
  SAVINGS_ACCOUNT: 'Savings Account',
  CREDIT_CARD: 'Credits Card',
  CASH: 'Cash',
  upload_statement: "Upload Statement",
  reclassify: "Reclassify",
  parser_type: 'Parser Type',
};

const requestFileUpload = {
  classifying_file: 'Classifying File',
  current_status: 'Current Status',
  filename: 'File name',
  file_details: 'File Details',
  file_uploaded: 'File Uploaded',
  list_processed_statement_files: 'List Processed Files',
  parsing_file: 'Parsing File',
  pick_file: 'Pick a file',
  requesting_file_upload: 'Requesting file upload',
  ulster_csv: 'Ulster Bank CSV File',
  upload_statement: 'Upload Statement',
  uploading_file: 'Uploading file',
  process: 'Process',
  processed_statement_files: 'Processed Statement Files',
  view_statement_file_process: 'File Process Status',
}

const categoryMessages = {
  BIMONTHLY: 'Bimonthly',
  EXPENDITURE: 'Expenditure',
  INCOME: 'Income',
  MONTHLY: 'Monthly',
  YEARLY: ' Yearly',
  category: 'Category',
  category_type: 'Category Type',
  categories: 'Categories',
  list_categories: 'List Categories',
  view_category: 'View Category',
  edit_category: 'Edit Category',
  new_category: 'New Category',
  category_details: 'Category Details',
  budget: 'Budget',
  budget_type: 'Budget Type',
}

const keywordRulesMessages = {
  keyword_rules: 'Keyword Rules',
  keyword_rule_details: 'Keyword Rule Details',
  list_keyword_rules: 'List Keyword Rules',
  view_keyword_rule: 'View Keyword Rule',
  edit_keyword_rule: 'Edit Keyword Rule',
  new_keyword_rule: 'New Keyword Rule',
};

const expressionRulesMessages = {
  expression_rules: 'Expression Rules',
  expression_rule_details: 'Expression Rule Details',
  list_expression_rules: 'List Expression Rules',
  view_expression_rule: 'View Expression Rule',
  edit_expression_rule: 'Edit Expression Rule',
  new_expression_rule: 'New Expression Rule',
  CONTAINS: "Contains",
  STARTSWITH: "Starts With",
  REGEX: "Regex",
  parameter: "Parameter"
};

const transactionsMessages = {
  CREDIT: 'Credit',
  DEBIT: 'Debit',
  balance_type: 'Balance Type',
  edit_transaction: 'Edit Transaction',
  filter_by_date: 'Filter By Date',
  filter_transactions: 'Filter Transactions',
  group_by: 'Group By',
  last_15_days: 'Last 15 days',
  last_30_days: 'Last 30 days',
  last_60_days: 'Last 60 days',
  list_transactions: 'List Transactions',
  month: 'Month',
  new_transaction: 'New Transaction',
  period: 'Period',
  transactions: 'Transactions',
  transaction_details: 'Transaction Details',
  view_transaction: 'View Transactions',
}

const commonMessages = {
  app_name: 'React Most Wanted',
  sign_in: 'Sign in',
  sign_out: 'Sign out',
  sign_up: 'Sign up',
  email: 'Email',
  username: 'Username',
  password: 'Password',
  about: 'About',
  home: 'Home',
  page_not_found: 'Page not found',
  settings: 'Settings',
  theme: 'Theme',
  default: 'Default',
  red: 'Red',
  green: 'Green',
  language: 'Language',
  en: 'English',
  de: 'German',
  ru: 'Russian',
  menu: 'Menu',
  menu_mini_mode: 'Mini menu',
  offline: 'Offline',
  demos:'Demos',
  dialog_demo:'Demo dialog',
  dialog_title:'Dialog title',
  dialog_action:'YES, Delete',
  dialog_message:`Dialog message. You can put as much text as you want here. 
  Ask a question or show a warning before deleting something. 
  You can also set the action text to something like "YES, Delete" and run that action by passing a "handleAction" prop. 
  This receives a "handleClose" callback with which you can close the dialog when your action is done.`,
  toast_demo:'Demo toast',
  filter_demo:'Demo filter',
  list_page_demo:'List Page demo with {count} rows',
  forgot_password:'Forgot password',
  password_reset:'Password reset',
  password_confirm:'Password confirm',
  registration:'Registration',
  my_account: 'My account',
  delete_account_dialog_title: 'Delete Account?',
  delete_account_dialog_message:
    'Your account will be deleted and you will lose all your data!',
  delete_account_dialog_action:'Delete account',
  name: 'Name',
  description: 'Description',
  owner: 'Owner',
  cancel: 'Cancel',
  save: 'Save',
  confirm: 'Confirm',
  confirm_deletion_title: 'Confirm Deletion',
  confirm_deletion_message: 'Are you sure you want to delete this item?',
  empty_list: 'Nothing to show',
  empty_list_message: 'There are no items.',
  type: 'Type',
  value: 'Value',
  to: 'To',
  from: 'From',
  search: 'Search',
  date: 'Date',
  dashboard: 'Dashboard',
  summary: 'Summary',
  total: 'Total',
  done: 'Done',
};

const messages = defineMessages({
  ...commonMessages,
  ...accountMessages,
  ...walletMessages,
  ...categoryMessages,
  ...keywordRulesMessages,
  ...expressionRulesMessages,
  ...transactionsMessages,
  ...requestFileUpload,
})

export default messages
