import { useEffect, useState } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

type NotificationProps = {
  isOpen: boolean;
  severity: AlertColor;
  message: string;
};

const Notification = ({ isOpen, severity, message }: NotificationProps) => {
  const [open, setOpen] = useState<boolean>(isOpen);

  const closeHandler = () => {
    setOpen(false);
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
