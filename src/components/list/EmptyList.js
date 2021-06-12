import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 192,
    height: 192,
    color: theme.palette.secondary.main,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: `100%`,
  },
  paper: {
    margin: 0,
    height: `calc(100vh - 64px)`,
  },
  button: {
    marginTop: 20,
  },
}));

const EmptyList = ({ title, message, onRefresh }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const intl = useIntl();

  return (
    <Paper className={classes.paper} elevation={3}>
      <div className={classes.container}>
        <Typography variant="h4">{intl.formatMessage({ id: "empty_list" })}</Typography>
        <Typography variant="subtitle1">{intl.formatMessage({ id: "empty_list_message" })}</Typography>
        {onRefresh && (
          <Button
            color="primary"
            aria-label="error"
            className={classes.button}
            onClick={onRefresh}
          >
            <RefreshIcon />
          </Button>
        )}
      </div>
    </Paper>
  );
};

export default EmptyList;
