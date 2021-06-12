import React from "react";
import EditPage from "../../components/pages/EditPage";
import ViewPage from "../../components/pages/ViewPage";
import CategoryDetails from "./CategoryDetails";
import { remove, retrieve, update } from "../../model/Category";

const DetailsComponent = ({ item: category, readOnly = true, setValue }) => {
  return (
    <CategoryDetails
      category={category}
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
      titleKey="edit_category"
      onSave={onSave}
      onCancel={onCancel}
      detailComponent={DetailsComponent}
    />
  );
};

const ViewCategory = ({ history, match }) => {
  const categoryId = match.params.categoryId;
  const dummyCategory = {
    categoryId,
    name: "",
    description: "",
    budget: {
      type: "MONTHLY",
      value: 0,
    },
    dummy: true,
  };

  function getCategory() {
    return retrieve(categoryId);
  }

  function deleteCategory() {
    return remove(categoryId);
  }

  function updateCategory(item, details) {
    return update(item.id, details);
  }

  return (
    <ViewPage
      titleKey="view_category"
      initialItem={dummyCategory}
      retrieve={getCategory}
      remove={deleteCategory}
      update={updateCategory}
      history={history}
      editComponent={EditComponent}
      viewItemComponent={DetailsComponent}
    />
  );
};
export default ViewCategory;
