import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import { showError } from "../../util/utils";
import ConfirmationDialog from "../dialogs/ConfirmationDialog";

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
  grow: {
    flex: "1 1 auto",
  },
  actions: {
    display: "flex",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const initialState = {
  editing: false,
  message: undefined,
  loading: true,
  confirmDelete: false,
};

const ViewPage = ({
  titleKey,
  initialItem,
  retrieve,
  remove,
  update,
  history,
  viewItemComponent: Item,
  editComponent: EditPage,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);
  const { enqueueSnackbar } = useSnackbar();

  const dummyItem = { ...initialItem, dummy: true };
  const [state, setState] = useState({ ...initialState, item: dummyItem });

  const { item, editing, loading, confirmDelete } = state;

  function updateState(attributes) {
    setState({ ...state, ...attributes });
  }

  useEffect(() => {
    async function loadItem() {
      if (loading && item.dummy) {
        try {
          const item = await retrieve();
          setState({ ...state, loading: false, item });
        } catch (err) {
          setState({ ...state, loading: false });
          showError(enqueueSnackbar, err.message);
        }
      }
    }
    loadItem();
  }, [loading, item, state, retrieve, enqueueSnackbar]);

  async function updateItem(item, details) {
    try {
      updateState({
        editing: false,
        loading: true,
      });

      const updatedItem = await update(item, details);
      updateState({
        loading: false,
        editing: false,
        item: updatedItem,
      });
    } catch (err) {
      updateState({
        editing: false,
        loading: false,
      });
      showError(enqueueSnackbar, err.message);
    }
  }

  async function handleDelete() {
    try {
      updateState({
        loading: true,
      });
      await remove();
      goBack();
    } catch (err) {
      updateState({
        loading: false,
      });
      showError(enqueueSnackbar, err.message);
    }
  }

  function goBack() {
    history.goBack();
  }

  function showDeleteConfirmation(confirmDelete) {
    updateState({
      confirmDelete,
    });
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={goBack}
            className={classes.backButton}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {intl.formatMessage({ id: titleKey })}
          </Typography>
          <div className={classes.grow} />
          <div className={classes.actions}>
            {remove && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => showDeleteConfirmation(true)}
              >
                <DeleteIcon />
              </IconButton>
            )}
            {update && (
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => updateState({ editing: true })}
              >
                <EditIcon />
              </IconButton>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        {editing && (
          <EditPage
            item={item}
            open={true}
            onSave={updateItem}
            onCancel={() => updateState({ editing: false })}
          />
        )}
        <Item item={item} />
      </main>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {remove && (
        <ConfirmationDialog
          open={confirmDelete}
          handleConfirm={handleDelete}
          handleCancel={() => showDeleteConfirmation(false)}
          titleKey="confirm_deletion_title"
          messageKey="confirm_deletion_message"
        />
      )}
    </div>
  );
};

export default ViewPage;
