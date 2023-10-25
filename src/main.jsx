import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import store from "./application/root.state.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </Provider>
);
