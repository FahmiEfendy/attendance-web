import { useForm } from "react-hook-form";
import { Box, Button, Modal, Paper, Typography } from "@mui/material";

import { DecodedToken } from "../../types/auth";
import CustomUploadImage from "../form/customUploadImage";

type ModalSubmitAttendanceProps = {
  isOpen: boolean;
  checkInDate: string | null;
  checkOutDate: string | null;
  submitAttendance: any;
  isLoading: boolean;
  closeModalHandler: () => void;
  userData: DecodedToken;
};

const ModalSubmitAttendance = ({
  isOpen,
  checkInDate,
  checkOutDate,
  submitAttendance,
  isLoading,
  closeModalHandler,
  userData,
}: ModalSubmitAttendanceProps) => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      checkInDate,
      checkOutDate,
    },
  });

  const attendanceHandler = (data: any) => {
    const formData = new FormData();
    formData.append("user_id", userData.id);
    formData.append("photo", data.photo);

    submitAttendance(formData);
  };

  return (
    <Modal open={isOpen} onClose={closeModalHandler}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          width: { xs: "70%", md: "40%" },
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "1.5rem",
          borderRadius: ".5rem",
          gap: "1.5rem",
        }}
      >
        <Typography sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" } }}>
          Check In Attendance
        </Typography>
        <CustomUploadImage name="photo" control={control} />
        <Box sx={{ display: "flex", marginLeft: "auto", gap: 2 }}>
          <Button variant="outlined" color="error" onClick={closeModalHandler}>
            Back
          </Button>
          {(!checkInDate || !checkOutDate) && (
            <Button
              variant="contained"
              loading={isLoading}
              disabled={!!checkInDate && !!checkOutDate}
              onClick={handleSubmit(attendanceHandler)}
            >
              {checkInDate ? "Check Out" : "Check In"}
            </Button>
          )}
        </Box>
      </Paper>
    </Modal>
  );
};

export default ModalSubmitAttendance;
