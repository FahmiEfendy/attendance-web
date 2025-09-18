import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Grid, Modal, Paper, Typography } from "@mui/material";

import { CustomSelect } from "../form/CustomSelect";
import CustomLoading from "../loading/customLoading";
import CustomTextField from "../form/CustomTextField";
import Notification from "../notification/notification";
import {
  useGetEmployeeDetailQuery,
  useUpdateEmployeeMutation,
} from "../../services/userApi";
import {
  DEPARTMENT_ENUM,
  POSITION_ENUM,
  ROLE_ENUM,
} from "../../constants/option";

type UpdateEmployeeProps = {
  employeeId: string | null;
  onClose: () => void;
};

const UpdateEmployeeModal = ({ employeeId, onClose }: UpdateEmployeeProps) => {
  const { control, handleSubmit, setValue } = useForm();

  const { data: employeeDetail, isLoading: isLoadingEmployeeDetail } =
    useGetEmployeeDetailQuery(employeeId && { id: employeeId }, {
      skip: !employeeId,
    });

  const [
    updateEmployee,
    {
      data: updateEmployeeData,
      isLoading: isLoadingUpdateEmployee,
      isSuccess: isSuccessUpdateEmployee,
      isError: isErrorUpdateEmployee,
      error: errorUpdateEmployee,
      reset: resetUpdateEmployee,
    },
  ] = useUpdateEmployeeMutation();

  const onSubmit = (data: any) => {
    const payloadUpdateEmployee = {
      full_name: data.full_name,
      phone: data.phone,
      role: data.role,
      department: data.department,
      position: data.position,
    };
    updateEmployee({ id: employeeId, body: payloadUpdateEmployee });
  };

  useEffect(() => {
    if (employeeDetail?.selectedUser) {
      const data = employeeDetail?.selectedUser;
      setValue("username", data.username);
      setValue("password", data.password);
      setValue("email", data.email);
      setValue("full_name", data.full_name);
      setValue("phone", data.phone);
      setValue("role", data.role);
      setValue("department", data.department);
      setValue("position", data.position);
    }
  }, [employeeDetail, setValue]);

  useEffect(() => {
    if (isSuccessUpdateEmployee) {
      onClose();
    }
  }, [isSuccessUpdateEmployee, onClose, resetUpdateEmployee]);

  return (
    <>
      <Modal open={!!employeeId} onClose={onClose}>
        <Paper
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "50rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "1.5rem",
            borderRadius: ".5rem",
            gap: "1.5rem",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography variant="h5" sx={{ textAlign: "center" }}>
            Edit Profile
          </Typography>
          {isLoadingEmployeeDetail ? (
            <CustomLoading />
          ) : (
            <Grid container spacing={2}>
              <Grid size={6}>
                <CustomTextField
                  control={control}
                  name="username"
                  label="Username"
                  placeholder="Enter username..."
                  disabled
                />
              </Grid>
              <Grid size={6}>
                <CustomTextField
                  control={control}
                  name="password"
                  label="Password"
                  placeholder="Enter passowrd..."
                  type="password"
                  disabled
                />
              </Grid>
              <Grid size={6}>
                <CustomTextField
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Enter email..."
                  disabled
                />
              </Grid>
              <Grid size={6}>
                <CustomTextField
                  control={control}
                  name="full_name"
                  label="Full Name"
                  placeholder="Enter full name..."
                />
              </Grid>
              <Grid size={6}>
                <CustomTextField
                  control={control}
                  name="phone"
                  label="Phone"
                  placeholder="Enter phone number..."
                  type="number"
                />
              </Grid>
              <Grid size={6}>
                <CustomSelect
                  control={control}
                  name="role"
                  label="Role"
                  options={ROLE_ENUM}
                />
              </Grid>
              <Grid size={6}>
                <CustomSelect
                  control={control}
                  name="department"
                  label="Deparment"
                  options={DEPARTMENT_ENUM}
                />
              </Grid>
              <Grid size={6}>
                <CustomSelect
                  control={control}
                  name="position"
                  label="Position"
                  options={POSITION_ENUM}
                />
              </Grid>
            </Grid>
          )}
          <Box sx={{ display: "flex", marginLeft: "auto", gap: 2 }}>
            <Button variant="outlined" color="error" onClick={onClose}>
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              loading={isLoadingUpdateEmployee}
            >
              Update Profile
            </Button>
          </Box>
        </Paper>
      </Modal>

      <Notification
        isOpen={isSuccessUpdateEmployee || isErrorUpdateEmployee}
        severity={isSuccessUpdateEmployee ? "success" : "error"}
        message={
          isSuccessUpdateEmployee
            ? updateEmployeeData?.message
            : (errorUpdateEmployee as any)?.data?.message
        }
        reset={resetUpdateEmployee}
      />
    </>
  );
};

export default UpdateEmployeeModal;
