import React, { useState } from "react";
import { useIntl } from "react-intl";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Page from "components/pages/CustomPage";
import WalletBalanceDashboard from "./WalletBalanceDashboard";
import MonthlySpentByCategoryDashboard from "./MonthlySpentByCategoryDashboard";

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

const WalletDashboard = ({ match, history }) => {
  const intl = useIntl();
  const accountId = match ? match.params.accountId : undefined;
  const walletId = match ? match.params.walletId : undefined;

  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Page titleKey="wallet_dashboard">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="simple tabs example"
      >
        <Tab label={intl.formatMessage({ id: "balance" })} {...a11yProps(0)} />
        <Tab label={intl.formatMessage({ id: "expenses_by_category" })} {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <WalletBalanceDashboard accountId={accountId} walletId={walletId} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <MonthlySpentByCategoryDashboard
          accountId={accountId}
          walletId={walletId}
        />
      </TabPanel>
    </Page>
  );
};

export default WalletDashboard;
