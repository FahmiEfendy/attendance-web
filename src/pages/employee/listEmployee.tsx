import { useState } from "react";
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";

import { ROLE_ENUM } from "../../constants/role";
import NotFound from "../../components/notFound/notFound";
import CustomLoading from "../../components/loading/customLoading";
import CustomWrapper from "../../components/wrapper/customWrapper";
import Notification from "../../components/notification/notification";
import DeleteEmployeeModal from "../../components/modal/deleteEmployeeModal";
import UpdateEmployeeModal from "../../components/modal/updateEmployeeModal";
import {
  useDeleteEmployeeMutation,
  useGetAllEmployeeQuery,
} from "../../services/userApi";
import {
  DEPARTMENT_ENUM_LABEL,
  POSITION_ENUM_LABEL,
} from "../../constants/option";

const ListEmployee = () => {
  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [employeeDeleteId, setEmployeeDeleteId] = useState<string | null>(null);

  const { data: employeeList, isLoading: isLoadingEmployeeList } =
    useGetAllEmployeeQuery(
      { role: ROLE_ENUM.EMPLOYEE },
      {
        // skip: userData?.role !== ROLE_ENUM.HR, // Prevent fetch if userData not HR
      }
    );

  const [
    deleteEmployee,
    {
      data: deleteEmployeeData,
      isLoading: isLoadingDeleteEmployee,
      isSuccess: isSuccessDeleteEmployee,
      isError: isErrorDeleteEmployee,
      error: errorDeleteEmployee,
      reset: resetDeleteEmployee,
    },
  ] = useDeleteEmployeeMutation();

  const editEmployeeHandler = (id: string) => {
    if (!id) return;

    setEmployeeId(id);
  };

  const closeEditEmployeeModalHandler = () => {
    setEmployeeId(null);
  };

  const deleteEmployeeHandler = (id: string) => {
    setEmployeeDeleteId(id);
  };

  const closeDeleteEmployeeModalHandler = () => {
    setEmployeeDeleteId(null);
  };

  return (
    <>
      <CustomWrapper>
        <Box sx={{ width: "100%" }}>
          <Typography variant="h5" sx={{ margin: "1rem" }}>
            Employee List
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ width: "100%", overflowX: "auto" }}
          >
            {isLoadingEmployeeList ? (
              <CustomLoading />
            ) : employeeList ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Position</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeList?.allUsers.map((row: any) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.full_name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.phone}</TableCell>
                      <TableCell>
                        {DEPARTMENT_ENUM_LABEL[row.department]}
                      </TableCell>
                      <TableCell>{POSITION_ENUM_LABEL[row.position]}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => editEmployeeHandler(row.id)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteEmployeeHandler(row.id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <NotFound />
            )}
          </TableContainer>
        </Box>
      </CustomWrapper>

      <UpdateEmployeeModal
        employeeId={employeeId}
        onClose={closeEditEmployeeModalHandler}
      />

      <DeleteEmployeeModal
        employeeDeleteId={employeeDeleteId}
        onClose={closeDeleteEmployeeModalHandler}
        deleteEmployee={deleteEmployee}
        isLoading={isLoadingDeleteEmployee}
        isSuccess={isSuccessDeleteEmployee}
      />

      <Notification
        isOpen={isSuccessDeleteEmployee || isErrorDeleteEmployee}
        severity={isSuccessDeleteEmployee ? "success" : "error"}
        message={
          isSuccessDeleteEmployee
            ? deleteEmployeeData?.message
            : (errorDeleteEmployee as any)?.data?.message
        }
        reset={resetDeleteEmployee}
      />
    </>
  );
};

export default ListEmployee;
