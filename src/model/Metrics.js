import { API } from "aws-amplify";

const listMetricsByDateAndCategoryQuery = /* GraphQL */ `
  query MetricsByDateAndCategory(
    $accountId: ID
    $sortKey: ModelMetricsPrimaryCompositeKeyConditionInput
  ) {
    listMetricss(dateWalletIdCategoryId: $sortKey, accountId: $accountId) {
      items {
        date
        count
        sum
        category {
          name
          type
        }
      }
    }
  }
`;

export const listMetricsByDateAndCategory = async ({ accountId, walletId, from, to }) => {
  console.log(
    "Retrieving metrics for [ account:",
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
      query: listMetricsByDateAndCategoryQuery,
      variables: { accountId, sortKey },
    });

    const metrics = data.listMetricss.items;

    console.log("Metrics", metrics);

    return metrics;
  } catch (err) {
    console.log("Error retrieving metrics", err);
    throw new Error("Error retrieving metrics");
  }
};