import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import CategorySelect from "components/input/CategorySelect";
import SectionTitle from "components/typography/SectionTitle";
import {
  GridTextField,
  GridMoneyField,
} from "components/input/GridTextFields";
import GridSelect from "components/input/GridSelect";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  transactionInfo: {
    marginTop: theme.spacing(1),
  },
  section: {
    margin: theme.spacing(2),
  },
  sectionBody: {
    margin: theme.spacing(2),
  },
}));

const BALANCE_TYPES = ["CREDIT", "DEBIT"];

const TransactionDetails = ({ transaction, setValue, readOnly, creating = false }) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);

  const balanceTypes = BALANCE_TYPES.map((type) => {
    return {
      id: type,
      text: intl.formatMessage({ id: type }),
    };
  });

  function setAttribute(name) {
    return (event) => setValue(name, event.target.value);
  }

  function setNumberValue(name) {
    return (event) => setValue(name, Number(event.target.value));
  }

  return (
    <div className={classes.transactionInfo}>
      <div className={classes.section}>
        <SectionTitle titleKey="transaction_details" />
        <div className={classes.sectionBody}>
          <Grid container spacing={2}>
            <GridTextField
              size={4}
              id="reference-month"
              label={intl.formatMessage({ id: "month" })}
              value={transaction.referenceMonth}
              readOnly={true}
              onChange={setAttribute("referenceMonth")}
              disabled={!readOnly}
            />
            <GridTextField
              size={4}
              id="date"
              label={intl.formatMessage({ id: "date" })}
              value={transaction.date}
              readOnly={true}
              onChange={setAttribute("date")}
              disabled={!readOnly}
            />
            <GridMoneyField
              size={4}
              id="value"
              label={intl.formatMessage({ id: "value" })}
              value={transaction.value}
              readOnly={readOnly}
              onChange={setNumberValue("value")}
            />
            <GridTextField
              size={12}
              id="description"
              label={intl.formatMessage({ id: "description" })}
              value={transaction.description}
              readOnly={readOnly}
              onChange={setAttribute("description")}
            />
            <GridTextField
              size={12}
              id="keyword"
              label={intl.formatMessage({ id: "keyword" })}
              value={transaction.keyword}
              readOnly={readOnly}
              onChange={setAttribute("keyword")}
            />
            <CategorySelect
              size={6}
              accountId={transaction.accountId}
              value={transaction.categoryId}
              readOnly={readOnly}
              onChange={setAttribute("categoryId")}
            />
            <GridTextField
              size={6}
              id="type"
              label={intl.formatMessage({ id: "type" })}
              value={transaction.type}
              readOnly={readOnly}
              onChange={setAttribute("type")}
            />
            <GridMoneyField
              size={4}
              id="balance"
              label={intl.formatMessage({ id: "balance" })}
              value={transaction.balance}
              readOnly={readOnly}
              onChange={setNumberValue("balance")}
            />
            <GridSelect
              size={8}
              id="balance-type"
              label={intl.formatMessage({ id: "balance_type" })}
              value={transaction.balanceType}
              values={balanceTypes}
              readOnly={readOnly}
              onChange={setAttribute("balanceType")}
            />
            <GridTextField
              size={12}
              id="transaction-id"
              label={intl.formatMessage({ id: "transaction_id" })}
              value={transaction.id}
              readOnly={readOnly}
              disabled={!readOnly}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default TransactionDetails;
