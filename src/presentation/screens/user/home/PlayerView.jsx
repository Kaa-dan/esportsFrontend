import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Stack,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Pagination,
  PaginationItem,
  CircularProgress,
} from "@mui/material";

import dyncamicToast from "../../../components/user/form/DynamicToast";

import { useEffect, useState } from "react";

import {
  useGetPlayerMutation,
  useGetTeamMutation,
} from "../../../../application/slice/admin/adminApiSlice";

const PlayerView = () => {
  const [getPlayersApi, { isLoading }] = useGetPlayerMutation();

  const [playerData, setPlayerData] = useState([]);

  const [query, setQuery] = useState("");

  const [filterValue, setFilterValue] = useState("all");

  const [page, setPage] = useState();

  const [rowsPerPage, setRowsPerPage] = useState(6);

  const [team, setTeam] = useState([]);

  const [getTeamApi] = useGetTeamMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getTeamHandler = async () => {
    try {
      const responce = await getTeamApi();

      setTeam(responce.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPlayerHandler = async (page) => {
    try {
      const responce = await getPlayersApi({
        query,
        filterValue,
        page,
        rowsPerPage,
      });

      console.log(responce);

      setPlayerData(responce.data.data);
      setTotalPages(responce.data.totalPages);
    } catch (error) {
      dyncamicToast(error?.message);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getPlayerHandler(currentPage);
    getTeamHandler();
  }, [query, filterValue]);

  return (
    <>
      <>
        {" "}
        <div>
          <Box
            sx={{
              mb: 2,
              mt: 3,
            }}
          >
            <Grid container spacing={3}>
              <Grid item>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Team</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                    >
                      <MenuItem key="all" value="all">
                        all
                      </MenuItem>
                      {team.map((value) => (
                        <MenuItem key={value._id} value={value._id}>
                          {value.team}
                        </MenuItem>
                      ))}
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
          </Box>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "58vh",
              }}
            >
              <CircularProgress style={{ color: "#6e43a3" }} />
            </div>
          ) : (
            <>
              <Grid sx={{ height: "60vh" }} spacing={2} container>
                {playerData.map((data) => (
                  <Grid item>
                    <Card sx={{ display: "flex", width: 350, height: 200 }}>
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <Stack spacing={1}>
                          <Typography component="div" variant="h5">
                            {data?.teamData[0]?.team}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            {data?.userData[0]?.name}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            role: {data?.role}
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div"
                          >
                            salary:{data?.salary}$
                          </Typography>
                        </Stack>
                      </CardContent>

                      <CardMedia
                        component="img"
                        sx={{ width: 120 }}
                        image={data?.userData[0]?.profilePhoto}
                      />
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </div>
        <Box>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, page) => handlePageChange(page)}
            shape="rounded"
            size="large"
            color="primary"
            renderItem={(item) => (
              <PaginationItem
                component="li"
                {...item}
                onClick={() => handlePageChange(item.page)}
              />
            )}
          />
        </Box>
      </>
    </>
  );
};

export default PlayerView;
