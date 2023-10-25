import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./application/root.state.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId="565916750992-psqcm9ivnef6f0ihob2h9k1fajurloce.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>

);
