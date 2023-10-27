import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  Skeleton,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetHighlightMutation } from "../../../../application/slice/admin/adminApiSlice";

import { useGetStreamsMutation } from "../../../../application/slice/user/userApiSlice";
import { Box, Stack } from "@mui/system";
const LiveCorner = () => {
  const navigate = useNavigate();
  const [getStreamApi, { isLoading }] = useGetStreamsMutation();
  const [streams, setStreams] = useState([]);

  const getStreamHandler = async () => {
    const responce = await getStreamApi();

    setStreams(responce.data.data);
  };

  useEffect(() => {
    getStreamHandler();
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
          {" "}
          <Stack spacing={3} sx={{ m: 4 }}>
            <Grid spacing={3} container>
              {streams.length <= 0 ? (
                <div
                  style={{
                    color: "red",
                    fontSize: "24px",
                    textAlign: "center",
                    height:"80vh",
                    display:"flex",
                    alignItems:"center",
                  
                  }}
                >
                  <h2>Opps..! No one is live right now</h2> 
                </div>
              ) : null}
              {streams.map((str) =>
                isLoading ? (
                  <Grid key={str._id} lg={4} item>
                    <Skeleton variant="rectangular" width={380} height={240} />
                  </Grid>
                ) : (
                  <Grid lg={4} item key={str._id}>
                    <Card sx={{ maxWidth: 345, width: 380, height: 240 }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="180"
                          image={str.thumbnail}
                          onClick={() => navigate(`/stream?id=${str.playerId}`)}
                        />
                        <CardContent>
                          <Typography
                            component="span"
                            sx={{ fontSize: "12px" }}
                          >
                            {str?.title}
                          </Typography>
                          <Typography
                            sx={{
                              borderRadius: "5px",
                            }}
                            gutterBottom
                          >
                            {str?.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                )
              )}
            </Grid>
            <Divider />
          </Stack>
        </>
      )}
    </>
  );
};

export default LiveCorner;
