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
import VideoPlayer from "../../../components/user/dashboard/VideoPlayer";
import CustomPagination from "../../../components/user/dashboard/Pagination";
const LiveCorner = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [highlightData, setHighlightData] = useState([]);
  const navigate = useNavigate();
  const [getStreamApi, { isLoading }] = useGetStreamsMutation();
  const [streams, setStreams] = useState([]);
  const [getHighlightApi, { isLoading: highlightLoading }] =
    useGetHighlightMutation();
  const [query, setQuery] = useState("");
  const getStreamHandler = async () => {
    const responce = await getStreamApi();

    setStreams(responce.data.data);
  };
  const getHighlightHandler = async () => {
    try {
      const responce = await getHighlightApi({ query });
      console.log(responce);
      setHighlightData(responce.data.data);
    } catch (error) {
      dyncamicToast(error?.message);
    }
  };

  const indexOfLastData = page * rowsPerPage;
  const indexOfFirstData = indexOfLastData - rowsPerPage;
  const currentData = highlightData.slice(indexOfFirstData, indexOfLastData);
  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  useEffect(() => {
    getStreamHandler();
    getHighlightHandler();
  }, []);

  return (
    <>
      {isLoading || highlightLoading ? (
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
                <h1
                  style={{
                    color: "red",
                    fontSize: "24px",
                    textAlign: "center",
                  }}
                >
                  No one is live right now
                </h1>
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
            <Grid container spacing={3} direction="row">
              {currentData.map((data) => {
                return (
                  <Grid lg={4} key={data._id} item>
                    <Card sx={{ maxWidth: 345, height: "35vh" }}>
                      <VideoPlayer videoUrl={data?.video} />
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        <span
                          sx={{
                            fontWeight: "bold",
                            color: "#333",
                          }}
                        >
                          {data?.discription}
                        </span>
                        <span
                          sx={{
                            color: "#666",
                          }}
                        >
                          {new Date(data?.timestamp).toLocaleDateString()}
                        </span>
                      </Stack>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Stack>
          <CustomPagination
            currentPage={page}
            totalPages={Math.ceil(highlightData.length / rowsPerPage)}
            onPageChange={onPageChange}
          />
        </>
      )}
    </>
  );
};

export default LiveCorner;
