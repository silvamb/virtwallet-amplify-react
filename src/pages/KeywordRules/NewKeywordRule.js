import CreatePage from "../../components/pages/CreatePage";
import KeywordRuleDetails from "./KeywordRuleDetails";
import { create } from "../../model/CategoryRules";

const DetailsComponent = ({ item: keywordRule, readOnly, setValue }) => {
  return (
    <KeywordRuleDetails
      keywordRule={keywordRule}
      readOnly={readOnly}
      setValue={setValue}
      creating={true}
    />
  );
};

const NewKeywordRule = ({ match, history }) => {
  const accountId = match ? match.params.accountId : undefined;

  const newKeywordRule = {
    accountId,
    categoryId: "",
    keyword: "",
    priority: 100,
    ruleType: "KEYWORD"
  };

  return (
    <CreatePage
      titleKey="new_keyword_rule"
      initialItem={newKeywordRule}
      history={history}
      detailsComponent={DetailsComponent}
      create={create}
    />
  );
};

export default NewKeywordRule;
