// importing custom component
import AuthComponent from "../../../components/user/auth/Auth";
import TextFieldWrapper from "../../../components/user/form/Textfield";
import ButtonWrapper from "../../../components/user/form/Button";

// importing mui components
import {
  Grid,
  Typography,
  Container,
  Stack,
  CircularProgress,
} from "@mui/material";

// importing from the redux store
import { useRegisterMutation } from "../../../../application/slice/user/authApiSlice";
import { useOtpRegisterMutation } from "../../../../application/slice/user/authApiSlice";
import { setOtp } from "../../../../application/slice/user/authSlice";
import { setCredentials } from "../../../../application/slice/user/authSlice";
import { clearRegisterDetails } from "../../../../application/slice/user/authSlice";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
// Initial form state for formik
const INITIAL_FORM_STATE = {
  otp: "",
};

// Form validation schema using Yup
const FORM_VALIDATION = Yup.object().shape({
  otp: Yup.string()
    .required("Required")
    .matches(/^\d{4}$/, "OTP must be a 4-digit number"),
});

const RegisterOtp = () => {
  const navigate = useNavigate(); // Hook for navigation
  const dispatch = useDispatch(); // Redux dispatch function
  const [otpRegister, { isLoading }] = useOtpRegisterMutation(); // Mutation to generate OTP
  const [register, { isLoading: isLoadingRegister }] = useRegisterMutation(); // Mutation for user registration
  const { user } = useSelector((state) => state.auth); //Existing User info from Redux state
  const { tempUser } = useSelector((state) => state.auth); //Registering User data from Redux state
  const otpValues = useSelector((state) => state.auth.otp); // OTP value from Redux state
  const [timer, setTimer] = useState(10); //for Otp timer
  useEffect(() => {
    //Setting  Otp timer
    let newTimer = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(newTimer);
      }
    }, 1000);
    if (user) {
      // If the user is already logged in, navigate to the home page
      navigate("/");
    }
    return () => {
      clearInterval(newTimer);
    };
  }, [navigate, user, timer]);

  // Resend OTP handler
  const resendHandler = async () => {
    try {
      const responce = await otpRegister({ email: tempUser.email }).unwrap(); // Generate and resend OTP
      dispatch(setOtp(responce.otp)); // Update the OTP in Redux state
      setTimer(10);
      toast(responce.message);
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  // Submit Handler for OTP verification and registration
  const submitHandler = async (values) => {
    try {
      console.log(otpValues);

      if (otpValues === Number(values.otp)) {
        const responce = await register({
          name: tempUser.name,
          email: tempUser.email,
          password: tempUser.password,
        });

        dispatch(setCredentials({ ...responce.data.data })); // Update user credentials in Redux state
        dispatch(clearRegisterDetails()); // Clear registration details from Redux state
        toast(responce.data.message);
        navigate("/"); // Navigate to the home page
      } else {
        toast("OTP did not match");
      }
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  return (
    <Container>
      {/* Using formik */}
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        <Form>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
              <TextFieldWrapper name="otp" label="OTP" />
            </Grid>
            <Grid item xs={12} sx={{ ml: "3rem", mr: "3rem" }}>
              <Stack direction="row" spacing={2}>
                {isLoading ? null : timer !== 0 ? (
                  <Typography
                    variant="body1"
                    component="span"
                    style={{
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Resend OTP in 00:{timer}
                  </Typography>
                ) : (
                  <Typography
                    variant="body1"
                    component="span"
                    onClick={resendHandler}
                    style={{
                      marginTop: "10px",
                      cursor: "pointer",
                    }}
                  >
                    Resend OTP
                  </Typography>
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ ml: "5em", mr: "5em" }}>
              {isLoading ? (
                <CircularProgress size={20} />
              ) : isLoadingRegister ? (
                <CircularProgress size={20} />
              ) : (
                <ButtonWrapper>Confirm</ButtonWrapper>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                ml: "3em",
                mr: "3em",
              }}
            >
              <Stack direction="row" spacing={2}>
                <Typography
                  variant="body1"
                  component="span"
                  style={{
                    marginTop: "10px",
                  }}
                >
                  Not registered yet?{" "}
                  <span
                    style={{
                      color: "#beb4fb",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate("/auth/register");
                    }}
                  >
                    Create an Account
                  </span>
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
};

export default RegisterOtp;
