import dayjs from "dayjs";
import {
  Box,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { UserAttendance } from "../../types/attendance";
import NotFound from "../../components/notFound/notFound";
import CustomLoading from "../../components/loading/customLoading";
import CustomWrapper from "../../components/wrapper/customWrapper";
import { useGetMyAttendanceQuery } from "../../services/attendanceApi";
import SubmitAttendance from "../../components/attendance/submitAttendance";

const HomePage = () => {
  const { data: myAttendance, isLoading: isLoadingMyAttendance } =
    useGetMyAttendanceQuery();

  return (
    <>
      <CustomWrapper>
        <Box sx={{ width: "100%" }}>
          <SubmitAttendance />
          <Divider />
          <TableContainer component={Paper}>
            <Typography variant="h5" sx={{ margin: "1rem" }}>
              My Attendance
            </Typography>
            {isLoadingMyAttendance ? (
              <CustomLoading />
            ) : myAttendance?.userAttendance ? (
              <Table>
                <TableHead>
                  <TableCell>Date</TableCell>
                  <TableCell>Check In Date</TableCell>
                  <TableCell>Check In Photo</TableCell>
                  <TableCell>Check Out Date</TableCell>
                  <TableCell>Check Out Photo</TableCell>
                </TableHead>
                <TableBody>
                  {myAttendance?.userAttendance?.map((row: UserAttendance) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        {dayjs(row.date).format("dddd, DD MMMM YYYY")}
                      </TableCell>
                      <TableCell>{row.time_in}</TableCell>
                      <TableCell>
                        {row.photo_in_url ? (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${row.photo_in_url}`}
                            alt={`${row.user_id}-${row.time_in}`}
                            style={{
                              width: 80,
                              height: 50,
                              borderRadius: ".5rem",
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </TableCell>
                      <TableCell>{row.time_out}</TableCell>
                      <TableCell>
                        {row.photo_out_url ? (
                          <img
                            src={`${process.env.REACT_APP_API_URL}/${row.photo_out_url}`}
                            alt={`${row.user_id}-${row.time_in}`}
                            style={{
                              width: 80,
                              height: 50,
                              borderRadius: ".5rem",
                            }}
                          />
                        ) : (
                          <></>
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
        </Box>
      </CustomWrapper>
    </>
  );
};

export default HomePage;
