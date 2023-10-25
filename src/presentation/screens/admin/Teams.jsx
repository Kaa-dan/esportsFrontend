import {
  Stack,
  Box,
  Container,
  TableContainer,
  Paper,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  Avatar,
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Modal,
  Typography,
  Divider,
  CardActions,
  Unstable_Grid2,
  CardMedia,
  CircularProgress,
  useTheme,
  useMediaQuery,
  LinearProgress,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import { useCreateTeamMutation } from "../../../application/slice/admin/adminApiSlice";
import {
  useGetTeamMutation,
  useEditTeamMutation,
  useDeleteTeamMutation,
} from "../../../application/slice/admin/adminApiSlice";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import ButtonWrapper from "../../components/user/form/Button";
import TextfieldWrapper from "../../components/user/form/Textfield";
import { toast } from "react-toastify";
import CustomPagination from "../../components/user/dashboard/Pagination";
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
const FORM_VALIDATION = Yup.object().shape({
  team: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Team name is required"),
  strength: Yup.number()
    .typeError("Strength must be a number")
    .positive("Strength must be a positive number")
    .integer("Strength must be an integer")
    .required("Strength is required"),
});

const EDIT_FORM_VALIDATION = Yup.object().shape({
  team: Yup.string().min(3, "Name must be at least 3 characters"),
  strength: Yup.number()
    .typeError("Strength must be a number")
    .positive("Strength must be a positive number")
    .integer("Strength must be an integer"), //
});

const Teams = () => {
  const { breakpoints } = useTheme();
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const lg = useMediaQuery(breakpoints.down("lg"));
  const md = useMediaQuery(breakpoints.down("md"));
  const sm = useMediaQuery(breakpoints.down("sm"));
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [teams, setTeams] = useState([]);
  const [image, setImageFile] = useState("");
  const [editImage, setEditImageFile] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editTeamApi, { isLoading: editTeamLoading }] = useEditTeamMutation();
  const [createTeamApi, { isLoading }] = useCreateTeamMutation();
  const [deleteTeamApi, { isLoading: deleteTeamLoading }] =
    useDeleteTeamMutation();
  const [getTeamApi, { isLoading: pageLoading }] = useGetTeamMutation();
  const getTeamHandler = async () => {
    const responce = await getTeamApi({ query });
    setTeams(responce.data.data);
  };

  const INITIAL_FORM_STATE = {
    team: openEdit?.team,
    strength: openEdit?.strength,
  };
  const deleteTeamHandler = async (id) => {
    try {
      const responce = await deleteTeamApi({ id });
      console.log(responce);
      getTeamHandler();
    } catch (error) {
      toast(error.message);
    }
  };
  const editTeamHandler = async (value) => {
    try {
      console.log(value);

      const formData = new FormData();
      formData.append("team", value.team);
      formData.append("strength", value.strength);
      formData.append("teamPhoto", editImage);
      formData.append("id", openEdit._id);
      console.log(formData);
      const responce = await editTeamApi(formData);
      console.log(responce);
      setOpenEdit(false);
      getTeamHandler();
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getTeamHandler();
  }, []);
  const indexOfLastData = page * rowsPerPage;
  const indexOfFirstData = indexOfLastData - rowsPerPage;
  const currentData = teams.slice(indexOfFirstData, indexOfLastData);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const head = ["Avatar", "Team-Name", "Strength", "", " "];
  const submitHandler = async (value) => {
    try {
      const formData = new FormData();
      formData.append("team", value.team);
      formData.append("strength", value.strength);
      formData.append("teamPhoto", image);

      const responce = await createTeamApi(formData);
      handleClose();
      getTeamHandler();

      console.log(responce);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTeamHandler();
  }, [query]);
  return (
    <>
      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={{ ...INITIAL_FORM_STATE }}
            validationSchema={EDIT_FORM_VALIDATION}
            onSubmit={editTeamHandler}
          >
            <Form encType="multipart/form-data">
              <Card>
                <CardHeader subheader="Edit team details" />

                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ m: -1.5 }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={12}>
                        <TextfieldWrapper name="team" />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextfieldWrapper name="strength" />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <input
                          required
                          hidden
                          id="team"
                          name="teamPhoto"
                          type="file"
                          onChange={(event) => {
                            setEditImageFile(event.currentTarget.files[0]);
                          }}
                        />

                        <Button variant="outlined">
                          <label htmlFor="team">Upload image</label>
                        </Button>
                        {/* <Card sx={{ maxWidth: 345 }}>
                          <CardMedia
                            sx={{ height: 140 }}
                             src={openEdit?.teamPhoto}
                            title="Profile photo"
                          />
                        
                        </Card> */}
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  {editTeamLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <ButtonWrapper>Save details</ButtonWrapper>
                  )}
                </CardActions>
              </Card>
            </Form>
          </Formik>
        </Box>
      </Modal>

      <Container sx={{position:"relative",mt:13 ,height:"73vh"}} >
        <Box>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Formik
                initialValues={{ ...INITIAL_FORM_STATE }}
                validationSchema={FORM_VALIDATION}
                onSubmit={submitHandler}
              >
                <Form encType="multipart/form-data">
                  <Card>
                    <CardHeader subheader="Enter Team Details" />

                    <CardContent sx={{ pt: 0 }}>
                      <Box sx={{ m: -1.5 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={12}>
                            <TextfieldWrapper name="team" label="Team-name" />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <TextfieldWrapper
                              name="strength"
                              label="Strength"
                            />
                          </Grid>
                          <Grid item xs={12} md={12}>
                            <input
                              required
                              hidden
                              id="team"
                              name="teamPhoto"
                              type="file"
                              onChange={(event) => {
                                setImageFile(event.currentTarget.files[0]);
                              }}
                            />

                            <Button variant="outlined">
                              <label htmlFor="team">Upload image</label>
                            </Button>
                            <Card sx={{ maxWidth: 345 }}></Card>
                          </Grid>
                        </Grid>
                      </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: "flex-end" }}>
                      {isLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <ButtonWrapper>Save details</ButtonWrapper>
                      )}
                    </CardActions>
                  </Card>
                </Form>
              </Formik>
            </Box>
          </Modal>
          <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <Button
                sx={{
                  backgroundColor: "#6e43a3",
                  color: "#ffffff",
                  borderRadius: "8px",
                  padding: "12px 24px",
                  fontSize: "16px",
                  marginBottom: 3,
                  "&:hover": {
                    backgroundColor: "#330e62",
                  },
                }}
                onClick={handleOpen}
              >
                Create Team
              </Button>
            </Grid>

            <Grid item>
              <Box>
                <TextField
                  variant="outlined"
                  value={query}
                  label="Search"
                  onChange={(e) => setQuery(e.target.value)}
                  style={{ flex: 1 }} // Adjust the width of the TextField
                />
                {/* <Button
                    variant="contained"
                    color="primary"
                    onClick={getTeamHandler}
                    style={{ height: "56px" }}
                  >
                    Search
                  </Button> */}
              </Box>
            </Grid>
          </Grid>
          
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
                              <TableCell>
                                <Avatar
                                  alt="profile avatar"
                                  src={team.teamPhoto}
                                />
                              </TableCell>
                              <TableCell>{team.team}</TableCell>
                              <TableCell>{team.strength}</TableCell>
                              <TableCell>
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
                                  onClick={() => setOpenEdit(team)}
                                >
                                  Edit
                                </Button>
                              </TableCell>
                              <TableCell sx={{ ml: 0 }}>
                                {" "}
                                {deleteTeamLoading ? (
                                  <CircularProgress />
                                ) : (
                                  <Button
                                    size="small"
                                    startIcon={<DeleteTwoToneIcon />} // This places the icon at the start of the button
                                    onClick={() => {
                                      deleteTeamHandler(team._id);
                                    }}
                                  >
                                    Delete
                                  </Button>
                                )}
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
       
        </Box>
      </Container>
      <Box >
        <CustomPagination
        
          currentPage={page}
          totalPages={Math.ceil(teams.length / rowsPerPage)}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
};

export default Teams;
