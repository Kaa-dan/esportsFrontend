import {
  useBlockFanMutation,
  useGetFansMutation,
} from "../../../application/slice/admin/adminApiSlice";
import { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Container,
  TableBody,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Pagination from "../../components/user/dashboard/Pagination";
const columns = [
  { id: "avatar", label: "Avatar", minWidth: 100 },
  {
    id: "name",
    label: "Username",
  },
  {
    id: "email",
    label: "Email",
  },
  {
    id: "restrict",
    label: "Restrict",
  },
];

const Fans = () => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterFans, setFilterFans] = useState("all");
  const [query, setQuery] = useState();
  const [data, setData] = useState([]);
  const [loadingState,setLoadingState]=useState("")

  const [blockFanApi, { isLoading: blockLoading }] = useBlockFanMutation();
  const [getUsersApi, { isLoading }] = useGetFansMutation();

  const getData = async () => {
    const responce = await getUsersApi({ query, filterFans, page });
    console.log(responce);
    setData(responce.data.data);
    // }
  };

  const indexOfLastData = page * rowsPerPage;
  const indexOfFirstData = indexOfLastData - rowsPerPage;
  const currentData = data.slice(indexOfFirstData, indexOfLastData);

  const onPageChange = (pageNumber) => {
    setPage(pageNumber);
  };
  const blockHandler = async (email) => {
    try {
      setLoadingState(email)
      const responce = await blockFanApi({ email });
      setLoadingState(null)
      getData();
      
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, [filterFans, page, query]);


  return (
    <>
      <Container sx={{ position: "relative", mt: 10, height: "73vh" }}>
        <Box
          sx={{
            mb: 2,
            mt: 3,

            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box gap={2} sx={{ mt: 3 }}>
            <TextField
              variant="outlined"
              value={query}
              label="Search"
              onChange={(e) => setQuery(e.target.value)}
              style={{ flex: 1 }}
            />
          </Box>

          <Box sx={{ minWidth: 120, mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              {console.log(filterFans)}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filterFans}
                label="Age"
                onChange={(e) => setFilterFans(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="blocked">Blocked</MenuItem>
                <MenuItem value="notBlocked">Non-Blocked</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
        <Paper>
          <TableContainer sx={{ maxHeight: 440 }}>
            {isLoading ? (
              <LinearProgress />
            ) : (
              <Table stickyHeader aria-label="sticky table">
                <>
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell key={column.id}>{column.label}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentData.map((user, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                            <Avatar
                              alt="profile avatar"
                              src={user.profilePhoto}
                            />
                          </TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            {loadingState===user.email  ? (
                              <CircularProgress size={20} />
                            ) : (
                              <Button
                                sx={{
                                  backgroundColor: "#6e43a3",
                                  color: "#ffffff",
                                  borderRadius: "8px",
                                  fontSize: "16px",
                                  "&:hover": {
                                    backgroundColor: "#330e62",
                                  },
                                }}
                                onClick={() => {
                                  blockHandler(user.email);
                                }}
                              >
                                {user?.block ? "Unblock" : "Block"}
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </>
              </Table>
            )}
          </TableContainer>
        </Paper>
      </Container>

      <Box>
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(data.length / rowsPerPage)}
          onPageChange={onPageChange}
        />
      </Box>
    </>
  );
};

export default Fans;
