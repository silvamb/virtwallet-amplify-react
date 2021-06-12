import React from "react";
import MomentUtils from "@date-io/moment";
import Grid from "@material-ui/core/Grid";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const GridMonthPicker = ({
  size = 12,
  label,
  onChange,
  value
}) => {

  return (
    <Grid item xs={size}>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          autoOk={true}
          disableFuture={true}
          format={"MMMM YYYY"}
          label={label}
          onChange={onChange}
          openTo="month"
          value={value}
          variant="inline"
          views={["month"]}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  )

}

export default GridMonthPicker;