// Import the API slice created using Redux Toolkit
import { apiSlice } from "./apiSlice";

// Define the base URL for user-related API endpoints
const USERS_URL = "/api/user";

// Create a user API slice by injecting endpoints
export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a login mutation endpoint
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    // Define a logout mutation endpoint
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
        body: data,
      }),
    }),
    // Define a register mutation endpoint
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    // Define an OTP registration mutation endpoint
    otpRegister: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/sentOtp`,
        method: "POST",
        body: data,
      }),
    }),
    // Define an OTP for forgot password mutation endpoint
    otpForgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/sentOtpForgotpassword`,
        method: "POST",
        body: data,
      }),
    }),
    // Define an update password mutation endpoint
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/updatePassword`,
        method: "PATCH",
        body: data,
      }),
    }),
    //Google Authentication for login and register
    googleAuth: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/google-auth`,
        method: "POST",
        body: data,
      }),
    }),

  }),
});

// Export hooks for each mutation endpoint for use in components
export const {
  useLoginMutation, // Hook for the login mutation
  useLogoutMutation, // Hook for the logout mutation
  useRegisterMutation, // Hook for the register mutation
  useOtpRegisterMutation, // Hook for the OTP registration mutation
  useOtpForgotPasswordMutation, // Hook for the OTP for forgot password mutation
  useUpdatePasswordMutation, // Hook for the update password mutation
  useGoogleAuthMutation, //Hook for google login and register

} = authApiSlice;
