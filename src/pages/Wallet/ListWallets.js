import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import NestedList from "../../components/list/NestedList";
import SimpleListItem from "../../components/list/SimpleListItem";
import ListPage from "../../components/pages/ListPage";
import { list as listWallets} from "../../model/Wallet";
import { showError } from "../../util/utils";

function WalletListItem(wallet) {
  const to = `/wallet/${wallet.id}`;

  return <SimpleListItem key={wallet.id} primary={wallet.name} secondary={wallet.description} to={to} />
}

async function loadWallets(accountId, setWallets, enqueueSnackbar) {
  try {
    console.log("Loading Wallets");
    const wallets = await listWallets(accountId);
    setWallets(wallets);
  } catch (err) {
    showError(enqueueSnackbar, err.message);
    setWallets([]);
  }
}

function groupWallets(wallets) {
  const walletsByAccountMap = wallets.reduce((walletMap, wallet) => {
    if(!walletMap.has(wallet.accountId)) {
      walletMap.set(wallet.accountId, {group: wallet.account.name, data: []});
    }

    walletMap.get(wallet.accountId).data.push(wallet);

    return walletMap;
  }, new Map());

  return [...walletsByAccountMap.values()];
}

const ListWallets = ({history, match}) => {
  const [wallets, setWallets] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const accountId = match ? match.params.accountId : undefined;
  const loading = wallets ? false : true;

  useEffect(() => {
    if (!wallets) {
      loadWallets(accountId, setWallets, enqueueSnackbar);
    }
  }, [accountId, wallets, enqueueSnackbar]);

  function handleClickOnAdd() {
    history.push(`/account/${accountId}/wallet/create`);
  }

  const groupedWallets = wallets ? groupWallets(wallets) : [];

  return (
    <ListPage
      titleKey="list_wallets"
      loading={loading}
      addEnabled={accountId !== undefined}
      onClickAdd={handleClickOnAdd}
    >
      <NestedList groupedData={groupedWallets} listItemComponent={WalletListItem} />
    </ListPage>
  );
};
export default ListWallets;
