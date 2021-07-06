import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FolderIcon from "@material-ui/icons/Folder";
import Page from "components/pages/CustomPage";
import { GridTextField } from "components/input/GridTextFields";
import { showError } from "util/utils";
import { create } from "model/StatementFileProcess";
import { retrieve } from "model/Wallet";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  input: {
    display: "none",
  },
  fileIcon: {
    marginLeft: theme.spacing(-1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  progress: {
    marginTop: 20,
    marginLeft: theme.spacing(1),
  },
}));

async function doUploadFile({ s3Url, file }) {
  console.log("Uploading file to S3", file);
  const response = await fetch(s3Url, {
    method: "PUT",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": file.type,
    },
    body: file,
  });
  console.log("File uploaded", response);
}

const SelectFile = ({ handleSelectedFile, classes }) => {
  return (
    <Grid item xs={1}>
      <input
        accept=".csv"
        className={classes.input}
        id="upload-statement-input"
        type="file"
        onChange={handleSelectedFile}
      />
      <label htmlFor="upload-statement-input" className={classes.fileIcon}>
        <IconButton color="inherit" aria-label="select file" component="span">
          <FolderIcon />
        </IconButton>
      </label>
    </Grid>
  );
};

const UploadStatementFilePage = ({ history, match }) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);

  const accountId = match ? match.params.accountId : undefined;
  const walletId = match ? match.params.walletId : undefined;

  const [wallet, setWallet] = useState();
  const [file, setFile] = useState();
  const [loading, setLoading] = useState(true);
  const [fileStatus, setFileStatus] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const walletName = wallet ? wallet.name : "";
  const parserType = wallet
    ? intl.formatMessage({ id: wallet.statementParserId || "ulster_csv"})
    : "";
  const fileName = file ? file.name : "";

  useEffect(() => {
    const load = async () => {
      try {
        const data = await retrieve(walletId);

        setWallet(data);
        setLoading(false);
      } catch (err) {
        setWallet({});
        setLoading(false);
        showError(enqueueSnackbar, err.message);
      }
    };
    load();
  }, [accountId, walletId, enqueueSnackbar]);

  function goBack() {
    history.goBack();
  }

  function handleSelectedFile(e) {
    const files = e.target.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
    setLoading(true);
    setFileStatus(intl.formatMessage({ id: "requesting_file_upload" }));
    processFile(files[0]);
  }

  async function processFile(file) {
    try {
      const { s3Url, statementFileProcessId } = await create({
        accountId,
        walletId,
        parserId: wallet.statementParserId,
        file,
      });
      console.log(
        "S3 signed URL:",
        s3Url,
        "Statement File Process ID",
        statementFileProcessId
      );

      setFileStatus(intl.formatMessage({ id: "uploading_file" }));

      uploadFile({ s3Url, file, statementFileProcessId });
    } catch(error) {
      setLoading(false);
      showError(enqueueSnackbar, "Error Requesting File Upload");
      setFileStatus(intl.formatMessage({ id: "pick_file" }));
    }
  }

  async function uploadFile({ s3Url, file, statementFileProcessId }) {
    try {
      await doUploadFile({ s3Url, file });
      setFileStatus(intl.formatMessage({ id: "file_uploaded" }));
      history.push(`/account/${accountId}/wallet/${walletId}/statement-files-process/${statementFileProcessId}`)
    } catch (err) {
      console.log("Error uploading file", err);
      setLoading(false);
      showError(enqueueSnackbar, "Error Uploading File");
      setFileStatus(intl.formatMessage({ id: "pick_file" }));
    }
  }

  return (
    <Page titleKey="upload_statement" onBack={goBack}>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <GridTextField
            size={12}
            id="wallet-name"
            label={intl.formatMessage({ id: "name" })}
            value={walletName}
            readOnly={true}
          />
          <GridTextField
            size={12}
            id="parser-type"
            label={intl.formatMessage({ id: "parser_type" })}
            value={parserType}
            readOnly={true}
          />
          <Grid container item xs={12}>
            <GridTextField
              size={11}
              id="filename"
              label={intl.formatMessage({ id: "filename" })}
              value={fileName}
              readOnly={true}
              helperText={fileStatus || intl.formatMessage({ id: "pick_file" })}
            />
            {loading ? (
              <Grid item xs={1}>
                <CircularProgress size={24} className={classes.progress} />
              </Grid>
            ) : (
              <SelectFile
                handleSelectedFile={handleSelectedFile}
                classes={classes}
              />
            )}
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export default UploadStatementFilePage;
