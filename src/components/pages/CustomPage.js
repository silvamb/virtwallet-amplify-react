import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    overflow: "hidden",
  },
  backButton: {
    marginLeft: -12,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    maxHeight: 64,
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "flex-end",
    ...theme.mixins.toolbar,
  },
  content: {
    flex: 1,
    overflow: "auto",
  },
}));

const Page = ({
  titleKey,
  onBack,
  children,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="go back"
            onClick={onBack}
            className={classes.backButton}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {intl.formatMessage({ id: titleKey })}
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default Page;
