import React from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    marginBottom: theme.spacing(2),
  }
}));

const SectionTitle = ({titleKey}) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.sectionTitle}>
      <Typography variant="h6">
        {intl.formatMessage({ id: titleKey })}
      </Typography>
    </div>
  );
};

export default SectionTitle;