import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export const MENU = [
  {
    key: "homepage",
    title: "Homepage",
    icon: HomeIcon,
    link: "/",
  },
];

export const HR_MENU = [
  {
    key: "attendance",
    title: "Attendance",
    icon: CalendarMonthIcon,
    link: "/",
  },
  {
    key: "employee",
    title: "Employee",
    icon: PersonIcon,
    link: "/employee",
  },
];
