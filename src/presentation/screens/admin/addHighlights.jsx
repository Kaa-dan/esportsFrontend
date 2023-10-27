import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  LinearProgress,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {
  useAddHighlighMutation,
  useGetHighlightMutation,
  useDeleteHighlightMutation,
} from "../../../application/slice/admin/adminApiSlice";
import { useEffect, useState } from "react";
import VideoPlayer from "../../components/user/dashboard/VideoPlayer";
import dyncamicToast from "../../components/user/form/DynamicToast";
import CustomPagination from "../../components/user/dashboard/Pagination";
import { useSelector } from "react-redux";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const head = ["Highlight Video", "Discription", "Delete"];

const AddHighlights = () => {
  const { user } = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [open, setOpen] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState("");
  const [videoUrl, setVideoUrl] = useState(null);
  const [discription, setDiscription] = useState("");
  const [addHighlightsApi, { isLoading }] = useAddHighlighMutation();
  const [getHighlightApi, { isLoading: pageLoading }] =
    useGetHighlightMutation();
  const [highlightData, setHighlightData] = useState([]);
  const [deleteHighlightApi, { isLoading: deleteLoading }] =
    useDeleteHighlightMutation();
  const addHighlightsHandler = async () => {
    try {
      if (!discription || !uploadingVideo) {
        dyncamicToast("dicription and video file required");
      } else {
        const formData = new FormData();
        formData.append("discription", discription);
        formData.append("video", uploadingVideo);
        dyncamicToast("wait some time");
        const responce = await addHighlightsApi(formData);
        console.log(responce);
        setOpen(false);
        getHighlightHandler();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //delete highlight handler
  const deleteHighlightHandler = async (id) => {
    try {
      const responce = await deleteHighlightApi({ id });
      getHighlightHandler();
      dyncamicToast(responce?.data?.message);
    } catch (error) {
      dyncamicToast(error.message);
    }
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
    getHighlightHandler();
  }, [query]);
  useEffect(() => {
    if (!user) {
      console.log("nithinra js");
      navigate("/auth/login");
    }
  }, [user]);
  return (
    <>
      <Container sx={{ position: "relative", mt: 10, height: "73vh" }}>
        <Box
          sx={{
            // position: "sticky",
            top: 50,
            left: 0,
            right: 0,
            zIndex: 1000,

            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ minWidth: 120, mt: 3 }}>
            <Button
              sx={{
                height: "40px",
                margin: "20px",
                color: "white",
                backgroundColor: "#4a148c",
                borderRadius: "10px",
                padding: "10px",
              }}
              onClick={() => setOpen(true)}
            >
              Add Higlight
            </Button>
          </Box>
          <Box gap={2} sx={{ mt: 3 }}>
            <TextField
              variant="outlined"
              value={query}
              label="Search"
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1 }}
            />
          </Box>
        </Box>
        <Divider />

        {/* <Box sx={{height:"500px"}}> */}
        <Paper>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              {pageLoading ? (
                <LinearProgress />
              ) : (
                <>
                  <TableHead>
                    <TableRow>
                      {head.map((value) => (
                        <TableCell key={value}>{value}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentData.map((team, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell align="center">
                            <Box sx={{ height: "10vh", width: "20vh" }}>
                              <VideoPlayer videoUrl={team?.video} />
                            </Box>
                          </TableCell>
                          <TableCell>{team?.discription}</TableCell>
                          <TableCell align="center">
                            <Button
                              size="small"
                              startIcon={<DeleteTwoToneIcon />} // This places the icon at the start of the button
                              onClick={() => {
                                deleteHighlightHandler(team._id);
                              }}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </>
              )}
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      <Box>
        <CustomPagination
          currentPage={page}
          totalPages={Math.ceil(highlightData.length / rowsPerPage)}
          onPageChange={onPageChange}
        />
      </Box>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2} direction="row">
            <Stack spacing={3}>
              <TextField
                value={discription}
                onChange={(e) => setDiscription(e.target.value)}
                label="discription"
                multiline
                rows={2}
              />
              <Button variant="outlined" component="label">
                Upload File
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    setUploadingVideo(e.target.files[0]);
                    const url = URL.createObjectURL(e.target.files[0]);
                    setVideoUrl(url);
                  }}
                />
              </Button>
              {isLoading ? (
                <CircularProgress size={20} />
              ) : (
                <Button
                  sx={{
                    height: "40px",
                    margin: "20px",
                    color: "white",
                    backgroundColor: "#4a148c",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                  onClick={addHighlightsHandler}
                >
                  Save
                </Button>
              )}
            </Stack>
            <Box sx={{ width: "200px", height: "100%" }}>
              <VideoPlayer videoUrl={videoUrl} />
            </Box>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default AddHighlights;
