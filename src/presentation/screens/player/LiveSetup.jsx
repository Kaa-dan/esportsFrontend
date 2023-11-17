import {
  Button,
  Stack,
  TextField,
  Paper,
  Grid,
  LinearProgress,
} from "@mui/material";
import { useState } from "react";
import { useCreateLiveMutation } from "../../../application/slice/player/playerApiSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/system";
import Cropper from "react-easy-crop";
// import backGroundVideo from "../../../assets/user/dashboard/livecornerVideo.mp4";
const LiveSetup = () => {
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(false);

  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [title, setTitle] = useState(null);
  const [description, setDiscription] = useState(null);
  const [createLive] = useCreateLiveMutation();
  const startLiveHandler = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("playerId", user._id);
    formData.append("title", title);
    formData.append("description", description);
    if (croppedImage) {
      formData.append("thumbnail", croppedImage, "thumbnail.jpg");
    }
    try {
      const response = await createLive(formData);
      console.log(response);
      if (response) {
        navigate(`/stream?id=${user._id}`);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    const canvas = document.createElement("canvas");
    const image = document.createElement("img");
    image.src = thumbnailPreview;
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    canvas.toBlob((blob) => {
      setCroppedImage(blob);
    });
  };
  return (
    <>
      {/* <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
         marginLeft:-24
         
        }}
      >
        <source src={backGroundVideo} type="video/mp4" />
      </video> */}
      <Grid
        sx={{ mt: 14, justifyContent: "center", alignItems: "center" }}
        spacing={3}
        container
      >
        <Grid sx={{ mt: 4 }} item lg={4}>
          <Stack spacing={2}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              name="title"
              label="Title"
              fullWidth
              sx={{ backgroundColor: "rgba(51, 14, 98, 0.5)" }}
            />
            <TextField
              name="description"
              label="Description"
              multiline
              rows={3}
              onChange={(e) => setDiscription(e.target.value)}
              fullWidth
              sx={{ backgroundColor: "rgba(51, 14, 98, 0.5)" }}
            />
            <input
              type="file"
              id="thumbnail"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setThumbnailPreview(reader.result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              style={{ display: "none" }}
            />
            <Button
              variant="outlined"
              color="primary"
              component="label"
              htmlFor="thumbnail"
            >
              Upload thumpnail
            </Button>
            {loading ? (
              <>
                <LinearProgress />
              </>
            ) : (
              <Button
                onClick={startLiveHandler}
                variant="contained"
                color="primary"
              >
                Start Live
              </Button>
            )}
          </Stack>
        </Grid>
        <Grid item lg={4}>
          {thumbnailPreview && (
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <h4>Thumbnail Preview:</h4>
              <div
                style={{
                  position: "relative",
                  width: "270px",
                  height: "200px",
                }}
              >
                <Cropper
                  style={{ backgroundColor: "rgba(51, 14, 98, 0.5)" }}
                  image={thumbnailPreview}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onCropComplete={handleCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
            </div>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default LiveSetup;
