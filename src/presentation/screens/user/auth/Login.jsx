// importing custom components
import TextFieldWrapper from "../../../components/user/form/Textfield";
import ButtonWrapper from "../../../components/user/form/Button";
import GoogleButton from "../../../components/user/auth/GoogleButton";
// importing mui components
import {
  Grid,
  Typography,
  Container,
  Stack,
  CircularProgress,
} from "@mui/material";
// importing from redux store
import { useLoginMutation } from "../../../../application/slice/user/authApiSlice";
import { setCredentials } from "../../../../application/slice/user/authSlice";

import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// Initial form state for formik
const INITIAL_FORM_STATE = {
  email: "",
  password: "",
};

// Form validation schema using Yup
const FORM_VALIDATION = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,
      "Password must contain at least one u letter and one special character"
    ),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginApi, { isLoading }] = useLoginMutation();
  const { user } = useSelector((state) => state.auth);

  // Submit Handler for Login
  const submitHandler = async (values) => {
    try {
      const res = await loginApi({
        email: values.email,
        password: values.password,
      }).unwrap();

      dispatch(setCredentials({ ...res.data }));

      if (res.data.role === "admin") {
        navigate("/fans");
      } else if (res.data.role === "fan") {
        navigate("/live-corner");
      } else {
        navigate("/live-corner");
      }
      toast(message);
    } catch (err) {
      console.log(err);
      // toast(err?.data?.error);
    }
  };

  return (
    <Container>
      {/* Using formik  */}
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={submitHandler}
      >
        <Form>
          <Grid container spacing={1}>
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
              <TextFieldWrapper name="email" label="Email" />
            </Grid>
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
              <TextFieldWrapper name="password" label="Password" />
            </Grid>
            <Grid item xs={12} sx={{ ml: "3rem", mr: "3rem" }}>
              <Stack direction="row" spacing={2}>
                <Typography
                  variant="body1"
                  component="span"
                  onClick={() => {
                    navigate("/auth/forgot-password");
                  }}
                  style={{
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                >
                  Forgot password?
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
              {isLoading ? (
                <CircularProgress size={20} />
              ) : (
                <ButtonWrapper>Sign In</ButtonWrapper>
              )}
            </Grid>
            <Grid item xs={12} sx={{ ml: "3em", mr: "3em" }}>
              <GoogleButton />
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

export default Login;
