import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const GridSelect = ({
  size = 8,
  id,
  value = "",
  label,
  values=[],
  readOnly,
  disabled,
  onChange,
}) => {

  return (
    <Grid item xs={size}>
      <FormControl fullWidth>
        <InputLabel id={`${id}-label`}>
          {label}
        </InputLabel>
        <Select
          labelId={`${id}-label`}
          id={id}
          value={value || ""}
          label={label}
          inputProps={{
            readOnly,
          }}
          fullWidth
          disabled={disabled}
          onChange={onChange}
        >
          {values.map((value, index) => {
            return (
              <MenuItem key={`${id}-item-${index}`} value={value.id}>
                {value.text}
              </MenuItem>
            )
          })}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default GridSelect;