// Importing custom components
import AuthComponent from "../../../components/user/auth/Auth";
import ButtonWrapper from "../../../components/user/form/Button";
import TextFieldWrapper from "../../../components/user/form/Textfield";

// Importing mui components
import { Box, Grid, Typography, Container, Stack, CircularProgress } from "@mui/material";

// Importing form redux store
import { useOtpForgotPasswordMutation } from "../../../../application/slice/user/authApiSlice";
import { setRegisterCredentials } from "../../../../application/slice/user/authSlice";
import { setOtp } from "../../../../application/slice/user/authSlice";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// Initial form state for formik
const INITIAL_FORM_STATE = {
  email: "",
};

// Form validation schema using Yup
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = () => {
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Hook for navigation
  const [otpForgotPassword, {isLoading}] = useOtpForgotPasswordMutation(); // Mutation for sending OTP
  // Submit Handler for sending OTP
  const submitHandler = async (values) => {
    try {
      const email = values.email;
      const response = await otpForgotPassword({ email }).unwrap(); // Send OTP request
      console.log(response);
      dispatch(setOtp(response.otp)); // Update the OTP in Redux state
      dispatch(setRegisterCredentials({ ...response.data })); // Update user credentials in Redux state
      toast(response.message);
      navigate("/auth/forgot-password-otp"); // Navigate to the OTP verification page
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  return (
    <>
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
                <TextFieldWrapper label="Email" name="email" />
              </Grid>

              <Grid item xs={12} sx={{ ml: "3rem", mr: "3rem" }}></Grid>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                {isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <ButtonWrapper>Sent OTP</ButtonWrapper>
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
    </>
  );
};

export default ForgotPassword;
