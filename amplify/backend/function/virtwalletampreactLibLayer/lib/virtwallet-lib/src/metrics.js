const numeral = require("numeral");
const { graphqlOperation, GraphQLError } = require("./virtwallet-graphql-client");

exports.incrementMetricsQuery = /* GraphQL */ `
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

exports.incrementMetrics = async ({ accountId, walletId, transactions }) => {
  console.log(
    "Calculating metrics for",
    transactions.length,
    accountId,
    walletId
  );

  const metricsMap = transactions.reduce(reducer, new Map());

  const promises = [];
  metricsMap.forEach((value, key) => {
    promises.push(updateMetric({ key, metric: value, accountId, walletId }));
  });

  const results = await Promise.allSettled(promises);

  const errors = results
  .filter((result) => result.status === "rejected")
  .map((result) => result.reason);

  const data = results
  .filter((result) => result.status === "fulfilled")
  .map((result) => result.value); 

  return {
    data,
    errors
  }
};

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

async function updateMetric({ key, metric, accountId, walletId }) {
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
    query: exports.incrementMetricsQuery,
    variables: { input },
  });

  if (errors) {
    console.log("Error updating metrics in GraphQL API", errors);
    throw new GraphQLError("Error updating metrics", errors);
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
