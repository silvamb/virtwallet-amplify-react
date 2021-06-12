import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import SectionTitle from "../../components/typography/SectionTitle";
import {
  GridTextField,
  GridMoneyField,
} from "../../components/input/GridTextFields";
import GridSelect from "../../components/input/GridSelect";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  categoryInfo: {
    marginTop: theme.spacing(1),
  },
  section: {
    margin: theme.spacing(2),
  },
  sectionBody: {
    margin: theme.spacing(2),
  },
}));

const BUDGET_TYPES = ["MONTHLY", "BIMONTHLY", "YEARLY"];
const CATEGORY_TYPES = ["INCOME", "EXPENDITURE"];

function createOptions(array, intl) {
  return array.map(type => {
    return {
      id: type,
      text: intl.formatMessage({id: type})
    }
  })
}

const CategoryDetails = ({ category, setValue, readOnly }) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);

  const budgetTypes = createOptions(BUDGET_TYPES, intl);
  const categoryTypes = createOptions(CATEGORY_TYPES, intl);

  function setAttribute(name) {
    return (event) => setValue(name, event.target.value);
  }

  function setBudgetType(event) {
    const budget = { ...category.budget };
    budget.type = event.target.value;
    setValue("budget", budget);
  }

  function setBudgetValue(event) {
    const budget = { ...category.budget };
    budget.value = Number(event.target.value);
    setValue("budget", budget);
  }

  return (
    <div className={classes.categoryInfo}>
      <div className={classes.section}>
        <SectionTitle titleKey="category_details" />
        <div className={classes.sectionBody}>
          <Grid container spacing={2}>
            <GridTextField
              size={12}
              id="category-name"
              label={intl.formatMessage({ id: "name" })}
              value={category.name}
              readOnly={readOnly}
              onChange={setAttribute("name")}
            />
            <GridTextField
              size={12}
              id="category-description"
              label={intl.formatMessage({ id: "description" })}
              value={category.description}
              readOnly={readOnly}
              onChange={setAttribute("description")}
            />
            <GridSelect
              size={8}
              id="budget-type"
              value={category.budget ? category.budget.type : "MONTHLY"}
              label={intl.formatMessage({ id: "budget_type" })}
              values={budgetTypes}
              readOnly={readOnly}
              onChange={setBudgetType}
            />
            <GridMoneyField
              size={4}
              id="budget-value"
              label={intl.formatMessage({ id: "value" })}
              value={category.budget ? category.budget.value : 0}
              readOnly={readOnly}
              onChange={setBudgetValue}
            />
            <GridSelect
              size={12}
              id="category-type"
              value={category.type || "EXPENDITURE"}
              label={intl.formatMessage({ id: "category_type" })}
              values={categoryTypes}
              readOnly={readOnly}
              onChange={setAttribute("type")}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default CategoryDetails;
