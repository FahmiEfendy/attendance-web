import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import LogoutIcon from "@mui/icons-material/Logout";

import { ROLE_ENUM } from "../../constants/role";
import { clearToken } from "../../store/authSlice";
import { HR_MENU, MENU } from "../../constants/menu";

type MenuProps = {
  userData: any;
  isSmallDrawerOpen: boolean;
  onClose: () => void;
};

const Menu = ({ userData, isSmallDrawerOpen, onClose }: MenuProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuHandler = (link: string) => {
    navigate(link);
    onClose();
  };

  const logoutHandler = () => {
    dispatch(clearToken());
  };

  return (
    <Drawer
      open={isSmallDrawerOpen}
      variant={isSmallDrawerOpen ? "temporary" : "permanent"}
      onClose={onClose}
      sx={{
        display: { xs: isSmallDrawerOpen ? "block" : "none", md: "block" },
        position: isSmallDrawerOpen ? "" : "relative", // Reset default Drawer position (fixed)
        [`& .MuiDrawer-paper`]: {
          top: { xs: "7vh", md: 0 },
          position: isSmallDrawerOpen ? "" : "relative", // Reset default Paper position (fixed)
          width: 250,
          boxSizing: "border-box",
        },
      }}
    >
      <Box
        sx={{
          width: 240,
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
  );
};

export default Menu;
