import React from "react";
import EditPage from "../../components/pages/EditPage";
import ViewPage from "../../components/pages/ViewPage";
import KeywordRuleDetails from "./KeywordRuleDetails";
import { remove, retrieve, update } from "../../model/CategoryRules";

const DetailsComponent = ({ item: keywordRule, readOnly = true, setValue }) => {
  return (
    <KeywordRuleDetails
      keywordRule={keywordRule}
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
      titleKey="edit_keyword_rule"
      onSave={onSave}
      onCancel={onCancel}
      detailComponent={DetailsComponent}
    />
  );
};

const ViewKeywordRule = ({ history, match }) => {
  const keywordRuleId = match.params.keywordRuleId;
  const dummyKeywordRule = {
    id: keywordRuleId,
    keyword: "",
    categoryId: "",
    priority: 100,
    ruleType: "KEYWORD",
    dummy: true,
  };

  function getKeywordRule() {
    return retrieve(keywordRuleId, "KEYWORD");
  }

  function deleteKeywordRule() {
    return remove(keywordRuleId);
  }

  function updateKeywordRule(item, details) {
    return update(item.id, details);
  }

  return (
    <ViewPage
      titleKey="view_keyword_rule"
      initialItem={dummyKeywordRule}
      retrieve={getKeywordRule}
      remove={deleteKeywordRule}
      update={updateKeywordRule}
      history={history}
      editComponent={EditComponent}
      viewItemComponent={DetailsComponent}
    />
  );
};
export default ViewKeywordRule;
