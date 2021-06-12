import moment from "moment";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import MomentUtils from "@date-io/moment";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import FilterDialog from "components/dialogs/FilterDialog";

function getRelativeDateFilter(days) {
  return {
    from: moment().subtract(days, "days").format("yyyy-MM-DD"),
    to: moment().format("yyyy-MM-DD"),
  };
}

function TransactionFilter({ open, filter, onApply, onClose }) {
  const intl = useIntl();

  const initialState = { ...filter };

  const [state, setState] = useState(initialState);
  const { type, to, from, groupBy } = state;

  function setDateFilter(event) {
    const type = event.target.value;
    const { from: updatedFrom, to: updatedTo } = isNaN(type)
      ? { from, to }
      : getRelativeDateFilter(type);
    setState({ ...state, type, from: updatedFrom, to: updatedTo });
  }

  function setGroupBy(event) {
    const type = event.target.value;
    setState({ ...state, groupBy: type });
  }

  function setFromDate(date) {
    setState({ ...state, from: moment(date).format("yyyy-MM-DD") });
  }

  function setToDate(date) {
    setState({ ...state, to: moment(date).format("yyyy-MM-DD") });
  }

  function doFilter() {
    onApply(state);
  }

  return (
    <FilterDialog
      open={open}
      titleKey="filter_transactions"
      onApply={doFilter}
      onClose={onClose}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              {intl.formatMessage({ id: "filter_by_date" })}
            </FormLabel>
            <RadioGroup
              aria-label="filter-by-date"
              name="filter-by-date"
              value={type}
              onChange={setDateFilter}
            >
              <FormControlLabel
                value="15"
                control={<Radio />}
                label={intl.formatMessage({ id: "last_15_days" })}
              />
              <FormControlLabel
                value="30"
                control={<Radio />}
                label={intl.formatMessage({ id: "last_30_days" })}
              />
              <FormControlLabel
                value="60"
                control={<Radio />}
                label={intl.formatMessage({ id: "last_60_days" })}
              />
              <FormControlLabel
                value="period"
                control={<Radio />}
                label={intl.formatMessage({ id: "period" })}
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Grid item xs={6}>
            <KeyboardDatePicker
              margin="normal"
              id="start-date-picker"
              label={intl.formatMessage({ id: "from" })}
              format="yyyy-MM-DD"
              value={moment(from, "yyyy-MM-DD")}
              onChange={setFromDate}
              KeyboardButtonProps={{
                "aria-label": "change start date",
              }}
              disabled={!isNaN(type)}
            />
          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker
              margin="normal"
              id="end-date-picker"
              label={intl.formatMessage({ id: "to" })}
              format="yyyy-MM-DD"
              value={moment(to, "yyyy-MM-DD")}
              onChange={setToDate}
              KeyboardButtonProps={{
                "aria-label": "change end date",
              }}
              disabled={!isNaN(type)}
            />
          </Grid>
        </MuiPickersUtilsProvider>

        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              {intl.formatMessage({ id: "group_by" })}
            </FormLabel>
            <RadioGroup
              aria-label="group-by-field"
              name="group-by-field"
              value={groupBy}
              onChange={setGroupBy}
            >
              <FormControlLabel
                value="date"
                control={<Radio />}
                label={intl.formatMessage({ id: "date" })}
              />
              <FormControlLabel
                value="category"
                control={<Radio />}
                label={intl.formatMessage({ id: "category" })}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    </FilterDialog>
  );
}

export default TransactionFilter;
