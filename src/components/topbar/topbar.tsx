import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import MenuIcon from "@mui/icons-material/Menu";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Avatar, Box, IconButton, Typography } from "@mui/material";

import { RootState } from "../../store";
import { DecodedToken } from "../../types/auth";

type TopbarProps = {
  onClickMenu: () => void;
};

const Topbar = ({ onClickMenu }: TopbarProps) => {
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
        paddingLeft: { xs: ".25rem", md: "1.5rem" },
        gap: { xs: 0.5, md: 2 },
      }}
    >
      <IconButton onClick={onClickMenu} sx={{ display: { md: "none" } }}>
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <CalendarMonthIcon sx={{ color: "white" }} />
        <Typography
          variant="h6"
          sx={{ color: "white", display: { xs: "none", md: "inline-block" } }}
        >
          ATTENDANCE
        </Typography>
      </Box>
      <Box
        sx={{
          margin: "0 1.5rem 0 auto",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          sx={{ color: "white", display: { xs: "none", md: "inline-block" } }}
        >{`Hello, ${userData?.full_name}!`}</Typography>
        <Avatar />
      </Box>
    </Box>
  );
};

export default Topbar;
