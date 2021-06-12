import React from "react";
import { useIntl } from "react-intl";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ViewPage from "../../components/pages/ViewPage";
import EditPage from "../../components/pages/EditPage";
import ListItemLink from "../../components/list/ListItemLink";

import AccountDetails from "./AccountDetails";
import { remove, retrieve, save } from "../../model/Account";

const DetailsComponent = ({ item: account, readOnly, setValue }) => {
  return (
    <AccountDetails account={account} readOnly={readOnly} setValue={setValue} />
  );
};

const EditComponent = ({ item, open, onSave, onCancel }) => {
  return (
    <EditPage
      item={item}
      open={open}
      titleKey="edit_account"
      onSave={onSave}
      onCancel={onCancel}
      detailComponent={DetailsComponent}
    />
  );
};

const ViewAccountComponent = ({ item: account }) => {
  const intl = useIntl();

  return (
    <>
      <AccountDetails account={account} readOnly={true} />
      <List component="nav" aria-label="manually set periods">
        <ListItemLink
          to={`/account/${account.id}/manuallySetPeriods`}
          primary={intl.formatMessage({ id: "manually_set_periods" })}
        />
      </List>
      <Divider />
      <List component="nav" aria-label="secondary account details">
        <ListItemLink
          to={`/account/${account.id}/members`}
          primary={intl.formatMessage({ id: "members" })}
        />
        <ListItemLink
          to={`/account/${account.id}/wallets`}
          primary={intl.formatMessage({ id: "wallets" })}
        />
        <ListItemLink
          to={`/account/${account.id}/categories`}
          primary={intl.formatMessage({ id: "categories" })}
        />
        <ListItemLink
          to={`/account/${account.id}/keywordrules`}
          primary={intl.formatMessage({ id: "keyword_rules" })}
        />
        <ListItemLink
          to={`/account/${account.id}/expressionrules`}
          primary={intl.formatMessage({ id: "expression_rules" })}
        />
      </List>
    </>
  );
};

const ViewAccount = ({ match, history }) => {
  const accountId = match.params.accountId;

  const dummyAccount = {
    accountId,
    name: "",
    description: "",
    ownerId: "Account Owner",
    monthStartDateRule: {
      currentMonth: true,
      dayOfMonth: 25,
    },
    dummy: true,
  };

  function getAccount() {
    return retrieve(accountId);
  }

  function deleteAccount() {
    return remove(accountId);
  }

  function updateAccount(item, details) {
    return save(item.id, details);
  }


  return (
    <ViewPage
      titleKey="view_account"
      initialItem={dummyAccount}
      retrieve={getAccount}
      remove={deleteAccount}
      update={updateAccount}
      history={history}
      editComponent={EditComponent}
      viewItemComponent={ViewAccountComponent}
    />
  );
};
export default ViewAccount;
