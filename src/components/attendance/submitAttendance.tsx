import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";

import { RootState } from "../../store";
import { DecodedToken } from "../../types/auth";
import { ROLE_ENUM } from "../../constants/role";
import CustomLoading from "../loading/customLoading";
import Notification from "../notification/notification";
import ModalSubmitAttendance from "./modalSubmitAttendance";
import {
  useGetMyAttendanceTodayQuery,
  useSubmitAttendanceMutation,
} from "../../services/attendanceApi";

type SubmitAttendanceProps = {
  role: string;
};

const SubmitAttendance = ({ role }: SubmitAttendanceProps) => {
  const today = dayjs();

  const token = useSelector((state: RootState) => state.auth.token);

  const [userData, setUserData] = useState<DecodedToken>();
  const [isModalSubmitAttendanceOpen, setIsModalSubmitAttendanceOpen] =
    useState<boolean>(false);

  const { data: myAttendanceToday, isLoading: isLoadingMyAttendanceToday } =
    useGetMyAttendanceTodayQuery(
      {
        date: today.format("YYYY-MM-DD"),
      },
      {
        skip: userData?.role !== ROLE_ENUM.EMPLOYEE, // Prevent fetch if userData not HR
      }
    );

  const [
    submitAttendance,
    {
      data: submitAttendanceData,
      isLoading: isLoadingSubmitAttendance,
      isSuccess: isSuccessSubmitAttendance,
      isError: isErrorSubmitAttendance,
      error: errorSubmitAttendance,
      reset: resetSubmitAttendance,
    },
  ] = useSubmitAttendanceMutation();

  const openModalHandler = () => {
    // Prevent open modal if already check in and check out
    if (
      myAttendanceToday?.userAttendance[0]?.time_in &&
      myAttendanceToday?.userAttendance[0]?.time_out
    )
      return;

    setIsModalSubmitAttendanceOpen(true);
  };

  const closeModalHandler = () => {
    setIsModalSubmitAttendanceOpen(false);
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserData(decoded);
    }
  }, [token]);

  useEffect(() => {
    if (isSuccessSubmitAttendance) {
      closeModalHandler();
    }
  }, [isSuccessSubmitAttendance]);

  return (
    <>
      <Box sx={{ padding: { xs: "1rem", md: "2rem" } }}>
        {isLoadingMyAttendanceToday ? (
          <CustomLoading />
        ) : myAttendanceToday?.userAttendance ? (
          <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
            <Button
              variant="contained"
              onClick={openModalHandler}
              sx={{
                height: { xs: "8rem", md: "10rem" },
                width: { xs: "8rem", md: "10rem" },
                borderRadius: "50rem",
                border: `1rem solid ${
                  !myAttendanceToday?.userAttendance[0]?.time_in
                    ? "blue"
                    : !myAttendanceToday?.userAttendance[0]?.time_out
                    ? "red"
                    : "black"
                }`,
                backgroundColor: "white",
                color: "black",
              }}
            >
              {!myAttendanceToday?.userAttendance[0]?.time_in
                ? "Check In"
                : !myAttendanceToday?.userAttendance[0]?.time_out
                ? "Check Out"
                : "Thank you for today!"}
            </Button>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 0.5,
              }}
            >
              <Typography
                sx={{
                  marginBottom: ".5rem",
                  fontSize: { xs: "1rem", md: "1.25rem" },
                }}
              >
                {today.format("dddd, DD MMMM YYYY")}
              </Typography>
              <Typography>
                {`Check In: ${
                  myAttendanceToday?.userAttendance[0]?.time_in
                    ? myAttendanceToday?.userAttendance[0]?.time_in
                    : "-"
                }`}
              </Typography>
              <Typography>
                {`Checkout: ${
                  myAttendanceToday?.userAttendance[0]?.time_out
                    ? myAttendanceToday?.userAttendance[0]?.time_out
                    : "-"
                }`}
              </Typography>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>

      <Notification
        isOpen={isSuccessSubmitAttendance || isErrorSubmitAttendance}
        severity={isSuccessSubmitAttendance ? "success" : "error"}
        message={
          isSuccessSubmitAttendance
            ? submitAttendanceData?.message
            : (errorSubmitAttendance as any)?.data?.message
        }
        reset={resetSubmitAttendance}
      />

      {userData && (
        <ModalSubmitAttendance
          submitAttendance={submitAttendance}
          userData={userData}
          isOpen={isModalSubmitAttendanceOpen}
          closeModalHandler={closeModalHandler}
          checkInDate={myAttendanceToday?.userAttendance[0]?.time_in || null}
          checkOutDate={myAttendanceToday?.userAttendance[0]?.time_out || null}
          isLoading={isLoadingSubmitAttendance}
          isSuccess={isSuccessSubmitAttendance}
        />
      )}
    </>
  );
};

export default SubmitAttendance;
