import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import SectionTitle from "components/typography/SectionTitle";
import { GridTextField } from "components/input/GridTextFields";
import Grid from "@material-ui/core/Grid";
import CategorySelect from "components/input/CategorySelect";

const useStyles = makeStyles((theme) => ({
  keywordRuleInfo: {
    marginTop: theme.spacing(1),
  },
  section: {
    margin: theme.spacing(2),
  },
  sectionBody: {
    margin: theme.spacing(2),
  },
}));

const KeywordRuleDetails = ({ keywordRule, setValue, readOnly }) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);

  function setAttribute(name) {
    return (event) => setValue(name, event.target.value);
  }

  return (
    <div className={classes.keywordRuleInfo}>
      <div className={classes.section}>
        <SectionTitle titleKey="keyword_rule_details" />
        <div className={classes.sectionBody}>
          <Grid container spacing={2}>
            <GridTextField
              size={12}
              id="keyword-rule-name"
              label={intl.formatMessage({ id: "name" })}
              value={keywordRule.keyword}
              readOnly={readOnly}
              onChange={setAttribute("keyword")}
            />
            <CategorySelect
              accountId={keywordRule.accountId}
              size={12}
              onChange={setAttribute("categoryId")}
              value={keywordRule.categoryId}
              readOnly={readOnly}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default KeywordRuleDetails;
