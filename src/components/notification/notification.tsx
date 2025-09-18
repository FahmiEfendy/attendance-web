import { useEffect, useState } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

type NotificationProps = {
  isOpen: boolean;
  message: string;
  severity?: AlertColor;
  reset?: any;
};

const Notification = ({
  isOpen,
  message,
  severity = "success",
  reset,
}: NotificationProps) => {
  const [open, setOpen] = useState<boolean>(isOpen);

  const closeHandler = () => {
    setOpen(false);
    reset();
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={closeHandler}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{ margin: "1rem 2rem" }}
    >
      <Alert onClose={closeHandler} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
