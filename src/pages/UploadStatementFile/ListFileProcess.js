import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import SimpleList from "../../components/list/SimpleList";
import SimpleListItem from "../../components/list/SimpleListItem";
import ListPage from "../../components/pages/ListPage";
import { list as listProcessedFiles } from "../../model/StatementFileProcess";
import { showError } from "../../util/utils";


function StatementFileProcessItem(fileProcess) {
  const to = `/account/${fileProcess.accountId}/wallet/${fileProcess.walletId}/statement-files-process/${fileProcess.id}`;
  const intl = useIntl();
  const status = intl.formatMessage({ id: fileProcess.status || "file_uploaded" })

  return <SimpleListItem key={fileProcess.id} primary={fileProcess.fileName} secondary={status} to={to} />
}

const ListProcessedStatementFiles = ({history, match}) => {
  const accountId = match.params.accountId;
  const walletId = match.params.walletId;

  const [processedFiles, setProcessedFiles] = useState();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function loadItems() {
      if (!processedFiles) {
        try {
          const items = await listProcessedFiles(accountId, walletId);
          setProcessedFiles(items);
        } catch (err) {
          showError(enqueueSnackbar, err.message);
        }
      }
    }
    loadItems();
  }, [processedFiles, accountId, walletId, enqueueSnackbar]);

  return (
    <ListPage
      titleKey="list_processed_statement_files"
      loading={!processedFiles}
    >
      <SimpleList
        listItemComponent={StatementFileProcessItem}
        data={processedFiles || []}
        onRefresh={() => setProcessedFiles()}
      />
    </ListPage>
  );
};
export default ListProcessedStatementFiles;
