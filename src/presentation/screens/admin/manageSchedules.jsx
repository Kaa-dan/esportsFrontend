import {
  Modal,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
  Typography,
  ListItem,
  List,
  ListItemText,
  Container,
  LinearProgress,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import dyncamicToast from "../../components/user/form/DynamicToast";
import React, { useEffect, useState } from "react";
import Calender from "react-calendar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import "../../../Calender.css";

import {
  useCreateScheduleMutation,
  useGetScheduleMutation,
  useDeleteSchedulesMutation,
  useGetTeamMutation,
  useEditScheduleMutation,
} from "../../../application/slice/admin/adminApiSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const manageSchedules = () => {
  const [dateFilter, setDateFilter] = useState(null);
  const [open, setOpen] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);
  const [scheduleType, setSheduleType] = useState("");
  const [time, setTime] = useState(null);
  const [date, setDate] = useState("");
  const [getScheduleApi] = useGetScheduleMutation();
  const [discription, setDiscription] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [editModal, setEditModal] = useState(false);
  const [teamBackend, setTeamBackend] = useState(null);
  const [filter, setFilter] = useState("all");
  const [editSchedule, setEditSchedule] = useState({});
  const [editScheduleApi] = useEditScheduleMutation();
  const [createScheduleApi, { isLoading }] = useCreateScheduleMutation();
  const [deleteScheduleApi, { isLoading: deleteLoading }] =
    useDeleteSchedulesMutation();
  const [getTeamApi, { isLoading: getFilterLoading }] = useGetTeamMutation();
  const [teams, setTeams] = useState([]);
  const createSchedulHandler = async (req, res) => {
    try {
      if (!scheduleType || !time || !date || !discription) {
        alert("Please fill all required fields");
      } else {
        const response = await createScheduleApi({
          scheduleType,
          time: time.$d,
          date,
          discription,
          teamBackend,
        });
        console.log(response);
        handleClose();
        dyncamicToast(response.message);
        getScheduledData();
      }
    } catch (error) {
      dyncamicToast(error?.message);
    }
  };
  const getTeamHandler = async () => {
    try {
      const responce = await getTeamApi();
      setTeams(responce.data.data);
    } catch (error) {
      dyncamicToast(error?.message);
    }
  };
  const getScheduledData = async () => {
    try {
      let response = await getScheduleApi({ filter, dateFilter });
      console.log(response);
      setScheduleData(response.data.data);
    } catch (error) {
      dyncamicToast(error?.message);
    }
  };

  const deleteScheduleHandler = async (ID) => {
    try {
      console.log(ID);
      const res = await deleteScheduleApi({ ID });
      console.log(res);
      getScheduledData();
    } catch (error) {
      console.log(error.message);
    }
  };
  //handler for editing
  const editHandler = async () => {
    try {
      const responce = await editScheduleApi(editSchedule);
      dyncamicToast(responce.data.message);
      getScheduledData();
      setEditModal(false);
    } catch (error) {
      dyncamicToast(error.message);
    }
  };
  useEffect(() => {
    getScheduledData();
    getTeamHandler();
  }, [filter, dateFilter]);

  return (
    <>
      <Container sx={{ position: "relative", mt: 10, height: "73vh" }}>
        <div>
          <Button
            sx={{
              height: "40px",
              margin: "20px",
              color: "white",
              backgroundColor: "#4a148c",
              borderRadius: "10px",
              padding: "10px",
            }}
            onClick={handleOpen}
          >
            Add Schedules
          </Button>

          <Grid
            sx={{
              position: "relative",
              height: "60vh",
              width: "72vw",
              backgroundColor: "#4a148c",

              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            container
          >
            <Grid
              item
              lg={8}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Calender
                tileContent={({ activeStartDate, date, view }) => {
                  const contents = scheduleData.map((value, index) => {
                    if (
                      new Date(value.date).toLocaleDateString() ===
                      new Date(date).toLocaleDateString()
                    ) {
                      return <span key={index}>✅</span>;
                    }
                    return null;
                  });

                  return <>{contents}</>;
                }}
                onChange={(v) => setDateFilter(v)}
              />
            </Grid>
            <Grid sx={{ height: "450px" }} item lg={4}>
              <Box
                sx={{
                  backgroundColor: "#330e62",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Stack
                  spacing={4}
                  direction="row"
                  sx={{ justifyContent: "space-between" }}
                >
                  <Box>
                    <Typography
                      component="h1"
                      sx={{
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "primary.main",
                      }}
                    >
                      <AutorenewIcon
                        onClick={() => {
                          setFilter("all");
                          setDateFilter(null);
                        }}
                        sx={{ color: "white" }}
                      />
                      Schedules
                    </Typography>
                  </Box>

                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      >
                        <MenuItem value="all">all</MenuItem>
                        <MenuItem value="tournament">Tournament</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
              </Box>
              <Stack>
                <Stack
                  sx={{
                    overflowY: "scroll",
                    height: "364px",
                    overFlowX: "hidden",
                  }}
                >
                  {" "}
                  {getFilterLoading ? (
                    <LinearProgress />
                  ) : (
                    <List>
                      {scheduleData.map((data) => (
                        <ListItem
                          key={data._id}
                          sx={{ backgroundColor: "#6e43a3", mt: 2 }}
                        >
                          <ListItemText
                            secondary={data.discription}
                            primary={data.scheduleType}
                          />
                          <ListItemText
                            secondary={new Date(data.date).toLocaleDateString()}
                            primary={new Date(data.time).toLocaleTimeString()}
                          />

                          <Stack direction="row" spacing={2}>
                            <EditIcon
                              onClick={() => {
                                setEditModal(true);
                                setEditSchedule(data);
                              }}
                            />

                            {deleteLoading ? (
                              <CircularProgress size={20} />
                            ) : (
                              <DeleteIcon
                                onClick={() => {
                                  deleteScheduleHandler(data._id);
                                }}
                              />
                            )}
                          </Stack>
                        </ListItem>
                      ))}
                    </List>
                  )}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </div>
      </Container>
      {/* <div
        style={{
          position: "relative",
          display: "flex",
          backgroundColor: "rgba(51, 14, 98, 0.4)",
          height: "80vh",
          width: "80vw",
          margin: "40px 40px",
          flexDirection: "column",
        }}
      > */}

      {/* modal  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid spacing={2} container>
            <Grid md={8} item>
              <Calender value={date} onChange={setDate} minDate={new Date()} />
            </Grid>
            <Grid md={4} item>
              <Stack spacing={2}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={scheduleType}
                      label="Age"
                      onChange={(e) => setSheduleType(e.target.value)}
                    >
                      <MenuItem value="tournament">Tournament</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {scheduleType === "tournament" ? (
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Team
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={teamBackend}
                        label="Age"
                        onChange={(e) => setTeamBackend(e.target.value)}
                      >
                        {teams.map((item) => (
                          <MenuItem value={item._id}>{item?.team}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ) : null}

                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  value={date}
                  label="date"
                />
                <TextField
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  label="Discription"
                  multiline
                  rows={2}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={time}
                    onChange={(e) => setTime(e)}
                    label="time"
                  />
                </LocalizationProvider>
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
                    onClick={createSchedulHandler}
                  >
                    Save
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      {/* second modeal */}
      <Modal
        open={editModal}
        onClose={() => setEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid spacing={2} container>
            <Grid md={8} item>
              <Calender
                value={editSchedule.date}
                onChange={(value) => {
                  setEditSchedule({
                    ...editSchedule,
                    date: value,
                  });
                }}
                minDate={new Date()}
              />
            </Grid>

            <Grid md={4} item>
              <Stack spacing={2}>
                <Box sx={{ minWidth: 120 }}>
                  {/* <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={editSchedule.scheduleType}
                      label="Age"
                      onChange={(e) =>
                        setEditSchedule({
                          ...editSchedule,
                          scheduleType: e.target.value,
                        })
                      }
                    >
                      <MenuItem value="tournament">Tournament</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                  </FormControl> */}
                </Box>
                {editSchedule?.scheduleType === "tournament" ? (
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Team
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={editSchedule?.team}
                        label="Age"
                        onChange={(e) =>
                          setEditSchedule({
                            ...editSchedule,
                            team: e.target.value,
                          })
                        }
                      >
                        {teams.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item?.team}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                ) : null}

                <TextField
                  InputProps={{
                    readOnly: true,
                  }}
                  value={editSchedule.date}
                  label="date"
                />
                <TextField
                  value={editSchedule.discription}
                  onChange={(e) => {
                    console.log(editSchedule);
                    setEditSchedule({
                      ...editSchedule,
                      discription: e.target.value,
                    });
                  }}
                  label="Discription"
                  multiline
                  rows={2}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    // value={editSchedule.time}
                    value={new Date(editSchedule.time).toLocaleTimeString()}
                    onChange={(newTime) => {
                      console.log(editSchedule?.time);
                      setEditSchedule({ ...editSchedule, time: newTime });
                    }}
                    label="time"
                  />
                </LocalizationProvider>
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
                    onClick={editHandler}
                  >
                    Save
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default manageSchedules;
