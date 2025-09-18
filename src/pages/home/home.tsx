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

import CustomLoading from "../../components/loading/customLoading";
import CustomWrapper from "../../components/wrapper/customWrapper";
import { useGetMyAttendanceQuery } from "../../services/attendanceApi";
import { UserAttendance } from "../../types/attendance";
import NotFound from "../../components/notFound/notFound";

const HomePage = () => {
  const { data: myAttendance, isLoading: isLoadingMyAttendance } =
    useGetMyAttendanceQuery();

  return (
    <>
      <CustomWrapper>
        <Box sx={{ width: "100%" }}>
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
                  <TableCell>Check In</TableCell>
                  <TableCell>Check Out</TableCell>
                  <TableCell>Photo</TableCell>
                </TableHead>
                <TableBody>
                  {myAttendance?.userAttendance?.map((row: UserAttendance) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        {dayjs(row.date).format("dddd, DD MMMM YYYY")}
                      </TableCell>
                      <TableCell>{row.time_in}</TableCell>
                      <TableCell>{row.time_out}</TableCell>
                      <TableCell>
                        <img
                          src={`${process.env.REACT_APP_API_URL}/${row.photo_url}`}
                          alt={`${row.user_id}-${row.time_in}`}
                          style={{
                            width: 80,
                            height: 50,
                            borderRadius: ".5rem",
                          }}
                        />
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
