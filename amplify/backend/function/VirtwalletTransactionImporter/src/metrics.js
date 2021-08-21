const { graphqlOperation } = require("virtwallet-graphql-client");
const numeral = require('numeral');

exports.incrementMetrics = /* GraphQL */ `
  mutation IncrementMetrics($input: IncrementMetricsInput!) {
    incrementMetrics(input: $input) {
      date
      categoryId
      granularity
      sum
      count
    }
  }
`;

exports.processRecord = async (record) => {
  const { accountId, walletId, transactions } = record;
  console.log("Processing", transactions.length, "transactions for", accountId, walletId);

  const metricsMap = transactions.reduce(reducer, new Map());

  const promises = [];
  metricsMap.forEach((value, key) => {
    promises.push(updateMetric(key, value, record));
  });

  const results = await Promise.allSettled(promises);

  results
    .filter((result) => result.status === "rejected")
    .forEach((result, index) =>
      console.error("Error updating metrics transaction", index, result.reason)
    );

  const updatedMetrics = results
    .filter((result) => result.status === "fulfilled" && result.value)
    .map((result) => result.value);

  console.log("Total of", transactions.length, "metrics processed for", accountId, walletId);
  return { accountId, walletId, updatedMetrics };
}

function reducer(metricsMap = new Map(), transaction) {
  const yearKey = transaction.referenceMonth.substring(0, 4);
  const monthKey = transaction.referenceMonth.substring(0, 7);

  increment(metricsMap, yearKey, transaction);
  increment(metricsMap, monthKey, transaction);

  return metricsMap;
}

function increment(metricsMap, datePart, { categoryId, value = "0" }) {
  const key = `${datePart}#${categoryId || ""}`;

  if (!metricsMap.has(key)) {
    metricsMap.set(key, new Metrics(value));
  } else {
    metricsMap.get(key).add(value);
  }
}

async function updateMetric(key, metric, { accountId, walletId }) {
  const [date, categoryId] = key.split("#");

  const input = {
    accountId,
    walletId,
    date,
    categoryId,
    granularity: date.length === 4 ? "YEARLY" : "MONTHLY",
    sum: metric.sum.value(),
    count: metric.count.value(),
  };

  const { data, errors } = await graphqlOperation({
    query: exports.incrementMetrics,
    variables: { input },
  });

  if (errors) {
    console.log("Error updating metrics in GraphQL API", errors);
    throw new Error("Error updating metrics: " + JSON.stringify(input));
  }

  return data.incrementMetrics;
}

class Metrics {
  constructor(value) {
    if (value && !isNaN(value)) {
      this.sum = numeral(value);
      this.count = numeral(1);
    } else {
      this.sum = numeral(0);
      this.count = numeral(0);
    }
  }

  add(value) {
    this.sum.add(value);
    this.count.add(1);
  }
}
