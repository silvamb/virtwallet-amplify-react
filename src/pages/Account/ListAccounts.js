import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import SimpleList from "../../components/list/SimpleList";
import SimpleListItem from "../../components/list/SimpleListItem";

import ListPage from "../../components/pages/ListPage";
import { list as listAccounts } from "../../model/Account";
import { showError } from "../../util/utils";

function AccountListItem(account) {
  const to = `/account/${account.id}`;

  return <SimpleListItem key={account.id} primary={account.name} secondary={account.description} to={to} />
}

async function loadAccounts(setAccounts, enqueueSnackbar) {
  try {
    console.log("Loading Accounts");
    const accounts = await listAccounts({
      userId: "MyUser",
      callback: setAccounts,
    });
    setAccounts(accounts);
  } catch (err) {
    showError(enqueueSnackbar, err.message);
    setAccounts([]);
  }
}

const ListAccounts = () => {
  const [accounts, setAccounts] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const loading = accounts ? false : true;

  console.log("ListAccounts state, accounts:", accounts, "loading:", loading);

  useEffect(() => {
    if (!accounts) {
      loadAccounts(setAccounts, enqueueSnackbar);
    }
  }, [accounts, enqueueSnackbar]);

  const history = useHistory();

  function handleClickOnAdd() {
    history.push("/account/create");
  }

  return (
    <ListPage
      titleKey="list_accounts"
      loading={loading}
      addEnabled={true}
      onClickAdd={handleClickOnAdd}
    >
      <SimpleList
        listItemComponent={AccountListItem}
        data={accounts}
        onRefresh={() => loadAccounts(setAccounts, enqueueSnackbar)}
      />
    </ListPage>
  );
};
export default ListAccounts;
