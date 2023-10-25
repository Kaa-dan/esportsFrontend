import { GoogleLogin } from "@react-oauth/google";
import { useGoogleAuthMutation } from "../../../../application/slice/user/authApiSlice"; // Redux Toolkit Query mutation
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../../application/slice/user/authSlice"; // Redux action for setting user credentials
import { CircularProgress } from "@mui/material";

function GoogleButton() {
  const [GoogleAuthApi, { isLoading }] = useGoogleAuthMutation(); // Mutation function for Google OAuth
  const navigate = useNavigate(); // React Router's navigate function
  const dispatch = useDispatch(); // Redux dispatch function

  // Success handler for Google OAuth login
  const successHandler = async (credentialResponse) => {
    try {
      // GoogleAuth mutation

      const response = await GoogleAuthApi(credentialResponse).unwrap();

      console.log(response.data);
      // If the response contains an email (successful login), proceed
      if (response.data.email) {
        //  storing user data in Redux
        dispatch(setCredentials({ ...response.data }));

        // Display a success toast message
        toast(response.message);
        if (response.data.role === "admin") {
          // Navigate to the home page
          navigate("/fans");
        } else if (response.data.role === "fan") {
          navigate("/live-corner");
        } else {
          navigate("/live-corner");
        }
      }
    } catch (error) {
      // Display an error
      toast(error.message);
    }
  };

  return (
    <div className="App" style={{ paddingTop: 8 }}>
      {isLoading ? (
        <CircularProgress size={20} />
      ) : (
        <GoogleLogin
          width={"100%"}
          onSuccess={successHandler}
          onError={() => {
            toast("Login Failed");
          }}
          theme="filled_black"
          text="continue_with"
        />
      )}
    </div>
  );
}

export default GoogleButton;
