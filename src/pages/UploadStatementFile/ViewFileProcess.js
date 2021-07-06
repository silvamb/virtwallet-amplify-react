import Grid from "@material-ui/core/Grid";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import React from "react";
import { useIntl } from "react-intl";
import { GridTextField } from "../../components/input/GridTextFields";
import ViewPage from "../../components/pages/ViewPage";
import SectionTitle from "../../components/typography/SectionTitle";
import { retrieve } from "../../model/StatementFileProcess";

const status = ["PROVISIONED", "PARSING", "CLASSIFYING", "DONE"];

const useStyles = makeStyles((theme) => ({
  fileInfo: {
    marginTop: theme.spacing(1),
  },
  section: {
    margin: theme.spacing(2),
  },
  sectionBody: {
    margin: theme.spacing(2),
  },
}));

const ViewStatementFileProcessComponent = ({ item: statementFileProcess }) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <div className={classes.fileInfo}>
      <div className={classes.section}>
        <SectionTitle titleKey="file_details" />
        <div className={classes.sectionBody}>
          <Grid container spacing={2}>
            <GridTextField
              size={12}
              id="file-name"
              label={intl.formatMessage({ id: "filename" })}
              value={statementFileProcess.fileName}
              readOnly={true}
            />
          </Grid>
        </div>
      </div>
      <div className={classes.section}>
        <SectionTitle titleKey="process" />
        <div className={classes.sectionBody}>
          <Stepper activeStep={status.indexOf(statementFileProcess.currentStatus)} orientation="vertical">
            <Step key="provisioned">
              <StepLabel>
                {intl.formatMessage({ id: "file_uploaded" })}
              </StepLabel>
            </Step>
            <Step key="parsing">
              <StepLabel>
                {intl.formatMessage({ id: "parsing_file" })}
              </StepLabel>
            </Step>
            <Step key="classifying">
              <StepLabel>
                {intl.formatMessage({ id: "classifying_file" })}
              </StepLabel>
            </Step>
            <Step key="done">
              <StepLabel>
                {intl.formatMessage({ id: "done" })}
              </StepLabel>
            </Step>
          </Stepper>
        </div>
      </div>
    </div>
  );
};

const ViewStatementFileProcess = ({ match, history }) => {
  const accountId = match.params.accountId;
  const walletId = match.params.walletId;
  const id = match.params.statementFileProcessId;

  const dummyFileProcess = {
    accountId,
    walletId,
    id,
    fileName: "",
    currentStatus: "",
    history: [],
    dummy: true,
  };

  function getStatementFileProcess() {
    return retrieve(accountId, walletId, id);
  }

  return (
    <ViewPage
      titleKey="view_statement_file_process"
      initialItem={dummyFileProcess}
      retrieve={getStatementFileProcess}
      history={history}
      viewItemComponent={ViewStatementFileProcessComponent}
    />
  );
};
export default ViewStatementFileProcess;
