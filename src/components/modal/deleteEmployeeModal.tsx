import { useEffect } from "react";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";

type DeleteEmployeeModalProps = {
  employeeDeleteId: string | null;
  onClose: () => void;
  deleteEmployee: any;
  isSuccess: boolean;
};

const DeleteEmployeeModal = ({
  employeeDeleteId,
  onClose,
  deleteEmployee,
  isSuccess,
}: DeleteEmployeeModalProps) => {
  const deleteEmployeeHandler = () => {
    deleteEmployee({ id: employeeDeleteId });
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess, onClose]);

  return (
    <>
      <Modal open={!!employeeDeleteId} onClose={onClose}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "40rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "1.5rem",
            borderRadius: ".5rem",
            gap: "1.5rem",
          }}
        >
          <Typography variant="h6">
            Are you sure want to delete this employee?
          </Typography>
          <Box sx={{ display: "flex", marginLeft: "auto", gap: 2 }}>
            <Button variant="outlined" onClick={onClose}>
              Back
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={deleteEmployeeHandler}
            >
              Delete Employee
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default DeleteEmployeeModal;
