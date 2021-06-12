import React from "react";
import CreatePage from "../../components/pages/CreatePage";
import AccountDetails from "./AccountDetails";
import { create } from "../../model/Account";

const newAccount = {
  name: "",
  description: "",
  ownerId: "Account Owner",
  monthStartDateRule: {
    currentMonth: true,
    dayOfMonth: 20,
  },
};

const DetailsComponent = ({ item: account, setValue }) => {
  return (
    <AccountDetails account={account} readOnly={false} setValue={setValue} />
  );
};

const NewAccount = ({ history }) => {
  return (
    <CreatePage
      titleKey="new_account"
      initialItem={newAccount}
      history={history}
      detailsComponent={DetailsComponent}
      create={create}
    />
  );
};

export default NewAccount;
