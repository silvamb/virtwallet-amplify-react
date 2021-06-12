import { API } from "aws-amplify";
import { deleteTransaction, updateTransaction } from "../graphql/mutations";

export const listTransactionsByAccount = /* GraphQL */ `
  query ListTransactionsByAccount(
    $accountId: ID
    $sortKey: ModelTransactionPrimaryCompositeKeyConditionInput
  ) {
    listTransactions(dateWalletIdId: $sortKey, accountId: $accountId) {
      items {
        accountId
        date
        walletId
        id
        referenceMonth
        dt
        description
        keyword
        value
        type
        balance
        balanceType
        categoryId
        source
        sourceType
        category {
          name
        }
      }
    }
  }
`;

export const list = async ({ accountId, from, to, walletId }) => {
  console.log(
    "Retrieving transactions for [ account:",
    accountId,
    "],[ from:",
    from,
    "],[ to:",
    to,
    "],[ walletId:",
    walletId,
    "]"
  );

  const sortKey = {
    between: [
      {
        date: from,
        walletId,
      },
      { date: to, walletId },
    ],
  };

  try {
    const { data } = await API.graphql({
      query: listTransactionsByAccount,
      variables: { accountId, sortKey },
    });

    const transactions = data.listTransactions.items;
    console.log("Transaction Data", transactions);
    return transactions;
  } catch (err) {
    console.log("Error retrieving transactions", err);
    throw new Error("Error retrieving transactions");
  }
};

const getTransactionDetails = /* GraphQL */ `
  query GetTransaction(
    $accountId: ID!
    $date: AWSDate!
    $walletId: ID!
    $transactionId: ID!
  ) {
    getTransaction(
      accountId: $accountId
      date: $date
      walletId: $walletId
      id: $transactionId
    ) {
      accountId
      date
      walletId
      id
      referenceMonth
      dt
      description
      keyword
      value
      type
      balance
      balanceType
      categoryId
      source
      sourceType
    }
  }
`;

export const retrieve = async (accountId, date, walletId, transactionId) => {
  console.log(
    "Retrieving transaction details",
    accountId,
    date,
    walletId,
    transactionId
  );

  try {
    const { data } = await API.graphql({
      query: getTransactionDetails,
      variables: { accountId, date, walletId, transactionId },
    });
    console.log("Transaction Data", data);
    return data.getTransaction;
  } catch (err) {
    console.log("Error retrieving Transaction details", err);
    throw new Error("Error retrieving Transaction details");
  }
};

export const remove = async (accountId, date, walletId, id) => {
  console.log("Deleting Transaction", accountId, date, walletId, id);

  const deleteTransactionInput = { accountId, date, walletId, id };

  try {
    const { data } = await API.graphql({
      query: deleteTransaction,
      variables: { input: deleteTransactionInput },
    });
    console.log("Delete Transaction Result", data);
    return data.deleteTransaction;
  } catch (err) {
    console.log("Error deleting Transaction", err);
    throw new Error("Error deleting Transaction");
  }
};

export const update = async (
  accountId,
  date,
  walletId,
  transactionId,
  details
) => {
  console.log("Updating transaction", transactionId, "details", details);

  const transactionDetails = {
    accountId,
    date,
    walletId,
    id: transactionId,
    ...details,
  };

  try {
    const { data } = await API.graphql({
      query: updateTransaction,
      variables: { input: transactionDetails },
    });
    console.log("Updated Data", data);
    return data.updateTransaction;
  } catch (err) {
    console.log("Error updating Transaction", err);
    throw new Error("Error updating Transaction");
  }
};
