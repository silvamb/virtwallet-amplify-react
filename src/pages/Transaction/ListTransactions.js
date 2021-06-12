import moment from "moment";
import React from "react";
import SimpleListItem from "components/list/SimpleListItem";
import ListPage from "components/pages/AdvancedListPage";
import { list } from "model/Transaction";
import TransactionFilter from "./TransactionFilter";

const defaultFilters = {
  type: "15",
  from: moment().subtract(15, "days").format("yyyy-MM-DD"),
  to: moment().format("yyyy-MM-DD"),
  groupBy: "date",
};

function sortByDate(transaction1, transaction2) {
  return transaction1.date.localeCompare(transaction2.date);
}

function sortById(transaction1, transaction2) {
  return transaction1.id.localeCompare(transaction2.id);
}

function groupByDate(transactions = []) {
  const transactionsByDateMap = transactions.reduce(
    (transactionMap, transaction) => {
      if (!transactionMap.has(transaction.date)) {
        transactionMap.set(transaction.date, {
          group: transaction.date,
          data: [],
        });
      }

      transactionMap.get(transaction.date).data.push(transaction);

      return transactionMap;
    },
    new Map()
  );

  const groupedData = [...transactionsByDateMap.values()];
  groupedData.sort();
  groupedData.forEach(({data}) => data.sort(sortById));

  return groupedData;
}

function groupByCategory(transactions = []) {
  const transactionsByDateMap = transactions.reduce(
    (transactionMap, transaction) => {
      if (!transactionMap.has(transaction.categoryId)) {
        transactionMap.set(transaction.categoryId, {
          group: transaction.category.name,
          data: [],
        });
      }

      transactionMap.get(transaction.categoryId).data.push(transaction);

      return transactionMap;
    },
    new Map()
  );

  const groupedData = [...transactionsByDateMap.values()];
  groupedData.sort();
  groupedData.forEach(({data}) => data.sort(sortByDate));

  return groupedData;
}

function TransactionListItem({
  accountId,
  walletId,
  date,
  id,
  description,
  value
}) {
  const to = `/account/${accountId}/wallet/${walletId}/transaction/${date}/${id}`;

  return (
    <SimpleListItem
      key={id}
      primary={description}
      secondary={date}
      extra={`€${value}`}
      to={to}
    />
  );
}

const ListTransactions = ({ history, match }) => {
  const accountId = match ? match.params.accountId : undefined;
  const walletId = match ? match.params.walletId : undefined;

  function listTransactions({ from, to }) {
    return list({
      accountId,
      walletId,
      from,
      to,
    });
  }

  function filterTransactions({ data = [], searchTerm = "", filters }) {
    console.log("Filtering data", searchTerm, filters)

    const filtered = data.filter((transaction) => {
      return !searchTerm || transaction.description.indexOf(searchTerm) >= 0;
    });

    return filters.groupBy === "category" ? groupByCategory(filtered) : groupByDate(filtered);
  }

  return (
    <ListPage
      titleKey="list_transactions"
      listItems={listTransactions}
      filter={filterTransactions}
      defaultFilters={defaultFilters}
      listItemComponent={TransactionListItem}
      filterComponent={TransactionFilter}
    />
  );
};
export default ListTransactions;
