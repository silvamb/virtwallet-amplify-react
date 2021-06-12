import React from "react";
import EditPage from "../../components/pages/EditPage";
import ViewPage from "../../components/pages/ViewPage";
import ExpressionRuleDetails from "./ExpressionRuleDetails";
import { remove, retrieve, update } from "../../model/CategoryRules";

const DetailsComponent = ({ item: expressionRule, readOnly = true, setValue }) => {
  return (
    <ExpressionRuleDetails
      expressionRule={expressionRule}
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
      titleKey="edit_expression_rule"
      onSave={onSave}
      onCancel={onCancel}
      detailComponent={DetailsComponent}
    />
  );
};

const ViewExpressionRule = ({ history, match }) => {
  const expressionRuleId = match.params.expressionRuleId;
  const dummyExpressionRule = {
    id: expressionRuleId,
    name: "",
    type: "CONTAINS",
    parameter: "",
    priority: 100,
    ruleType: "EXPRESSION",
    categoryId: "",
    dummy: true,
  };

  function getExpressionRule() {
    return retrieve(expressionRuleId, "EXPRESSION");
  }

  function deleteExpressionRule() {
    return remove(expressionRuleId);
  }

  function updateExpressionRule(item, details) {
    return update(item.id, details);
  }

  return (
    <ViewPage
      titleKey="view_expression_rule"
      initialItem={dummyExpressionRule}
      retrieve={getExpressionRule}
      remove={deleteExpressionRule}
      update={updateExpressionRule}
      history={history}
      editComponent={EditComponent}
      viewItemComponent={DetailsComponent}
    />
  );
};
export default ViewExpressionRule;
