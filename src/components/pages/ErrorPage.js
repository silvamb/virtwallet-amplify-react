import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ErrorIcon from "@material-ui/icons/Error";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Page from "./CustomPage";

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
    backgroundColor: theme.palette.background.default,
    margin: 0,
    height: `calc(100vh - 64px)`,
  },
  button: {
    marginTop: 20,
  },
}));

const ErrorPage = (props) => {
  console.log("Error page props", props);

  const theme = useTheme();
  const classes = useStyles(theme);

  const message = props.location.state.errorMessage || "An error has occurred";

  function goBack() {
    props.history.goBack();
  }

  return (
    <Page titleKey={"error"} onBack={goBack}>
      <Paper className={classes.paper}>
        <div className={classes.container}>
          <Typography variant="h4">Error</Typography>
          <Typography variant="subtitle1">{message}</Typography>
          <Button
            color="secondary"
            aria-label="error"
            className={classes.button}
          >
            <ErrorIcon />
          </Button>
        </div>
      </Paper>
    </Page>
  );
};

export default ErrorPage;
