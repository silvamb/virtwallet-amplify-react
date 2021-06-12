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
  walletInfo: {
    marginTop: theme.spacing(1),
  },
  section: {
    margin: theme.spacing(2),
  },
  sectionBody: {
    margin: theme.spacing(2),
  },
}));

const WALLET_TYPES = [
  "CHECKING_ACCOUNT",
  "CREDIT_CARD",
  "CASH",
  "SAVINGS_ACCOUNT",
];

const WalletDetails = ({ wallet, setValue, readOnly, creating = false }) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);

  const walletTypes = WALLET_TYPES.map((type) => {
    return {
      id: type,
      text: intl.formatMessage({ id: type }),
    };
  });

  function setAttribute(name) {
    return (event) => setValue(name, event.target.value);
  }

  function setNumberValue(name) {
    return (event) => setValue(name, Number(event.target.value));
  }

  return (
    <div className={classes.walletInfo}>
      <div className={classes.section}>
        <SectionTitle titleKey="wallet_details" />
        <div className={classes.sectionBody}>
          <Grid container spacing={2}>
            <GridTextField
              size={12}
              id="wallet-name"
              label={intl.formatMessage({ id: "name" })}
              value={wallet.name}
              readOnly={readOnly}
              onChange={setAttribute("name")}
            />
            <GridTextField
              size={12}
              id="wallet-description"
              label={intl.formatMessage({ id: "description" })}
              value={wallet.description}
              readOnly={readOnly}
              onChange={setAttribute("description")}
            />
            <GridSelect
              size={8}
              id="wallet-type"
              value={wallet.type}
              label={intl.formatMessage({ id: "type" })}
              values={walletTypes}
              readOnly={readOnly}
              disabled={!readOnly && !creating}
              onChange={setAttribute("type")}
            />
            <GridMoneyField
              size={4}
              id="balance"
              label={intl.formatMessage({ id: "balance" })}
              value={wallet.balance || 0}
              readOnly={readOnly}
              onChange={setNumberValue("balance")}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default WalletDetails;
