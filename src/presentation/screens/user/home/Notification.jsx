import React, { useEffect, useState } from "react";
import Carousel from "react-elastic-carousel";
import styled from "styled-components";
import { useGetOnGoingrecruitmentUserMutation } from "../../../../application/slice/admin/adminApiSlice";
import {
  useAcceptRecruitmentMutation,
  useGetSchedulesMutation,
} from "../../../../application/slice/user/userApiSlice";
import dyncamicToast from "../../../components/user/form/DynamicToast";
import {
  Box,
  Stack,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Modal,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 220px;
  width: 90%;
  // background-color: #00008b;
  color: #fff;
  // margin: 0 15px;
  font-size: 4em;
`;
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const Notification = () => {
  const [open, setOpen] = useState(false);
  const [onGoingRecruitApi, { isLoading }] =
    useGetOnGoingrecruitmentUserMutation();
  const [onGoingRecruitData, setOnGoingRecruitData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [notifictionData, setNotificationData] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [getScheduleApi] = useGetSchedulesMutation();

  const [acceptRecruitmentApi, { isLoading: acceptRecruitmentLoading }] =
    useAcceptRecruitmentMutation();

  const onGoingRecruitHandler = async () => {
    try {
      const responce = await onGoingRecruitApi();
      setOnGoingRecruitData(responce.data.data);
    } catch (error) {
      dyncamicToast(error?.message);
    }
  };

  const handleUpload = async () => {
    console.log("nithin");
    console.log(open);
    try {
      // selectedVideo &&

      if (open._id) {
        const formData = new FormData();
        // formData.append("file", selectedVideo);
        // formData.append("recruitMentID", open._id);
        // formData.append("user_id", user._id);
        // formData.append("teamId", open.team._id);

        const responce = await acceptRecruitmentApi({
          recruitMentID: open._id,
          user_id: user._id,
          teamId: open.team._id,
        });

        setOpen(false);
        onGoingRecruitHandler();
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const getScheduleHandler = async () => {
    try {
      const responce = await getScheduleApi();
      console.log(responce);
      setNotificationData(responce.data.data);
    } catch (error) {
      dyncamicToast(error.message);
    }
  };

  useEffect(() => {
    getScheduleHandler();
    onGoingRecruitHandler();
  }, []);
  return (
    <>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress style={{ color: "#6e43a3" }} />
        </div>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Notification</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "70vh",
            }}
          >
            <Carousel breakPoints={breakPoints}>
              {onGoingRecruitData.map((recruits) => (
                <Item key={recruits._id}>
                  <Card sx={{ display: "flex", width: 350, height: 250 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Stack spacing={1}>
                        <Typography component="div" variant="h5">
                          {recruits?.team?.team}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          Role:{recruits?.role}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          salary: {recruits?.salary}$
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          component="div"
                        >
                          End date: {new Date(recruits?.endDate).toDateString()}
                        </Typography>
                        <div>
                          {recruits?.acceptedBy.includes(user._id) ? (
                            <Button
                              style={{
                                backgroundColor: "#487e4c",
                                color: "white",
                              }}
                            >
                              Accepted
                            </Button>
                          ) : (
                            <Button
                              sx={{
                                backgroundColor: "#6e43a3",
                                color: "#ffffff",
                                borderRadius: "8px",
                                fontSize: "16px",
                                "&:hover": {
                                  backgroundColor: "#330e62",
                                },
                                mb: 0,
                              }}
                              onClick={() => setOpen(recruits)}
                            >
                              Accept
                            </Button>
                          )}
                        </div>
                      </Stack>
                    </CardContent>

                    <CardMedia
                      component="img"
                      sx={{ width: 120 }}
                      image={recruits?.team?.teamPhoto}
                    />
                  </Card>
                </Item>
              ))}
            </Carousel>
          </div>
        </>
      )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={3}>
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Accept recruitment?
            </Typography> */}

            {/* <FormControl>
              <input
                type="file"
                id="vde"
                accept="video/*"
                onChange={(e) => setSelectedVideo(e.target.files[0])}
                style={{ display: "none" }}
              />
              <Button
                variant="outlined"
                color="primary"
                component="label"
                htmlFor="vde"
              >
                Upload File
              </Button>
            </FormControl> */}
          </Stack>
          {acceptRecruitmentLoading ? (
            <CircularProgress size={20} />
          ) : (
            <Button
              sx={{ width: "100%" }}
              variant="outlined"
              onClick={() => {
                handleUpload();
              }}
            >
              Accept recruitment
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Notification;
