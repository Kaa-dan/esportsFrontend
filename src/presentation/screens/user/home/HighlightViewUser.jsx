import { Card, CircularProgress, Grid, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetHighlightMutation } from "../../../../application/slice/admin/adminApiSlice";
import CustomPagination from "../../../components/user/dashboard/Pagination";
import dyncamicToast from "../../../components/user/form/DynamicToast";
import VideoPlayer from "../../../components/user/dashboard/VideoPlayer";

const HighlightViewUser = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [highlightData, setHighlightData] = useState([]);
  const [getHighlightApi, { isLoading: highlightLoading }] =
    useGetHighlightMutation();
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
    getHighlightHandler();
  }, []);

  return (
    <>
      {highlightLoading ? (
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              height: "500px",
            }}
          >
            <h1>Highlights</h1>
            <Grid container spacing={3} direction="row">
              {currentData.map((data) => {
                return (
                  <Grid lg={4} key={data._id} item>
                    <Card sx={{ maxWidth: 345, height: "30vh" }}>
                      <VideoPlayer h="25" videoUrl={data?.video} />
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

            <CustomPagination
            
              currentPage={page}
              totalPages={Math.ceil(highlightData.length / rowsPerPage)}
              onPageChange={onPageChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default HighlightViewUser;
