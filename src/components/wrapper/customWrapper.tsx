import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

import { MENU } from "../../constants/menu";
import { clearToken } from "../../store/authSlice";
import Topbar from "../../components/topbar/topbar";

const CustomWrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const menuHandler = (link: string) => {
    navigate(link);
  };

  const logoutHandler = () => {
    dispatch(clearToken());
  };

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
              {MENU.map((m) => (
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
