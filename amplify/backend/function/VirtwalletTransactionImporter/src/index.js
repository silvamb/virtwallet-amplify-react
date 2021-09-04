/* Amplify Params - DO NOT EDIT
	API_VIRTWALLETBACKEND_GRAPHQLAPIENDPOINTOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIIDOUTPUT
	API_VIRTWALLETBACKEND_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const { logger } = require("virtwallet-lib/logger");
const { putTransactions } = require("virtwallet-lib/transaction-loader");
const { incrementMetrics } = require("virtwallet-lib/metrics");

exports.handler = async (event) => {
  const { transactions } = event.arguments.input;

  logger.info("Importing transactions", { total: transactions.length });
  const errors = [];

  const groupedTransactions = groupTransactions(transactions);

  for (let transactionGroup of groupedTransactions) {
    const { accountId, walletId } = transactionGroup;
    const { data: createdTransactions, errors: putTransactionsErrors } =
      await putTransactions(transactionGroup);

    logger.info("Transactions Imported", {
      imported: createdTransactions.length,
      errors: errors.length,
    });

    errors.push(...putTransactionsErrors);

    await incrementMetrics({
      accountId,
      walletId,
      transactions: createdTransactions,
    });
  }

  return {
    errors,
  };
};

function groupTransactions(transactions) {
  logger.info("Grouping Transactions");
  const groupedTransactions = transactions.reduce((map, transaction) => {
    const key = `${transaction.accountId}#${transaction.walletId}`;

    if (!map.has(key)) {
      map.set(key, {
        accountId: transaction.accountId,
        walletId: transaction.walletId,
        transactions: [],
      });
    }

    map.get(key).transactions.push(transaction);

    return map;
  }, new Map());

  logger.debug("Transactions grouped", {
    keys: [...groupedTransactions.keys()],
  });

  return groupedTransactions.values();
}
