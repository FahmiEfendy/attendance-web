import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Box } from "@mui/material";

import Menu from "../menu/menu";
import { RootState } from "../../store";
import { DecodedToken } from "../../types/auth";
import Topbar from "../../components/topbar/topbar";

const CustomWrapper = ({ children }: { children: React.ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [userData, setUserData] = useState<DecodedToken>();
  const [isSmallDrawerOpen, setIsSmallDrawerOpen] = useState<boolean>(false);

  const clickDrawerHandler = () => {
    setIsSmallDrawerOpen((prevState) => !prevState);
  };

  const closeDrawerHandler = () => {
    setIsSmallDrawerOpen(false);
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserData(decoded);
    }
  }, [token]);

  return (
    <>
      <Topbar onClickMenu={clickDrawerHandler} />
      <Box sx={{ display: "flex", flexDirection: "row", height: "93vh" }}>
        <Menu
          userData={userData}
          isSmallDrawerOpen={isSmallDrawerOpen}
          onClose={closeDrawerHandler}
        />
        {children}
      </Box>
    </>
  );
};

export default CustomWrapper;
