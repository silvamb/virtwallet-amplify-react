import React, { useState } from "react";
import { useIntl } from "react-intl";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
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
  dialogBody: {
    "overflow-x": "hidden",
    marginTop: theme.spacing(2),
  },
}));

const EditPage = ({
  item,
  open,
  titleKey,
  onSave,
  onCancel,
  detailComponent: Details
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [updatedFields, setUpdateFields] = useState({});
  const updatedItem = {...item, ...updatedFields};

  function setValue(name, value) {
    const updated = {...updatedFields};
    updated[name] = value;

    setUpdateFields(updated);
  }

  function update() {
    onSave(item, updatedFields);
  }

  return (
    <Dialog open={open} fullScreen={fullScreen}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onCancel}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {intl.formatMessage({ id: titleKey })}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.dialogBody}>
        <Details item={updatedItem} readOnly={false} setValue={setValue}/>
      </div>
      <DialogActions>
        <Button onClick={onCancel}>
          {intl.formatMessage({ id: "cancel" })}
        </Button>
        <Button color="primary" variant="contained" onClick={update}>
          {intl.formatMessage({ id: "save" })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPage;
