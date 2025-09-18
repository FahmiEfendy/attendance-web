import { useEffect, useState } from "react";
import { Alert, AlertColor, Snackbar, SxProps } from "@mui/material";

type NotificationProps = {
  isOpen: boolean;
  message: string;
  severity?: AlertColor;
  reset?: any;
  sxProps?: SxProps;
};

const Notification = ({
  isOpen,
  message,
  severity = "success",
  reset,
  sxProps,
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
      sx={{ margin: "1rem 2rem", ...sxProps }}
    >
      <Alert onClose={closeHandler} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
