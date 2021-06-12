import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useIntl } from "react-intl";

import { Container } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import BasicDataTable from "components/table/BasicDataTable";
import GridMonthPicker from "components/input/GridDatePicker";
import { retrieve } from "model/Account";
import { listMetricsByDateAndCategory } from "model/Metrics";
import { showError } from "util/utils";
import { getCurrentRefMonth, getMonths, RefMonth } from "util/dateUtils";


function groupMetricsByCategory(metrics = [], from, to) {
  if (!from || !to) {
    return {
      headers: [],
      rows: [],
    };
  }
  const months = getMonths(from, to);
  const monthHeaders = months.map((refMonth) => refMonth.format("long"));
  const monthsStr = months.map((refMonth) => refMonth.format());

  const categories = metrics.reduce((acc, value) => {
    if (
      acc.indexOf(value.category.name) === -1 &&
      value.category.type !== "INCOME"
    ) {
      acc.push(value.category.name);
    }

    return acc;
  }, []);

  const rows = categories.map((category) => {
    const columns = Array(months.length).fill(0);
    metrics
      .filter((value) => value.category.name === category)
      .forEach((value) => {
        columns[monthsStr.indexOf(value.date)] = value.sum;
      });

    return [category, ...columns];
  });

  return {
    headers: [""].concat(monthHeaders),
    rows,
  };
}

const MonthlySpentByCategoryDashboard = ({ accountId, walletId }) => {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const loadData = async () => {
    if (!data) {
      try {
        if (!to) {
          const account = await retrieve(accountId);
          const currentRefMonth = getCurrentRefMonth(
            account.monthStartDateRule
          );
          setTo(currentRefMonth);
        } else if (!from) {
          setFrom(new RefMonth(to.value).subtract(3));
        } else {
          const metrics = await listMetricsByDateAndCategory({
            accountId,
            walletId,
            from: from.format(),
            to: to.format(),
          });
          setData(metrics);
        }
      } catch (err) {
        setData([]);
        showError(enqueueSnackbar, err.message);
      }
    }
  };

  loadData();

  const groupedData = groupMetricsByCategory(data, from, to);

  function setStartDate(date) {
    setFrom(new RefMonth(date));
    setData();
  }

  function setEndDate(date) {
    setTo(new RefMonth(date));
    setData();
  }

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <GridMonthPicker
          size={6}
          label={intl.formatMessage({ id: "from" })}
          onChange={setStartDate}
          value={from ? from.value : new RefMonth().value}
        />
        <GridMonthPicker
          size={6}
          label={intl.formatMessage({ id: "to" })}
          onChange={setEndDate}
          value={to ? to.value : new RefMonth().value}
        />
        <Grid item xs={12}>
          <BasicDataTable
            headers={groupedData.headers}
            rows={groupedData.rows}
            name="wallet expenses by category table"
            size="small"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default MonthlySpentByCategoryDashboard;
