
export function showError(enqueueSnackbar, message) {
  enqueueSnackbar(message, {
    variant: "error",
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  });
}

export function showInfo(enqueueSnackbar, message) {
  enqueueSnackbar(message, {
    variant: "info",
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
  });
}