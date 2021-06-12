import React, { forwardRef, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";


const SimpleListItem = ({ primary, secondary, extra, to }) => {
  const renderLink = useMemo(
    () =>
      forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem button component={renderLink}>
      <ListItemText primary={primary} secondary={secondary} />
      {extra && 
        <Typography variant="body1">
          {extra}
        </Typography>
      }
    </ListItem>
  );
};

export default SimpleListItem;
