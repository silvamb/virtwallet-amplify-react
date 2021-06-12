import React from "react";
import EditPage from "components/pages/EditPage";
import ViewPage from "components/pages/ViewPage";
import TransactionDetails from "./TransactionDetails";
import { remove, retrieve, update } from "model/Transaction";

const DetailsComponent = ({ item: transaction, readOnly = true, setValue }) => {
  return (
    <TransactionDetails
      transaction={transaction}
      readOnly={readOnly}
      setValue={setValue}
    />
  );
};

const EditComponent = ({ item, open, onSave, onCancel }) => {
  return (
    <EditPage
      item={item}
      open={open}
      titleKey="edit_transaction"
      onSave={onSave}
      onCancel={onCancel}
      detailComponent={DetailsComponent}
    />
  );
};

const ViewTransaction = ({ history, match }) => {
  const accountId = match.params.accountId;
  const date = match.params.date;
  const walletId = match.params.walletId;
  const transactionId = match.params.transactionId;
  const dummyTransaction = {
    accountId,
    date,
    walletId,
    id: transactionId,
    referenceMonth: "",
    description: "",
    keyword: "",
    value: 0,
    type: "",
    balance: 0,
    balanceType: "",
    categoryId: "",
    source: "",
    sourceType: "",
  };

  function getTransaction() {
    return retrieve(accountId, date, walletId, transactionId);
  }

  function deleteTransaction() {
    return remove(accountId, date, walletId, transactionId);
  }

  function updateTransaction(item, details) {
    const { accountId, date, walletId, id } = item;
    return update(accountId, date, walletId, id, details);
  }
  return (
    <ViewPage
      titleKey="view_transaction"
      initialItem={dummyTransaction}
      retrieve={getTransaction}
      remove={deleteTransaction}
      update={updateTransaction}
      history={history}
      editComponent={EditComponent}
      viewItemComponent={DetailsComponent}
    />
  );
};
export default ViewTransaction;
