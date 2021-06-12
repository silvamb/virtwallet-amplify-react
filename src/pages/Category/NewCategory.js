import CreatePage from "../../components/pages/CreatePage";
import CategoryDetails from "./CategoryDetails";
import { create } from "../../model/Category";

const DetailsComponent = ({ item: category, readOnly, setValue }) => {
  return (
    <CategoryDetails
      category={category}
      readOnly={readOnly}
      setValue={setValue}
      creating={true}
    />
  );
};

const NewCategory = ({ match, history }) => {
  const accountId = match ? match.params.accountId : undefined;

  const newCategory = {
    accountId,
    name: "",
    description: "",
    budget: {
      type: "MONTHLY",
      value: 0,
    },
  };

  return (
    <CreatePage
      titleKey="new_category"
      initialItem={newCategory}
      history={history}
      detailsComponent={DetailsComponent}
      create={create}
    />
  );
};

export default NewCategory;
