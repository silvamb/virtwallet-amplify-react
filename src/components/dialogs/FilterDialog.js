import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "static",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const FilterDialog = ({
  open = false,
  titleKey,
  onApply,
  onClose,
  children,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog open={open} fullScreen={fullScreen}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {intl.formatMessage({ id: titleKey })}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="contained"
          onClick={onApply}
          fullWidth={true}
        >
          {intl.formatMessage({ id: "apply" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterDialog;
