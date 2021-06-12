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
import { getCurrentRefMonth, RefMonth } from "util/dateUtils";


function sumMetricsByCategoryType(metrics = []) {
  return metrics.reduce(
    (acc, currentValue) => {
      if (
        !currentValue.category.type ||
        currentValue.category.type === "EXPENDITURE"
      ) {
        acc.spent += currentValue.sum;
      } else {
        acc.earned += currentValue.sum;
      }

      return acc;
    },
    {
      earned: 0,
      spent: 0,
    }
  );
}

const WalletBalanceDashboard = ({ accountId, walletId }) => {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const [data, setData] = useState();
  const [referenceMonth, setReferenceMonth] = useState();

  const loadData = async () => {
    if (!data) {
      console.log("Data is not set, loading it");
      try {
        if (!referenceMonth) {
          const account = await retrieve(accountId);
          const currentRefMonth = getCurrentRefMonth(
            account.monthStartDateRule
          );
          setReferenceMonth(currentRefMonth);
        } else {
          const metrics = await listMetricsByDateAndCategory({
            accountId,
            walletId,
            from: referenceMonth.format(),
            to: referenceMonth.next().format(),
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

  const groupedData = data
    ? sumMetricsByCategoryType(data)
    : { earned: 0, spent: 0 };

  function handleDateChange(date) {
    setReferenceMonth(new RefMonth(date));
    setData();
  }

  const rows = [
    [intl.formatMessage({ id: "earned" }), groupedData.earned],
    [intl.formatMessage({ id: "spent" }), groupedData.spent],
    [intl.formatMessage({ id: "total" }), groupedData.earned - groupedData.spent]
  ]

  return (
    <Container maxWidth="sm">
      <Grid container spacing={2}>
        <GridMonthPicker
          size={12}
          label={intl.formatMessage({ id: "month" })}
          onChange={handleDateChange}
          value={referenceMonth ? referenceMonth.value : new RefMonth().value}
        />
        <Grid item xs={12}>
          <BasicDataTable
            headers={["", intl.formatMessage({ id: "value" })]}
            rows={rows}
            name="wallet balance table"
            size="small"
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default WalletBalanceDashboard;
