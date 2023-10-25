import { Toolbar, Typography, AppBar } from "@mui/material";
import { styled } from "@mui/material/styles";

// mui icons
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 240;

// Style the AppBar component, making it adjust its width when the drawer is open or closed
const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const TopBar = ({ open, setOpen }) => {
  // Function to handle opening the drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <StyledAppBar  open={open} sx={{position:"fixed"}}>
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          {open ? null : <Typography sx={{ flexGrow: 1 }}></Typography>}
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default TopBar;
