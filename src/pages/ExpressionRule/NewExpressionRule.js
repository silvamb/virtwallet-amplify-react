import CreatePage from "../../components/pages/CreatePage";
import ExpressionRuleDetails from "./ExpressionRuleDetails";
import { create } from "../../model/CategoryRules";

const DetailsComponent = ({ item: expressionRule, readOnly, setValue }) => {
  return (
    <ExpressionRuleDetails
      expressionRule={expressionRule}
      readOnly={readOnly}
      setValue={setValue}
      creating={true}
    />
  );
};

const NewExpressionRule = ({ match, history }) => {
  const accountId = match ? match.params.accountId : undefined;

  const newExpressionRule = {
    accountId,
    name: "",
    type: "CONTAINS",
    parameter: "",
    categoryId: "",
    priority: 100,
    ruleType: "EXPRESSION",
  };

  return (
    <CreatePage
      titleKey="new_expression_rule"
      initialItem={newExpressionRule}
      history={history}
      detailsComponent={DetailsComponent}
      create={create}
    />
  );
};

export default NewExpressionRule;
