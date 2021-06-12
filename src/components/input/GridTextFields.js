import React from "react";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

export function GridTextField({
  size = 12,
  id,
  label,
  value = "",
  readOnly,
  disabled,
  onChange
}) {
  return (
    <Grid item xs={size}>
      <TextField
        id={id}
        label={label}
        value={value || ""}
        InputProps={{
          readOnly,
        }}
        onChange={onChange}
        fullWidth
        disabled={disabled}
      />
    </Grid>
  );
};

export function GridNumberField({
  size = 12,
  id,
  label,
  value = 0,
  readOnly,
  disabled,
  onChange
}) {
    
  if(value === null) {
    console.log("Field", id, "is null");
  }

  return (
    <Grid item xs={size}>
      <TextField
        id={id}
        label={label}
        value={value || 0}
        InputProps={{
          readOnly,
        }}
        onChange={onChange}
        fullWidth
        type="number"
        disabled={disabled}
      />
    </Grid>
  );
};

export function GridMoneyField({
  size = 4,
  id,
  label,
  value = 0,
  readOnly,
  disabled,
  onChange
}){

  return (
    <Grid item xs={size}>
      <TextField
        id={id}
        label={label}
        value={value || 0}
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          readOnly,
          startAdornment: (
            <InputAdornment position="start">€</InputAdornment>
          )
        }}
        onChange={onChange}
        fullWidth
        disabled={disabled}
      />
    </Grid>
  )
}