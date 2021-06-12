import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import NestedList from "../../components/list/NestedList";
import SimpleListItem from "../../components/list/SimpleListItem";
import ListPage from "../../components/pages/ListPage";
import { listKeywords } from "../../model/CategoryRules";
import { showError } from "../../util/utils";

function KeywordListItem(keyword) {
  const to = `/keywordrule/${keyword.id}`;

  return <SimpleListItem key={keyword.id} primary={keyword.keyword} to={to} />
}

async function loadKeywords(accountId, setKeywords, enqueueSnackbar) {
  try {
    console.log("Loading Keywords");
    const keywords = await listKeywords(accountId);
    setKeywords(keywords);
  } catch (err) {
    showError(enqueueSnackbar, err.message);
    setKeywords([]);
  }
}

function groupKeywordsByCategory(keywords) {
  const keywordsByAccountMap = keywords.reduce((keywordMap, keyword) => {
    if(!keywordMap.has(keyword.categoryId)) {
      keywordMap.set(keyword.categoryId, {group: keyword.category.name, data: []});
    }

    keywordMap.get(keyword.categoryId).data.push(keyword);

    return keywordMap;
  }, new Map());

  return [...keywordsByAccountMap.values()];
}

const ListKeywords = ({history, match}) => {
  const [keywords, setKeywords] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const accountId = match ? match.params.accountId : undefined;
  const loading = keywords ? false : true;

  useEffect(() => {
    if (!keywords) {
      loadKeywords(accountId, setKeywords, enqueueSnackbar);
    }
  }, [accountId, keywords, enqueueSnackbar]);

  function handleClickOnAdd() {
    history.push(`/account/${accountId}/keywordrule/create`);
  }

  const groupedKeywords = keywords ? groupKeywordsByCategory(keywords) : [];

  return (
    <ListPage
      titleKey="list_keyword_rules"
      loading={loading}
      addEnabled={true}
      onClickAdd={handleClickOnAdd}
      onBack={() => history.goBack()}
    >
      <NestedList groupedData={groupedKeywords} listItemComponent={KeywordListItem} />
    </ListPage>
  );
};
export default ListKeywords;
