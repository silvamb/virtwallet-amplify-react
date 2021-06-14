import React, { useState } from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Page from "components/pages/CustomPage";
import AccountSummaryDashboard from "./AccountSummaryDashboard";

const useStyles = makeStyles((theme) => ({
   tab: {
    marginTop: theme.spacing(2),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AccountDashboard = ({ match, history }) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);
  const accountId = match ? match.params.accountId : undefined;
  
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  function onBack() {
    history.goBack();
  }

  return (
    <Page titleKey="account_dashboard" onBack={onBack}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="account dashboards"
      >
        <Tab label={intl.formatMessage({ id: "summary" })} {...a11yProps(0)} />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.tab}>
        <AccountSummaryDashboard accountId={accountId}/>
      </TabPanel>
    </Page>
  );
};

export default AccountDashboard;
