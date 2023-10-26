import { Routes, Route, useLocation } from "react-router-dom";
import { useMemo } from "react";
import {
  Avatar,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

// custom component
import Login from "../../../screens/user/auth/Login";
import Register from "../../../screens/user/auth/Register";
import ForgotPassword from "../../../screens/user/auth/ForgotPassword";
import RegisterOtp from "../../../screens/user/auth/RegisterOtp";
import ForgotPasswordOtp from "../../../screens/user/auth/ForgotPasswordOtp";
import ResetPassword from "../../../screens/user/auth/ResetPassword";

import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import bgVideo from "../../../../assets/User/login/Login.mp4";
import avatar from "../../../../assets/user/login/logo.jpg";

const Auth = ({ children }) => {
  // Define an array of routes and their corresponding components
  const list = useMemo(() => [
    { title: "login", link: "login", component: <Login /> },
    { title: "register", link: "register", component: <Register /> },
    { title: "login", link: "forgot-password", component: <ForgotPassword /> },
    { title: "login", link: "register-otp", component: <RegisterOtp /> },
    {
      title: "login",
      link: "forgot-password-otp",
      component: <ForgotPasswordOtp />,
    },
    { title: "login", link: "reset-password", component: <ResetPassword /> },
  ]);

  // Access breakpoints from MUI theme
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.down("lg"));
  const md = useMediaQuery(breakpoints.down("md"));
  const sm = useMediaQuery(breakpoints.down("sm"));

  return (
    <>
      <div
        style={{
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>

        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "50%",
            transform: "translate(-50%,-50%)",
            width: lg ? (md ? (sm ? "100%" : "75%") : "50%") : "40%",
            height: lg ? (md ? (sm ? "80%" : "75%") : "70%") : "70%",
            background: "rgba(0,0,0,0.7)",
            boxShadow: 24,
          }}
        >
          <Grid container>
            <Grid item xs={12} sm={12} lg={12}>
              <Box
                sx={{
                  backgroundSize: "cover",
                  height: "50vh",
                  minHeight: "500px",
                }}
              >
                <Box height={35} />
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Box>
                    <Avatar
                      sx={{
                        ml: "35px",
                        mb: "4px",
                        bgcolor: "#ffffff",
                      }}
                      src={avatar}
                    >
                      <VideogameAssetOutlinedIcon />
                    </Avatar>{" "}
                    <Typography component="h1" variant="h4">
                      Kaadan
                    </Typography>
                  </Box>
                </Box>
                <Box height={35} />
                {children}

                {/* Define routes for the components */}
                <Routes>
                  {list.map((item) => (
                    <Route
                      key={item.link}
                      path={item.link}
                      element={item.component}
                    />
                  ))}
                </Routes>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Auth;
