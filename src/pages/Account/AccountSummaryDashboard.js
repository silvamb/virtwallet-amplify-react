import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import BasicDataTable from "components/table/BasicDataTable";
import { retrieve } from "model/Account";
import { list as listCategories } from "model/Category";
import { listMetricsByDate } from "model/Metrics";
import { showError } from "util/utils";
import { getCurrentRefMonth } from "util/dateUtils";

const sum = (a, b) => a + b;

function sumIf(metricArray = [], filter) {
  return metricArray
    .filter(filter)
    .map((v) => v.sum)
    .reduce(sum, 0);
}

function calcRemainingExpenses(metrics = [], categories = []) {
  const predictedExpenses = categories
    .filter((category) => category.budget && category.budget.value > 0)
    .map((category) => {
      const spent = sumIf(metrics, (m) => m.categoryId === category.id);
      const diff = category.budget.value - spent;
      return diff > 0 ? diff : 0;
    });

  return predictedExpenses.reduce(sum, 0);
}

async function loadData(accountId) {
  const account = await retrieve(accountId);
  const currentRefMonth = getCurrentRefMonth(account.monthStartDateRule);
  const categories = await listCategories(accountId);

  const metrics = await listMetricsByDate({
    accountId,
    from: currentRefMonth.format(),
    to: currentRefMonth.add(1).format(),
  });

  return {
    metrics,
    categories,
  };
}

function generateSummary({ metrics = [], categories = [] }, intl) {
  const categoryMap = categories.reduce((acc, value) => {
    acc[value.id] = value;

    return acc;
  }, {});

  const metricsWithCategory = metrics.map((value) => {
    return {
      category: categoryMap[value.categoryId],
      ...value,
    };
  });

  const spent = sumIf(metricsWithCategory, (v) => v.category.type !== "INCOME");
  const earned = sumIf(
    metricsWithCategory,
    (v) => v.category.type === "INCOME"
  );
  const remaining = calcRemainingExpenses(metricsWithCategory, categories);

  const rows = [
    [intl.formatMessage({ id: "earned" }), earned],
    [intl.formatMessage({ id: "spent" }), spent],
    [intl.formatMessage({ id: "budgeted" }), remaining],
    [intl.formatMessage({ id: "total" }), earned - spent - remaining],
  ];

  return {
    headers: ["", intl.formatMessage({ id: "value" })],
    rows,
  };
}

const AccountSummaryDashboard = ({ accountId }) => {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState({});

  useEffect(() => {
    const load = async () => {
      try {
        const data = await loadData(accountId);

        setData(data);
      } catch (err) {
        setData([]);
        showError(enqueueSnackbar, err.message);
      }
    };
    load();
  }, [accountId, enqueueSnackbar]);

  const groupedData = generateSummary(data, intl);

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BasicDataTable
            headers={groupedData.headers}
            rows={groupedData.rows}
            name="account summary table"
            size="small"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountSummaryDashboard;
