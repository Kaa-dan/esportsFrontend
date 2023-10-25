import {
  Stack,
  Box,
  Container,
  Paper,
  Button,
  Modal,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Table,
  TableContainer,
  TextField,
  Grid,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import ButtonWrapper from "../../components/user/form/Button";
import TextfieldWrapper from "../../components/user/form/Textfield";
import {
  useRecruitPlayerMutation,
  useGetTeamBasedONVacansyMutation,
} from "../../../application/slice/admin/adminApiSlice";
import GetOngoinRecruit from "../../components/admin/GetOngoinRecruit";
import GetAcceptedRecruit from "../../components/admin/GetAcceptedRecruit";

import { toast } from "react-toastify";

// Initial form state for recruitment
const INITIAL_FORM_STATE = {
  salary: "",
  role: "",
};

// Form validation schema using Yup
const FORM_VALIDATION = Yup.object().shape({
  role: Yup.string()
    .min(3, "role must be at least 3 characters")
    .required("role  is required"),
  salary: Yup.number()
    .typeError("salary must be a number") // Display this error if it's not a number
    .required("salary  is required"),
});

const Recruit = () => {
  // Hooks for responsive design
  const { breakpoints } = useTheme();
  const lg = useMediaQuery(breakpoints.down("lg"));
  const md = useMediaQuery(breakpoints.down("md"));
  const sm = useMediaQuery(breakpoints.down("sm"));

  // Initialize variables for table header based on filter value
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [date, setDate] = useState();
  const [filterValue, setFilterValue] = useState("ongoing");
  const [recruitPlayerApi] = useRecruitPlayerMutation();
  const [query, setQuery] = useState("");
  const [refresh, setRefresh] = useState(false);
  // Function to open the recruitment form modal
  const handleOpen = () => {
    getTeamHandler();
    setOpen(true);
  };

  // Function to close the recruitment form modal
  const handleClose = () => setOpen(false);
  const [getTeamApi, { isLoading }] = useGetTeamBasedONVacansyMutation();
  const [teamValue, setTeamValue] = useState("");

  // Function to get teams
  const getTeamHandler = async () => {
    const responce = await getTeamApi();
    console.log(responce);
    setTeams(responce.data.data);
  };

  // Function to handle recruitment form submission
  const submitHandler = async (value) => {
    try {
      const responce = await recruitPlayerApi({
        date,
        team: teamValue,
        ...value,
      });
      handleClose();
      setRefresh(true);
      console.log(responce);
      toast(responce.error.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {

  // }, [open]);

  return (
    <>
      <Container
        sx={{
          position: "relative",
          mt: 10,
          height: "60vh",
          
        }}
      >
        
          <Grid container  sx={{ justifyContent: "space-between",p:1 }} >
            <Grid item>
              <Button
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
                onClick={handleOpen}
              >
                Send RecruitMent
              </Button>
            </Grid>
            <Grid item>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  >
                    <MenuItem value="ongoing">OnGoing</MenuItem>
                    <MenuItem value="accepted">Accepted</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ flex: 1 }}
                label="Search"
              />
            </Grid>
          </Grid>
        

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
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
            }}
          >
            <Formik
              initialValues={{ ...INITIAL_FORM_STATE }}
              validationSchema={FORM_VALIDATION}
              onSubmit={submitHandler}
            >
              {isLoading ? (
                <LinearProgress
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "#E0E0E0",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#2196F3",
                    },
                  }}
                />
              ) : (
                <Form encType="multipart/form-data">
                  <FormControl fullWidth>
                    <Stack spacing={3}>
                      <InputLabel id="demo-simple-select-label">
                        Select Game
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={teamValue}
                        label="Select"
                        onChange={(event) => {
                          setTeamValue(event.target.value);
                        }}
                      >
                        {teams.map((team) => (
                          <MenuItem key={team._id} value={team._id}>
                            {team.team}
                          </MenuItem>
                        ))}
                      </Select>
                      <TextfieldWrapper name="salary" label="Salary" />
                      <TextfieldWrapper name="role" label="Role" />
                      <label
                        htmlFor="date"
                        style={{ fontWeight: "bold", fontSize: "16px" }}
                      >
                        End Date
                      </label>
                      <input
                        onChange={(event) => setDate(event.target.value)}
                        type="date"
                        id="date"
                        style={{
                          color: "white",
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          fontSize: "20px",
                          backgroundColor: "#330e62",
                        }}
                        required
                      />
                      {isLoading ? (
                        <CircularProgress size={20} />
                      ) : (
                        <ButtonWrapper>Send</ButtonWrapper>
                      )}
                    </Stack>
                  </FormControl>
                </Form>
              )}
            </Formik>
          </Box>
        </Modal>

        {filterValue === "ongoing" ? (
          <GetOngoinRecruit refresh={refresh} query={query} />
        ) : (
          <GetAcceptedRecruit
            setRefresh={setRefresh}
            refresh={refresh}
            query={query}
          />
        )}
      </Container>

    </>
  );
};

export default Recruit;
