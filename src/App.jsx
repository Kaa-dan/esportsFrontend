import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./application/routes/routes";
import muiTheme from "./theme"
import { ThemeProvider} from "@mui/material/styles";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <Routes />
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}
