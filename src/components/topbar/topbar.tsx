import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Avatar, Box, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { RootState } from "../../store";
import { DecodedToken } from "../../types/auth";

const Topbar = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [userData, setUserData] = useState<DecodedToken>();

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserData(decoded);
    }
  }, [token]);

  return (
    <Box
      sx={{
        height: "7vh",
        backgroundColor: "red",
        display: "flex",
        alignItems: "center",
        paddingLeft: "1.5rem",
        gap: 2,
      }}
    >
      <CalendarMonthIcon sx={{ color: "white" }} />
      <Typography variant="h6" sx={{ color: "white" }}>
        ATTENDANCE
      </Typography>
      <Box
        sx={{
          margin: "0 1.5rem 0 auto",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          sx={{ color: "white" }}
        >{`Hello, ${userData?.full_name}!`}</Typography>
        <Avatar />
      </Box>
    </Box>
  );
};

export default Topbar;
