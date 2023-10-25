import { Box, CssBaseline } from "@mui/material";
import TopBar from "../../../components/user/dashboard/TopBar";
import SideBar from "../../../components/user/dashboard/SideBar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box sx={{ ml:open?"20vh":"8vh" }}>
        {/* <CssBaseline /> */}
        <TopBar {...{ open, setOpen }} />
        <SideBar {...{ open, setOpen }} />
      </Box>
    </>
  );
};

export default Home;
