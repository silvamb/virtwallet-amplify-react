import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import SectionTitle from "components/typography/SectionTitle";
import { GridTextField } from "components/input/GridTextFields";
import CategorySelect from "components/input/CategorySelect";
import GridSelect from "components/input/GridSelect";
import { EXPRESSION_RULE_TYPE } from "model/CategoryRules";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  expressionRuleInfo: {
    marginTop: theme.spacing(1),
  },
  section: {
    margin: theme.spacing(2),
  },
  sectionBody: {
    margin: theme.spacing(2),
  },
}));


const ExpressionRuleDetails = ({ expressionRule, setValue, readOnly }) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);

  const expressionTypes = EXPRESSION_RULE_TYPE.map((type) => {
    return {
      id: type,
      text: intl.formatMessage({ id: type }),
    };
  });

  function setAttribute(name) {
    return (event) => setValue(name, event.target.value);
  }

  return (
    <div className={classes.expressionRuleInfo}>
      <div className={classes.section}>
        <SectionTitle titleKey="expression_rule_details" />
        <div className={classes.sectionBody}>
          <Grid container spacing={2}>
            <GridTextField
              size={12}
              id="expression-rule-name"
              label={intl.formatMessage({ id: "name" })}
              value={expressionRule.name}
              readOnly={readOnly}
              onChange={setAttribute("name")}
            />
            <GridSelect
              size={5}
              id="expression-rule-type"
              value={expressionRule.type}
              label={intl.formatMessage({ id: "type" })}
              values={expressionTypes}
              readOnly={readOnly}
              onChange={setAttribute("type")}
            />
            <GridTextField
              size={7}
              id="expression-rule-parameter"
              label={intl.formatMessage({ id: "parameter" })}
              value={expressionRule.parameter}
              readOnly={readOnly}
              onChange={setAttribute("parameter")}
            />
            <CategorySelect
              accountId={expressionRule.accountId}
              size={12}
              onChange={setAttribute("categoryId")}
              value={expressionRule.categoryId}
              readOnly={readOnly}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ExpressionRuleDetails;
