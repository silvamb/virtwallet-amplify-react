import { useSnackbar } from "notistack";
import { list } from "model/Category";
import React, { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import GridSelect from "./GridSelect";
import { showError } from "../../util/utils";

async function loadCategories(accountId, setCategories, enqueueSnackbar) {
  try {
    const categories = await list(accountId);

    const categoriesMap = categories.map(category => {
      return {
        id: category.id,
        text: category.name
      }
    })

    setCategories(categoriesMap);
  } catch (err) {
    showError(enqueueSnackbar, err.message);
    setCategories([]);
  }
}

const CategorySelect = ({
  accountId,
  size,
  onChange,
  value = "",
  readOnly,
  disabled
}) => {
  const intl = useIntl();
  const { enqueueSnackbar } = useSnackbar();

  const emptyCategories = useMemo(() => [
    {
      id: "loading",
      text: intl.formatMessage({id: "loading_categories"})
    }
  ], [intl]);

  const [categories, setCategories] = useState(emptyCategories);
  const loading = categories === emptyCategories;
  const currentValue = loading ? "loading" : value;
  
  useEffect(() => {
    if (categories === emptyCategories) {
      loadCategories(accountId, setCategories, enqueueSnackbar);
    }
  }, [categories, emptyCategories, accountId, enqueueSnackbar]);

  return (
    <GridSelect
      size={size}
      id="category"
      value={currentValue}
      label={intl.formatMessage({id:"category"})}
      values={categories}
      readOnly={readOnly || loading}
      disabled={disabled || loading}
      onChange={onChange}
    />
  )
}


export default CategorySelect;