import React, { forwardRef, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const ListItemLink = ({ primary, to }) => {
  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        <ListItemText primary={primary} />
        <NavigateNextIcon />
      </ListItem>
    </li>
  );
};

export default ListItemLink;
