import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import MaterialUiShellPage from "material-ui-shell/lib/containers/Page";
import CustomPage from "./CustomPage";
import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    "overflow-x": "hidden",
    padding: theme.spacing(1),
  },
  appBar: {
    position: "static",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const TopLevelPage = ({ titleKey, children }) => {
  const intl = useIntl();

  return (
    <MaterialUiShellPage pageTitle={intl.formatMessage({ id: titleKey })}>
      {children}
    </MaterialUiShellPage>
  );
};

const PageWithBackButton = ({ titleKey, onBack, children }) => {
  return (
    <CustomPage titleKey={titleKey} onBack={onBack}>
      {children}
    </CustomPage>
  );
};

const ListPage = ({
  titleKey,
  loading = false,
  addEnabled = false,
  onClickAdd,
  children,
  onBack,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const Page = onBack ? PageWithBackButton : TopLevelPage;

  return (
    <Page titleKey={titleKey} onBack={onBack}>
      <div className={classes.root}>
        {children}
        {addEnabled && (
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            onClick={onClickAdd}
          >
            <AddIcon />
          </Fab>
        )}
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Page>
  );
};

export default ListPage;
