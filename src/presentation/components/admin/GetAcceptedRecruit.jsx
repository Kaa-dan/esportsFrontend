import {
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Button,
  CircularProgress,
  LinearProgress,
  Modal,
  Box,
} from "@mui/material";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import VideoPlayer from "../user/dashboard/VideoPlayer";
import { useEffect, useState } from "react";
import {
  useGetAcceptedRecruitmentMutation,
  useCreatePlayerMutation,
} from "../../../application/slice/admin/adminApiSlice";
import CustomPagination from "../user/dashboard/Pagination";

// Styling for the modal dialog
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#330e62",
  border: "7px solid #6e43a3",
  boxShadow: 24,
  p: 7,
  borderRadius: "10px",
};
const Head = ["No", "Name", "Team", "   ", "End Date", "Video", "", " "];
const Recruit = ({ query, refresh, setRefresh }) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [createPlayerApi, { isLoading: createPlayerLoading }] =
    useCreatePlayerMutation();
  const [tableData, setTableData] = useState([]);
  const [
    getAcceptedRecruitmentApi,
    { isLoading: getAcceptedRecruitmentLoading },
  ] = useGetAcceptedRecruitmentMutation();

  // Function to get accepted recruitment data
  const getAcceptedRecruitmentHandler = async () => {
    const responce = await getAcceptedRecruitmentApi({ query });
    console.log(responce);
    setTableData(responce.data.data);
  };

  // Function to create a player from recruitment
  const createPlayerHandler = async (
    userId,
    role,
    salary,
    teamId,
    AcceptRecruitId
  ) => {
    console.log(userId);
    const response = await createPlayerApi({
      userId,
      role,
      salary,
      teamId,
      AcceptRecruitId,
    });

    setRefresh(!refresh);
  };

  // Use effect to get ongoing recruitment data on component mount
  useEffect(() => {
    getAcceptedRecruitmentHandler();
  }, [query, refresh]);

  const indexOfLastData = page * rowsPerPage;
  const indexOfFirstData = indexOfLastData - rowsPerPage;
  const currentData = tableData.slice(indexOfFirstData, indexOfLastData);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {Head.map((column) => (
                  <TableCell key={column}>{column}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            {getAcceptedRecruitmentLoading ? (
              <LinearProgress />
            ) : (
              <>
                <TableBody>
                  {currentData.map((loopData, index) => {
                    console.log(loopData);
                    return (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{loopData?.userData[0]?.name}</TableCell>

                        <TableCell>{loopData?.teamData[0]?.team}</TableCell>
                        <TableCell>{loopData?.recruitId?.role}</TableCell>
                        <TableCell>
                          {new Date(
                            loopData?.recruitData[0]?.updatedAt
                          ).toDateString()}
                        </TableCell>
                        <TableCell>
                          {/* <a href={loopData?.video}> */}
                          <Button
                            onClick={() => setOpen(loopData?.video)}
                            size="small"
                            startIcon={<NotStartedIcon />}
                          >
                            View Gameplay
                          </Button>
                          {/* </a> */}
                          {/* <VideoPlayer videoUrl={loopData?.video} /> */}
                        </TableCell>

                        <TableCell>
                          {createPlayerLoading ? (
                            <CircularProgress size={20} />
                          ) : (
                            <Button
                              sx={{
                                backgroundColor: "#6e43a3", // Change to your desired background color
                                color: "#ffffff", // Change to your desired text color
                                borderRadius: "8px", // Rounded corners
                                padding: "12px 24px", // Padding
                                fontSize: "16px", // Text size
                                "&:hover": {
                                  backgroundColor: "#330e62", // Change to the hover background color
                                },
                              }}
                              onClick={() => {
                                createPlayerHandler(
                                  loopData?.userData[0]?._id,
                                  loopData?.recruitData[0]?.role,
                                  loopData?.recruitData[0]?.salary,
                                  loopData?.teamData[0]._id,
                                  loopData._id
                                );
                              }}
                            >
                              Accept
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <VideoPlayer videoUrl={open} />
                  </Box>
                </Modal>
              </>
            )}
          </Table>
        </TableContainer>
      </Paper>
      <Box sx={{ position: "absolute", ml: 60, mt: 45 }}>
        <CustomPagination
          currentPage={page}
          totalPages={Math.ceil(tableData.length / rowsPerPage)}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
};

export default Recruit;
