import React from "react";
import { useIntl } from "react-intl";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ViewPage from "../../components/pages/ViewPage";
import EditPage from "../../components/pages/EditPage";
import ListItemLink from "../../components/list/ListItemLink";
import { remove, retrieve, update } from "../../model/Wallet";
import WalletDetails from "./WalletDetails";

const WalletDetailsComponent = ({ item: wallet, readOnly, setValue }) => {
  return (
    <WalletDetails wallet={wallet} readOnly={readOnly} setValue={setValue} />
  );
};

const ViewWalletComponent = ({ item: wallet }) => {
  const intl = useIntl();

  return (
    <>
      <WalletDetails wallet={wallet} readOnly={true} />
      <Divider />
      <List component="nav" aria-label="secondary wallet details">
        <ListItemLink
          to={`/account/${wallet.accountId}/wallet/${wallet.id}/dashboard`}
          primary={intl.formatMessage({ id: "dashboard" })}
        />
        <ListItemLink
          to={`/account/${wallet.accountId}/wallet/${wallet.id}/transactions`}
          primary={intl.formatMessage({ id: "transactions" })}
        />
        <ListItemLink
          to={`/account/${wallet.accountId}/wallet/${wallet.id}/upload-statement`}
          primary={intl.formatMessage({ id: "upload_statement" })}
        />
        <ListItemLink
          to={`/account/${wallet.accountId}/wallet/${wallet.id}/reclassify`}
          primary={intl.formatMessage({ id: "reclassify" })}
        />
      </List>
    </>
  );
};

const EditComponent = ({ item, open, onSave, onCancel }) => {
  return (
    <EditPage
      item={item}
      open={open}
      titleKey="edit_wallet"
      onSave={onSave}
      onCancel={onCancel}
      detailComponent={WalletDetailsComponent}
    />
  );
};

const ViewWallet = ({ match, history }) => {
  const walletId = match.params.walletId;

  const dummyWallet = {
    walletId,
    name: "",
    description: "",
    ownerId: "Wallet Owner",
    balance: 0,
    type: "CHECKING_ACCOUNT",
    dummy: true,
  };

  function getWallet() {
    return retrieve(walletId);
  }

  function deleteWallet() {
    return remove(walletId);
  }

  function updateWallet(item, details) {
    return update(item.id, details);
  }

  return (
    <ViewPage
      titleKey="view_wallet"
      initialItem={dummyWallet}
      retrieve={getWallet}
      remove={deleteWallet}
      update={updateWallet}
      history={history}
      editComponent={EditComponent}
      viewItemComponent={ViewWalletComponent}
    />
  );
};
export default ViewWallet;
