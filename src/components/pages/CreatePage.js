import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"; 
import Page from './CustomPage';
import { showError } from "../../util/utils";

const useStyles = makeStyles((theme) => ({
  actionButtons: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  }
}));

const NewPage = ({
  titleKey,
  initialItem,
  history,
  detailsComponent: Details,
  create,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);

  const [item, setItem] = useState(initialItem);

  const { enqueueSnackbar } = useSnackbar();

  function setValue(name, value) {
    console.log("Setting item attribute: ", name, "with value: ", value);
    const updated = {...item};
    updated[name] = value;

    console.log("Updated fields", updated);
    setItem(updated);
  }

  function goBack() {
    history.goBack();
  }

  async function save() {
    try {
      await create(item);
      goBack();
    } catch(err) {
      showError(enqueueSnackbar, err.message);
    }
  }

  return (
    <Page titleKey={titleKey} onBack={goBack}>
      <Details item={item} readOnly={false} setValue={setValue}/>
      <div className={classes.actionButtons}>
        <Button onClick={goBack}>
          {intl.formatMessage({ id: "cancel" })}
        </Button>
        <Button color="primary" variant="contained" onClick={save}>
          {intl.formatMessage({ id: "save" })}
        </Button>
      </div>
    </Page>
  );
};

export default NewPage;
