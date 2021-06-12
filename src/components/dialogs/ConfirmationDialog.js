import React from "react";
import { useIntl } from "react-intl";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function ConfirmationDialog({
  open = false,
  handleConfirm,
  handleCancel,
  titleKey,
  messageKey,
  confirmKey = "confirm",
  cancelKey = "cancel",
}) {
  const intl = useIntl();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">
          {intl.formatMessage({ id: titleKey })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            {intl.formatMessage({ id: messageKey })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            {intl.formatMessage({ id: cancelKey })}
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            {intl.formatMessage({ id: confirmKey })}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
