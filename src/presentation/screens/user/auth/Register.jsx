// importing custom components
import ButtonWrapper from "../../../components/user/form/Button";
import TextFieldWrapper from "../../../components/user/form/Textfield";

// importing mui components
import {
  Grid,
  Typography,
  Container,
  Stack,
  CircularProgress,
  Box,
} from "@mui/material";

// importing from redux store
import { setOtp } from "../../../../application/slice/user/authSlice";
import { setRegisterCredentials } from "../../../../application/slice/user/authSlice";
import { useOtpRegisterMutation } from "../../../../application/slice/user/authApiSlice";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// Initial form state for formik
const INITIAL_FORM_STATE = {
  name: "",
  email: "",
  password: "",
};

// Form validation schema using Yup
const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required("Required")
    .min(5, "Name must be at least 5 characters"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const Register = () => {
  const [otpRegister, { isLoading }] = useOtpRegisterMutation(); // Mutation to generate OTP
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Submit Handler for Registration
  const submitHandler = async (values) => {
    try {
      // Generate OTP and store it in Redux state
      const response = await otpRegister({ email: values.email }).unwrap();
      dispatch(
        setRegisterCredentials({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
      dispatch(setOtp(response.otp));
      toast(response.message);
      // Navigate to the OTP verification page
      navigate("/auth/register-otp");
    } catch (err) {
      toast(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Container>
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={submitHandler}
        >
          <Form>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                <TextFieldWrapper name="name" label="Username" />
              </Grid>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                <TextFieldWrapper name="email" label="Email" />
              </Grid>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                <TextFieldWrapper
                  name="password"
                  label="Password"
                 
                />
              </Grid>
              <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
                {isLoading ? (
                  <CircularProgress size={20} />
                ) : (
                  <ButtonWrapper>Register</ButtonWrapper>
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
                    Already have an account?{" "}
                    <span
                      style={{
                        color: "#beb4fb",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        navigate("/auth/login");
                      }}
                    >
                      Go to Sign in
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

export default Register;
