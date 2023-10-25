

import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // divider: "#00a0b2",
    text: {
      // primary: '#33eaff',
    },
    background: {
      // default: '#330e62',
      paper: "#330e62",
    },
  },
  props: {},
});

export default darkTheme;
