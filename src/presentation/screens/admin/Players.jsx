import { Container } from "@mui/system";
import {
  useGetPlayerMutation,
  useGetTeamMutation,
  useDemotePlayerMutation,
} from "../../../application/slice/admin/adminApiSlice";
import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  PaginationItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Pagination,
  Button,
} from "@mui/material";
import dyncamicToast from "../../components/user/form/DynamicToast";

const head = ["No", "Name", "Team", "Role", "Salary", ""];
const Players = () => {
  const [getPlayerApi, { isLoading: pageLoading }] = useGetPlayerMutation();

  const [playerData, setPlayerData] = useState([]);

  const [filterValue, setFilterValue] = useState("all");

  const [team, setTeam] = useState([]);

  const [query, setQuery] = useState("");

  const [getTeamApi] = useGetTeamMutation();

  const [currentPage, setCurrentPage] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(6);

  const [totalPages, setTotalPages] = useState(1);

  const [demotePlayerApi] = useDemotePlayerMutation();

  const getTeamHandler = async () => {
    try {
      const responce = await getTeamApi();

      setTeam(responce.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const demotePlayerHandler = async (playerId) => {
    try {
      const responce = await demotePlayerApi({ playerId });
      getPlayerHandler();
    } catch (error) {
      dyncamicToast(error?.message);
    }
  };
  const getPlayerHandler = async (page) => {
    try {
      const responce = await getPlayerApi({
        query,
        filterValue,
        page,
        rowsPerPage,
      });
      console.log(responce);
      setTotalPages(responce.data.totalPages);
      setPlayerData(responce.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPlayerHandler(currentPage);
    getTeamHandler();
  }, [query, filterValue]);

  return (
    <>
      <Container sx={{ position: "relative", mt: 13, height: "73vh" }}>
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
                    {playerData.map((team, index) => {
                      return (
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{team?.userData[0]?.name}</TableCell>
                          <TableCell>{team?.teamData[0]?.team}</TableCell>
                          <TableCell>{team?.role}</TableCell>
                          <TableCell>{team?.salary} $</TableCell>
                          <TableCell>
                            <Button
                              sx={{
                                color: "white",
                                backgroundColor: "#4a148c",
                                borderRadius: "10px",
                                padding: "10px",
                              }}
                              onClick={() => {
                                demotePlayerHandler(team?._id);
                              }}
                            >
                              Demote
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
  );
};

export default Players;
