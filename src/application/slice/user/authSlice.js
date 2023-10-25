import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  tempUser: localStorage.getItem("tempUser")
    ? JSON.parse(localStorage.getItem("tempUser"))
    : null,
  otp: localStorage.getItem("otp") ? Number(localStorage.getItem("otp")) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setRegisterCredentials: (state, action) => {
      state.tempUser = action.payload;
      localStorage.setItem("tempUser", JSON.stringify(action.payload));
    },
    setOtp: (state, action) => {
      state.otp = action.payload;
      localStorage.setItem("otp", action.payload);
    },
    clearRegisterDetails: (state, action) => {
      state.otp = null;
      state.tempUser = null;
      localStorage.removeItem("otp");
      localStorage.removeItem("tempUser");
    },
  },
});

export const {
  setCredentials,
  logout,
  setRegisterCredentials,
  setOtp,
  clearRegisterDetails,
} = authSlice.actions;

export default authSlice.reducer;
