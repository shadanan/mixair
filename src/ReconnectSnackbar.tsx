import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { useEffect } from "react";

type ReconnectSnackbarProps = {
  backoff: number | null;
};

function getMessage(backoff: number) {
  const floor = Math.floor(backoff / 1000);
  if (floor === 0) {
    return "Reconnecting...";
  }

  return `Disconnected. Reconnecting in ${floor} seconds...`;
}

function ReconnectingSnackbar({ backoff }: { backoff: number }) {
  return (
    <Snackbar open={true}>
      <Alert variant="filled" severity="warning">
        {getMessage(backoff)}
      </Alert>
    </Snackbar>
  );
}

function ConnectedSnackbar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert variant="filled" severity="success" onClose={handleClose}>
        Connected!
      </Alert>
    </Snackbar>
  );
}

export default function ReconnectSnackbar({ backoff }: ReconnectSnackbarProps) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (backoff === null) {
      setOpen(true);
    }
  }, [backoff]);

  if (backoff !== null) {
    return <ReconnectingSnackbar backoff={backoff} />;
  }

  return <ConnectedSnackbar open={open} setOpen={setOpen} />;
}
