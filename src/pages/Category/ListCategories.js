import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import NestedList from "../../components/list/NestedList";
import SimpleListItem from "../../components/list/SimpleListItem";
import ListPage from "../../components/pages/ListPage";
import { list as listCategories } from "../../model/Category";
import { showError } from "../../util/utils";

function CategoryListItem(category) {
  const to = `/category/${category.id}`;

  return (
    <SimpleListItem
      key={category.id}
      primary={category.name}
      secondary={category.description}
      to={to}
    />
  );
}

async function loadCategories(accountId, setCategories, enqueueSnackbar) {
  try {
    console.log("Loading Categories");
    const categories = await listCategories(accountId);
    setCategories(categories);
  } catch (err) {
    showError(enqueueSnackbar, err.message);
    setCategories([]);
  }
}

function groupCategories(categories) {
  const categoriesByAccountMap = categories.reduce((categoryMap, category) => {
    if (!categoryMap.has(category.accountId)) {
      categoryMap.set(category.accountId, {
        group: category.account.name,
        data: [],
      });
    }

    categoryMap.get(category.accountId).data.push(category);

    return categoryMap;
  }, new Map());

  return [...categoriesByAccountMap.values()];
}

const ListCategories = ({ history, match }) => {
  const [categories, setCategories] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const accountId = match ? match.params.accountId : undefined;
  const loading = categories ? false : true;

  useEffect(() => {
    if (!categories) {
      loadCategories(accountId, setCategories, enqueueSnackbar);
    }
  }, [accountId, categories, enqueueSnackbar]);

  function handleClickOnAdd() {
    history.push(`/account/${accountId}/category/create`);
  }

  const groupedCategories = categories ? groupCategories(categories) : [];

  return (
    <ListPage
      titleKey="list_categories"
      loading={loading}
      addEnabled={accountId !== undefined}
      onClickAdd={handleClickOnAdd}
    >
      <NestedList
        groupedData={groupedCategories}
        listItemComponent={CategoryListItem}
      />
    </ListPage>
  );
};
export default ListCategories;
