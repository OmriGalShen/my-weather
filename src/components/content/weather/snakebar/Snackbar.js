import React, { useEffect } from "react";

function SimpleSnackbar({ status, msg }) {
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    setOpen(true);
  }, [status]);

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <SnackbarContent
        status={status}
        contentprops={{
          "aria-describedby": "message-id"
        }}
        // prettier-ignore
        message={(
          <InfoWrapper id='message-id'>
            {status === 'success' ?
              <CheckCircleIcon /> :
              <ErrorIcon />
            }
            {msg || `Form submission status: ${status}`}
          </InfoWrapper>
        )}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
}
export default SimpleSnackbar;
