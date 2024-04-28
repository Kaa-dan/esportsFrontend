import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useGetScheduleMutation } from "../../../../application/slice/admin/adminApiSlice";
import Calender from "react-calendar";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useEffect, useState } from "react";
const SchedulesUser = () => {
  const [filter, setFilter] = useState("all");
  const [scheduleData, setScheduleData] = useState([]);
  const [getScheduleApi, { isLoading }] = useGetScheduleMutation();
  const [dateFilter, setDateFilter] = useState(null);

  const getScheduledData = async () => {
    try {
      let response = await getScheduleApi({ filter, dateFilter });
      console.log(response);
      setScheduleData(response.data.data);
    } catch (error) {
      dyncamicToast(error?.message);
    }
  };
  

  useEffect(() => {
    getScheduledData();
  }, [filter, dateFilter]);

  return (
    <>
      <Grid
        sx={{
          position: "relative",
          height: "80vh",
          width: "100%",
          backgroundColor: "#4a148c",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        container
      >
        <Grid item lg={8} sx={{ display: "flex", justifyContent: "center" }}>
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
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
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
                height: "440px",
                overFlowX: "hidden",
              }}
            >
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
                    </ListItem>
                  ))}
                </List>
              )}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default SchedulesUser;
