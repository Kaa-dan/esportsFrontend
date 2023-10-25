import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/user/authSlice.js";
import { apiSlice } from "./slice/user/apiSlice.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    // [adminApiSlice.reducerPath] : adminApiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
