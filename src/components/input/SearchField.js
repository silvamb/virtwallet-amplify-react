import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

const SearchField = ({ placeholder, onSearch }) => {
  let timerId;

  function debounce(func, delay) {
    // Cancels the setTimeout method execution
    clearTimeout(timerId);

    // Executes the func after delay time.
    timerId = setTimeout(func, delay);
  }

  function filter(event) {
    event.preventDefault();
    const text = event.target.value;

    debounce(() => {
      onSearch(text);
    }, 300);
  }

  return (
    <TextField
      id="search-field"
      type="search"
      variant="outlined"
      placeholder={placeholder}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      onChange={filter}
      fullWidth
    />
  );
};

export default SearchField;
