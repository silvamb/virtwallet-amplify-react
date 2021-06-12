import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import NestedList from "../../components/list/NestedList";
import SimpleListItem from "../../components/list/SimpleListItem";
import ListPage from "../../components/pages/ListPage";
import { listExpressionRules } from "../../model/CategoryRules";
import { showError } from "../../util/utils";

function ExpressionRuleListItem(expressionRule) {
  const intl = useIntl();

  const to = `/expressionrule/${expressionRule.id}`;

  const ruleDescription = `${intl.formatMessage({id: expressionRule.type})}: ${expressionRule.parameter}`;

  return <SimpleListItem key={expressionRule.id} primary={expressionRule.name} secondary={ruleDescription} to={to} />
}

async function loadExpressionRules(accountId, setExpressionRules, enqueueSnackbar) {
  try {
    console.log("Loading ExpressionRules");
    const expressionRules = await listExpressionRules(accountId);
    setExpressionRules(expressionRules);
  } catch (err) {
    showError(enqueueSnackbar, err.message);
    setExpressionRules([]);
  }
}

function groupExpressionRulesByCategory(expressionRules) {
  const expressionRulesByAccountMap = expressionRules.reduce((expressionRuleMap, expressionRule) => {
    if(!expressionRuleMap.has(expressionRule.categoryId)) {
      expressionRuleMap.set(expressionRule.categoryId, {group: expressionRule.category.name, data: []});
    }

    expressionRuleMap.get(expressionRule.categoryId).data.push(expressionRule);

    return expressionRuleMap;
  }, new Map());

  return [...expressionRulesByAccountMap.values()];
}

const ListExpressionRules = ({history, match}) => {
  const [expressionRules, setExpressionRules] = useState();
  const { enqueueSnackbar } = useSnackbar();

  const accountId = match ? match.params.accountId : undefined;
  const loading = expressionRules ? false : true;

  useEffect(() => {
    if (!expressionRules) {
      loadExpressionRules(accountId, setExpressionRules, enqueueSnackbar);
    }
  }, [accountId, expressionRules, enqueueSnackbar]);

  function handleClickOnAdd() {
    history.push(`/account/${accountId}/expressionrule/create`);
  }

  const groupedExpressionRules = expressionRules ? groupExpressionRulesByCategory(expressionRules) : [];

  return (
    <ListPage
      titleKey="list_expression_rules"
      loading={loading}
      addEnabled={true}
      onClickAdd={handleClickOnAdd}
      onBack={() => history.goBack()}
    >
      <NestedList groupedData={groupedExpressionRules} listItemComponent={ExpressionRuleListItem} />
    </ListPage>
  );
};
export default ListExpressionRules;
