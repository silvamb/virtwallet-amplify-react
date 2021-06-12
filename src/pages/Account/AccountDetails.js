import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import SectionTitle from "../../components/typography/SectionTitle";
import {
  GridTextField,
  GridNumberField,
} from "../../components/input/GridTextFields";

import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  accountInfo: {
    marginTop: theme.spacing(1),
  },
  section: {
    margin: theme.spacing(2),
  },
  sectionBody: {
    margin: theme.spacing(2),
  },
}));

const AccountDetails = ({ account, setValue, readOnly }) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);

  function setAttribute(name) {
    return (event) => setValue(name, event.target.value);
  }

  function setMonthStartDateRuleDayOfMonth(event) {
    const monthStartDateRule = { ...account.monthStartDateRule };
    const strValue = event.target.value;
    if (strValue) {
      monthStartDateRule.dayOfMonth = Number(event.target.value);
      setValue("monthStartDateRule", monthStartDateRule);
    }
  }

  function setMonthStartDateRuleCurrentMonth(event) {
    const monthStartDateRule = { ...account.monthStartDateRule };
    monthStartDateRule.currentMonth = event.target.checked;
    setValue("monthStartDateRule", monthStartDateRule);
  }

  return (
    <div className={classes.accountInfo}>
      <div className={classes.section}>
        <SectionTitle titleKey="account_details" />
        <div className={classes.sectionBody}>
          <Grid container spacing={2}>
            <GridTextField
              size={12}
              id="account-name"
              label={intl.formatMessage({ id: "name" })}
              value={account.name}
              readOnly={readOnly}
              onChange={setAttribute("name")}
            />
            <GridTextField
              size={12}
              id="account-description"
              label={intl.formatMessage({ id: "description" })}
              value={account.description}
              readOnly={readOnly}
              onChange={setAttribute("description")}
            />
            <GridTextField
              size={12}
              id="account-owner"
              label={intl.formatMessage({ id: "owner" })}
              value={account.ownerId}
              readOnly={readOnly}
              disabled={!readOnly}
            />
          </Grid>
        </div>
      </div>
      <Divider />
      <div className={classes.section}>
        <SectionTitle titleKey="month_start_date_rule" />
        <div className={classes.sectionBody}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Switch
                    edge="end"
                    checked={account.monthStartDateRule.currentMonth}
                    onChange={setMonthStartDateRuleCurrentMonth}
                    inputProps={{ "aria-labelledby": "current-month-switch" }}
                    color="primary"
                    disabled={readOnly}
                  />
                }
                label={
                  <Typography variant="caption" color="textSecondary">
                    {intl.formatMessage({ id: "current_month" })}
                  </Typography>
                }
                labelPlacement="top"
              />
            </Grid>
            <GridNumberField
              size={6}
              id="month-start-date"
              label={intl.formatMessage({ id: "day_of_the_month" })}
              value={account.monthStartDateRule.dayOfMonth}
              readOnly={readOnly}
              onChange={setMonthStartDateRuleDayOfMonth}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default AccountDetails;
