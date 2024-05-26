import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  LinearProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import ProfileSecond from "./profile";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import { useGetProfileMutation } from "../../../../application/slice/user/userApiSlice";
import { useEffect, useState } from "react";
const nithin = "nithin"
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#330e62",
  border: "7px solid #6e43a3",
  boxShadow: 24,
  p: 7,
  borderRadius: "10px",
  color: "white",
};
const AccountProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [profileData, setProfileData] = useState(null);
  const [open, setOpen] = useState(false);
  const [getProfileApi, { isLoading }] = useGetProfileMutation();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const getProfileHandler = async () => {
    const responce = await getProfileApi({ id: user._id });
    setProfileData(responce.data.data);
  };

  useEffect(() => {
    getProfileHandler();
  }, []);
  return (
    <Card sx={{ background: "transparent" }}>
      {isLoading ? (
        // <CircularProgress color="inherit" size={50} />
        // <LinearProgress  />
        <LinearProgress
          sx={{
            height: 8, // Set the height of the progress bar
            borderRadius: 4, // Set border-radius to make it rounded
            backgroundColor: "#E0E0E0", // Set background color of the progress bar container
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#2196F3", // Set the color of the progress bar itself
            },
          }}
        />
      ) : (
        <>
          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Avatar
                src={profileData?.profilePhoto}
                sx={{
                  height: 80,
                  mb: 2,
                  width: 80,
                }}
              />

              <Typography
                gutterBottom
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
                variant="h5"
              >
                {profileData?.name}{" "}
                <EditTwoToneIcon
                  sx={{ ml: 1, color: "green" }}
                  onClick={handleOpen}
                />
              </Typography>

              <CardActions>
                <div>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <ProfileSecond handleClose={handleClose} />
                    </Box>
                  </Modal>
                </div>
              </CardActions>
            </Box>
          </CardContent>
          <Divider />

          <CardContent>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography color="text.secondary" variant="body2">
                {profileData?.email}
              </Typography>
              <Typography color="text.secondary" variant="body2">
                Role : {profileData?.role}
              </Typography>
            </Box>
          </CardContent>
        </>
      )}
    </Card>
  );
};
export default AccountProfile;
