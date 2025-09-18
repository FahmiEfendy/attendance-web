import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LogoutIcon from "@mui/icons-material/Logout";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { RootState } from "../../store";
import { DecodedToken } from "../../types/auth";
import { ROLE_ENUM } from "../../constants/role";
import { clearToken } from "../../store/authSlice";
import Topbar from "../../components/topbar/topbar";
import { HR_MENU, MENU } from "../../constants/menu";

const CustomWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.auth.token);

  const [userData, setUserData] = useState<DecodedToken>();

  const menuHandler = (link: string) => {
    navigate(link);
  };

  const logoutHandler = () => {
    dispatch(clearToken());
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserData(decoded);
    }
  }, [token]);

  return (
    <>
      <Topbar />
      <Box sx={{ display: "flex", flexDirection: "row", height: "93vh" }}>
        <Drawer
          variant="permanent"
          sx={{
            position: "relative", // Reset default Drawer position (fixed)
            [`& .MuiDrawer-paper`]: {
              position: "relative", // Reset default Paper position (fixed)
              width: 250,
              boxSizing: "border-box",
            },
          }}
        >
          <Box
            sx={{
              width: 250,
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <List>
              {userData?.role === ROLE_ENUM.HR
                ? HR_MENU.map((m) => (
                    <ListItem key={m.key} disablePadding>
                      <ListItemButton onClick={() => menuHandler(m.link)}>
                        <ListItemIcon>
                          <m.icon />
                        </ListItemIcon>
                        <ListItemText primary={m.title} />
                      </ListItemButton>
                    </ListItem>
                  ))
                : MENU.map((m) => (
                    <ListItem key={m.key} disablePadding>
                      <ListItemButton onClick={() => menuHandler(m.link)}>
                        <ListItemIcon>
                          <m.icon />
                        </ListItemIcon>
                        <ListItemText primary={m.title} />
                      </ListItemButton>
                    </ListItem>
                  ))}
            </List>
            <Divider />
            <List sx={{ margin: "auto 0 .5rem" }}>
              <ListItem disablePadding>
                <ListItemButton onClick={logoutHandler}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Logout"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        {children}
      </Box>
    </>
  );
};

export default CustomWrapper;
