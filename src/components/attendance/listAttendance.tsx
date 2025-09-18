import dayjs from "dayjs";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import NotFound from "../notFound/notFound";
import { ROLE_ENUM } from "../../constants/role";
import CustomLoading from "../loading/customLoading";
import { ApiAttendanceResponse, UserAttendance } from "../../types/attendance";
import {
  DEPARTMENT_ENUM_LABEL,
  POSITION_ENUM_LABEL,
} from "../../constants/option";

type ListAttendanceProps = {
  onOpen: (imagePath: string) => void;
  data: ApiAttendanceResponse;
  isLoading: boolean;
  role?: string;
};

const ListAttendance = ({
  onOpen,
  data,
  isLoading,
  role,
}: ListAttendanceProps) => {
  return (
    <>
      <Typography
        sx={{ margin: "1rem", fontSize: { xs: "1.25rem", md: "1.5rem" } }}
      >
        {role === ROLE_ENUM.HR ? "Employee Attendance" : "My Attendance"}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ width: "100%", overflowX: "auto" }}
      >
        {isLoading ? (
          <CustomLoading />
        ) : data?.userAttendance.length > 0 ? (
          <Table size="small" sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                {role === ROLE_ENUM.HR && (
                  <>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Position</TableCell>
                  </>
                )}
                <TableCell>Check In Date</TableCell>
                <TableCell>Check In Photo</TableCell>
                <TableCell>Check Out Date</TableCell>
                <TableCell>Check Out Photo</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data?.userAttendance?.map((row: UserAttendance) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {dayjs(row.date).format("dddd, DD MMMM YYYY")}
                  </TableCell>
                  {role === ROLE_ENUM.HR && (
                    <>
                      <TableCell>{row?.user?.full_name}</TableCell>
                      <TableCell>
                        {DEPARTMENT_ENUM_LABEL[row?.user?.department]}
                      </TableCell>
                      <TableCell>
                        {POSITION_ENUM_LABEL[row?.user?.position]}
                      </TableCell>
                    </>
                  )}
                  <TableCell>{row.time_in}</TableCell>
                  <TableCell onClick={() => onOpen(row.photo_in_url)}>
                    {row.photo_in_url && (
                      <Box
                        component="img"
                        src={`${process.env.REACT_APP_API_URL}/${row.photo_in_url}`}
                        alt={`${row.user_id}-${row.time_in}`}
                        sx={{
                          width: { xs: 50, sm: 80 },
                          height: { xs: 35, sm: 50 },
                          borderRadius: ".5rem",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{row.time_out}</TableCell>
                  <TableCell onClick={() => onOpen(row.photo_out_url)}>
                    {row.photo_out_url && (
                      <Box
                        component="img"
                        src={`${process.env.REACT_APP_API_URL}/${row.photo_out_url}`}
                        alt={`${row.user_id}-${row.time_out}`}
                        sx={{
                          width: { xs: 50, sm: 80 },
                          height: { xs: 35, sm: 50 },
                          borderRadius: ".5rem",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NotFound />
        )}
      </TableContainer>
    </>
  );
};

export default ListAttendance;
