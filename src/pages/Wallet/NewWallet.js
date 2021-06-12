import React from "react";
import CreatePage from "../../components/pages/CreatePage";
import WalletDetails from "./WalletDetails";
import { create } from "../../model/Wallet";

const DetailsComponent = ({ item: wallet, setValue }) => {
  return (
    <WalletDetails
      wallet={wallet}
      readOnly={false}
      setValue={setValue}
      creating={true}
    />
  );
};

const NewWallet = ({ match, history }) => {
  const accountId = match ? match.params.accountId : undefined;
  const newWallet = {
    accountId,
    name: "",
    description: "",
    ownerId: "Wallet Owner",
    balance: 0,
    type: "CHECKING_ACCOUNT",
  };

  return (
    <CreatePage
      titleKey="new_wallet"
      initialItem={newWallet}
      history={history}
      detailsComponent={DetailsComponent}
      create={create}
    />
  );
};

export default NewWallet;
