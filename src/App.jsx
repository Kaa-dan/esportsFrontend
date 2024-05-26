import { CssBaseline } from "@mui/material";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./application/routes/routes";
import {darkTheme} from "./theme";
import { ThemeProvider } from "@mui/material/styles";


export default function App() {


  

  return (
    <>
      <HashRouter hashType="noslash">
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Routes />
          <ToastContainer />
        </ThemeProvider>
      </HashRouter>
    </>
  );
}
