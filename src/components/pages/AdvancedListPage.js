import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TuneIcon from "@material-ui/icons/Tune";
import NestedList from "components/list/NestedList";
import { showError } from "util/utils";
import Page from "material-ui-shell/lib/containers/Page";
import SearchField from "components/input/SearchField";

export const useStyles = makeStyles((theme) => ({
  root: {
    "overflow-x": "hidden",
    padding: theme.spacing(1),
  },
  appBar: {
    position: "static",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  searchBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const initialState = {
  loading: true,
  data: null,
  filterOpen: false,
  searchTerm: "",
  reload: false,
};

const AdvancedListPage = ({
  titleKey,
  listItems,
  filter,
  defaultFilters,
  addEnabled = false,
  onClickAdd,
  listItemComponent,
  filterComponent: FilterDialog,
}) => {
  const intl = useIntl();
  const theme = useTheme();
  const classes = useStyles(theme);
  const { enqueueSnackbar } = useSnackbar();

  const [state, setState] = useState({
    ...initialState,
    filters: defaultFilters,
  });
  const { loading, data, filterOpen, searchTerm, filters } = state;

  const filteredData =
    data != null ? filter({ data, searchTerm, filters }) : [];

  useEffect(() => {
    async function loadItems() {
      if (loading) {
        try {
          const items = await listItems(filters);
          setState({ ...state, loading: false, data: items });
        } catch (err) {
          setState({ ...state, loading: false, data: [] });
          showError(enqueueSnackbar, err.message);
        }
      }
    }
    loadItems();
  }, [loading, data, state, listItems, filters, enqueueSnackbar]);

  function updateState(attributes) {
    setState({ ...state, ...attributes });
  }

  function showFilters(open) {
    updateState({ filterOpen: open });
  }

  async function onApplyFilter(updatedFilters) {
    updateState({ filterOpen: false, filters: updatedFilters, loading: true });
  }

  return (
    <Page pageTitle={intl.formatMessage({ id: titleKey })}>
      <div className={classes.root}>
        <div className={classes.searchBar}>
          <SearchField
            placeholder={intl.formatMessage({ id: "search" })}
            onSearch={(text) => updateState({ searchTerm: text })}
          />
          <IconButton aria-label="filter" onClick={() => showFilters(true)}>
            <TuneIcon />
          </IconButton>
        </div>
        <NestedList
          groupedData={filteredData}
          listItemComponent={listItemComponent}
        />
        {filterOpen && (
          <FilterDialog
            open={filterOpen}
            filter={filters}
            onApply={onApplyFilter}
            onClose={() => showFilters(false)}
          />
        )}

        {addEnabled && (
          <Fab
            color="primary"
            aria-label="add"
            className={classes.fab}
            onClick={onClickAdd}
          >
            <AddIcon />
          </Fab>
        )}
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Page>
  );
};

export default AdvancedListPage;
