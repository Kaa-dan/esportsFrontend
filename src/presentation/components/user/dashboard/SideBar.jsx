import React, { useEffect, useState } from "react";
import {
  List,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Box,
  Typography,
  Tooltip,
  Avatar,
  Modal,
  Container,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { useLocation } from "react-router-dom";

// mui icons

import LiveTvIcon from "@mui/icons-material/LiveTv";

import LogoutIcon from "@mui/icons-material/Logout";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import MenuOpenTwoToneIcon from "@mui/icons-material/MenuOpenTwoTone";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";
import DateRangeIcon from "@mui/icons-material/DateRange";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import DuoIcon from "@mui/icons-material/Duo";
import ChatIcon from "@mui/icons-material/Chat";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import Diversity2Icon from "@mui/icons-material/Diversity2";

// custom fans component
import Profile from "../../../screens/user/home/Profile";
import Notification from "../../../screens/user/home/Notification";
import LiveCorner from "../../../screens/user/home/LiveCorner";
import ChatUI from "../../../screens/user/home/Chat";
import PlayerView from "../../../screens/user/home/PlayerView";
import SchedulesUser from "../../../screens/user/home/SchedulesUser";
// custom player component
import LiveSetup from "../../../screens/player/LiveSetup";
import Live from "../../../screens/player/Live";

// custom admin component
import Fans from "../../../screens/admin/Fans";
import Teams from "../../../screens/admin/Teams";
import MainRecruit from "../../../screens/admin/MainRecruit";
import Players from "../../../screens/admin/Players";
import ManageSchedules from "../../../screens/admin/manageSchedules";
import AddHighlight from "../../../screens/admin/addHighlights";
// redux store
import { logout } from "../../../../application/slice/user/authSlice";
import { useLogoutMutation } from "../../../../application/slice/user/authApiSlice";

import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMemo } from "react";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#330e62",
  border: "7px solid #6e43a3",
  boxShadow: 24,
  p: 7,
  borderRadius: "10px",
  color: "white",
};

const SideBar = ({ open, setOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileOpenHandler = () => setProfileOpen(true);
  const profileCloseHandler = () => setProfileOpen(false);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  console.log(user);
  let list = [];
  if (user) {
    if (user.role === "fan") {
      list = useMemo(() => [
        {
          title: "Livecorner",
          icon: <DuoIcon />,
          link: "live-corner",
          component: <LiveCorner />,
        },
        {
          title: "Team",
          icon: <Diversity2Icon />,
          link: "player-view",
          component: <PlayerView />,
        },
        {
          title: "Notification",
          icon: <MarkEmailUnreadIcon />,
          link: "notification",
          component: <Notification />,
        },
        {
          title: "Chat",
          icon: <ChatIcon />,
          link: "chat",
          component: <ChatUI />,
        },
        {
          title: "Schedules",
          icon: <DateRangeIcon />,
          link: "schedule-user",
          component: <SchedulesUser />,
        },
      ]);
    } else if (user.role === "admin") {
      list = useMemo(() => [
        {
          title: "Highlight",
          icon: <OndemandVideoIcon />,
          link: "highlight",
          component: <AddHighlight />,
        },
        {
          title: "Fans",
          icon: <PeopleOutlineIcon />,
          link: "fans",
          component: <Fans />,
        },
        {
          title: "Players",
          icon: <SportsKabaddiIcon />,
          link: "player",
          component: <Players />,
        },

        {
          title: "Teams",
          icon: <GroupsIcon />,
          link: "teams",
          component: <Teams />,
        },
        {
          title: "Recruit",
          icon: <ContactMailIcon />,
          link: "recruit",
          component: <MainRecruit />,
        },
        {
          title: "Schedule",
          icon: <DateRangeIcon />,
          link: "schedules",
          component: <ManageSchedules />,
        },
      ]);
    } else {
      list = useMemo(() => [
        {
          title: "Livecorner",
          icon: <DuoIcon />,
          link: "live-corner",
          component: <LiveCorner />,
        },
        {
          title: "Schedules",
          icon: <DateRangeIcon />,
          link: "schedule-user",
          component: <SchedulesUser />,
        },

        {
          title: "Chat",
          icon: <ChatIcon />,
          link: "chat",
          component: <ChatUI />,
        },

        {
          title: "Team",
          icon: <Diversity2Icon />,
          link: "player-view",
          component: <PlayerView />,
        },

        {
          title: "GoLive",
          icon: <LiveTvIcon />,
          link: "go-live",
          component: <LiveSetup />,
        },
      ]);
    }
  }

  const logOutHandler = async () => {
    try {
      await logoutApiCall({ id: user._id }).unwrap();
      dispatch(logout());
      navigate("/auth/login");
    } catch (err) {
      toast(err);
    }
  };

  useEffect(() => {
    if (!user) {
      console.log("nithinra js")
      navigate("/auth/login");
    }
  },[]);

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{ sx: { height: "100vh" } }}
        sx={{ border: "2px solid red" }}
      >
        <DrawerHeader
          sx={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-between",
            // backgroundImage: `url(${banner})`,
            // backgroundSize: "cover",

            backgroundPosition: "center center",
          }}
        >
          <IconButton onClick={() => setOpen(!open)}>
            <MenuOpenTwoToneIcon />
          </IconButton>
        </DrawerHeader>

        <Box sx={{ mx: "auto", mt: 1, mb: 2 }}>
          <Tooltip>
            <Avatar
              onClick={profileOpenHandler}
              src={user?.profilePhoto}
              {...(open && { sx: { width: 100, height: 100 } })}
            />
          </Tooltip>
          <div>
            <Modal
              open={profileOpen}
              onClose={profileCloseHandler}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Profile />
              </Box>
            </Modal>
          </div>
        </Box>

        <Box sx={{ textAlign: "center", mb: 3 }}>
          {open && (
            <Typography
              sx={{ fontWeight: "bold", fontSize: "1.5rem", color: "#a359b0" }}
            >
              {user ? user.name : null}
            </Typography>
          )}
        </Box>

        <Divider />
        <List>
          {list.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{
                display: "block",
                mt: 1,
                mb: 1,
                "&:hover": {
                  backgroundColor: "#6e43a3",
                },
                backgroundColor:
                  location.pathname == `/${item.link}` ? "#6e43a3" : "",
              }}
            >
              {console.log(location.pathname)}
              {console.log(item.link)}
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          <Divider />
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
              onClick={logOutHandler}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>

      <Container
        sx={{
          position: "relative",
          backgroundColor: "rgba(51, 14, 98, 0.4)",
          height: "80vh",
          mt: 14,
        }}
      >
        {/* Rendering components based on routes */}
        <Routes>
          {list.map((item) => (
            <Route key={item?.link} path={item?.link} element={item?.component} />
          ))}
          <Route path={"/stream"} element={<Live />} />
        </Routes>
      </Container>
    </>
  );
};

export default SideBar;
