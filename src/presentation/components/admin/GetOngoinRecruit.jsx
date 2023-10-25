import {
  Stack,
  Box,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Button,
  Modal,
  FormControl,
  CircularProgress,
  LinearProgress,
  Container,
  Avatar,
} from "@mui/material";
import * as Yup from "yup";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import ButtonWrapper from "../user/form/Button";
import TextfieldWrapper from "../user/form/Textfield";
import {
  useUpdateRecruitsMutation,
  useDeleteRecruitsMutation,
  useOnGoingRecruitMutation,
} from "../../../application/slice/admin/adminApiSlice";
import CustomPagination from "../user/dashboard/Pagination";

// Styling for the modal dialog
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
};

// Form validation schema for editing
const EDIT_FORM_VALIDATION = Yup.object().shape({
  role: Yup.string().min(3, "Name must be at least 3 characters"),
  salary: Yup.number().typeError("Strength must be a number"), // Display this error if it's not a number
});

const Head = ["Team", "Role", "Salary", "End Date", "", " "];
const Recruit = ({ query, refresh }) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [editRecruit, setEditRecruit] = useState(false);

  // Initial form state for editing recruitment
  const EDIT_INITIAL_FORM_STATE = {
    salary: editRecruit?.salary,
    role: editRecruit?.role,
  };
  // Mutation hooks for API calls
  const [updateRecruitApi, { isLoading: updatRecruitLoading }] =
    useUpdateRecruitsMutation();

  const [editDate, setEditDate] = useState();
  const [tableData, setTableData] = useState([]);
  const [deleteRecruitApi, { isLoading: deleteRecruitLoading }] =
    useDeleteRecruitsMutation();

  // Function to handle recruitment edit submission
  const editRecruitSubmitHandler = async (value) => {
    const responce = await updateRecruitApi({
      ...value,
      editDate,
      id: editRecruit._id,
    });
    setEditRecruit(false);
    getOngoingRecruitHandler();
  };

  // Mutation hooks for API calls
  const [onGoingRecruitApi, { isLoading: onGoingRecruitLoading }] =
    useOnGoingRecruitMutation();

  // Function to handle recruitment deletion
  const deleteRecruitHandler = async (id) => {
    try {
      const responce = await deleteRecruitApi({ id });
      getOngoingRecruitHandler();
    } catch (error) {
      console.log(error.message);
    }
  };

  // Function to get ongoing recruitment data
  const getOngoingRecruitHandler = async () => {
    try {
      const responce = await onGoingRecruitApi({ query });
      console.log(responce);
      setTableData(responce.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOngoingRecruitHandler();
  }, [query, refresh]);

  const indexOfLastData = page * rowsPerPage;
  const indexOfFirstData = indexOfLastData - rowsPerPage;
  const currentData = tableData.slice(indexOfFirstData, indexOfLastData);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <Paper sx={{ height: "inherit" }}>
        {onGoingRecruitLoading ? (
          <LinearProgress />
        ) : (
          <>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {Head.map((column) => (
                      <TableCell key={column}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((loopData, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          {" "}
                          <Avatar
                            alt="User Photo"
                            src={loopData?.teamData[0].teamPhoto}
                          />
                          {loopData?.teamData[0]?.team}
                        </TableCell>
                        <TableCell>{loopData?.role}</TableCell>
                        <TableCell>{loopData?.salary} $</TableCell>
                        <TableCell>
                          {new Date(loopData?.endDate).toDateString()}
                        </TableCell>

                        <TableCell>
                          <Button
                            onClick={() => setEditRecruit(loopData)}
                            sx={{
                              backgroundColor: "#6e43a3",
                              color: "#ffffff",
                              borderRadius: "8px",
                              padding: "12px 24px",
                              fontSize: "16px",
                              "&:hover": {
                                backgroundColor: "#330e62",
                              },
                            }}
                          >
                            Edit
                          </Button>
                        </TableCell>

                        <TableCell>
                          {deleteRecruitLoading ? (
                            <CircularProgress />
                          ) : (
                            <Button
                              onClick={() => {
                                deleteRecruitHandler(loopData._id);
                              }}
                              size="small"
                              startIcon={<DeleteTwoToneIcon />} //
                            >
                              Delete
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Paper>
      <Box sx={{ position: "fixed", mt: 2 }}>
        <CustomPagination
          currentPage={page}
          totalPages={Math.ceil(tableData.length / rowsPerPage)}
          onPageChange={onPageChange}
        />
      </Box>
      <Modal
        open={editRecruit}
        onClose={() => setEditRecruit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={{ ...EDIT_INITIAL_FORM_STATE }}
            validationSchema={EDIT_FORM_VALIDATION}
            onSubmit={editRecruitSubmitHandler}
          >
            <Form encType="multipart/form-data">
              <FormControl fullWidth>
                <Stack spacing={3}>
                  <TextfieldWrapper name="salary" />
                  <TextfieldWrapper name="role" />
                  <label
                    htmlFor="date"
                    style={{ fontWeight: "bold", fontSize: "16px" }}
                  >
                    End Date
                  </label>
                  <input
                    onChange={(event) => setEditDate(event.target.value)}
                    type="date"
                    id="date"
                    style={{
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      fontSize: "16px",
                      backgroundColor: "#6e43a3",
                    }}
                  />
                  {updatRecruitLoading ? (
                    <LinearProgress />
                  ) : (
                    <ButtonWrapper>Send</ButtonWrapper>
                  )}
                </Stack>
              </FormControl>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Recruit;
