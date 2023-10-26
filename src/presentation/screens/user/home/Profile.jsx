import AccountProfileDetails from "../../../components/user/dashboard/profile2";
import profilebg from "../../../../assets/user/profile/profilebg.gif";
import { Box, Container, Stack, Unstable_Grid2 as Grid } from "@mui/material";

const Account = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        backgroundSize: "cover",
        height: "50vh",

        background: `url(${profilebg})`,
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <AccountProfileDetails />

          {/* <AccountProfile /> */}
        </Stack>
      </Container>
    </Box>
  );
};
export default Account;
