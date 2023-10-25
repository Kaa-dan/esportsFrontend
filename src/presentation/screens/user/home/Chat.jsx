import {
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Grid,
  Paper,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Container } from "@mui/system";
import { useState, useEffect, useRef, useMemo } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
const socket = io("http://localhost:5000");
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useGetMessageMutation } from "../../../../application/slice/user/userApiSlice";

const ChatUI = () => {
  const messagesEndRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const [getMessageApi, { isLoading }] = useGetMessageMutation();
  const [message, setMessage] = useState("");
  const [serverMessage, setServerMessage] = useState([]);
  const [messages, setMessages] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const HandleSocketMessages = (msg) => {
    console.log(msg, "from handle");
    setMessages((message) => [...message, msg]);
  };

  const getMessageHandler = async () => {
    const response = await getMessageApi();
    console.log(response.data.data);
    setServerMessage(response.data.data);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        socket.emit("sendImage", { imageData, userId: user._id });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    socket.on("message", HandleSocketMessages);
    scrollToBottom();
    return () => {
      socket.off("message", HandleSocketMessages);
    };
  }, [messages]);

  useEffect(() => {
    getMessageHandler();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user._id && message) {
      socket.emit("sendMessage", { message, userId: user._id });
      setMessage("");
    }
  };
  console.log(messages);
  return (
    <Box
      sx={{
        position: "absolute",
        height: "90%",
        width: "95%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgba(110, 67, 163, 0.4)",
        borderRadius: "8px",
        mt: 5,
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
        <>
          {scrollToBottom()}
          <Box
            sx={{
              overflow: "auto",

              p: 2,
              "&::-webkit-scrollbar": {
                width: "12px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#888",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: "#555",
              },
            }}
          >
         
{[...serverMessage].reverse().map((message, index) => (
    <Box
        sx={{
            display: "flex",
            justifyContent:
                user._id !== message.user._id ? "flex-start" : "flex-end",
            mb: 2,
        }}
        key={index}
    >
        <Box
            sx={{
                display: "flex",
                flexDirection:
                    user._id !== message.user._id ? "row" : "row-reverse",
                alignItems: "center",
            }}
        >
            <>
                {" "}
                <Avatar
                    sx={{
                        bgcolor:
                            user._id !== message.user._id
                                ? "primary.main"
                                : "secondary.main",
                    }}
                    src={`${message.user.profilePhoto}`}
                />
                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        ml: user._id !== message.user._id ? 1 : 0,
                        mr: user._id !== message.user._id ? 0 : 1,
                        backgroundColor:
                            user._id !== message.user._id ? "#631976" : "#a44fbb",
                        borderRadius:
                            user._id !== message.user._id
                                ? "20px 20px 20px 5px"
                                : "20px 20px 5px 20px",
                    }}
                >
                    <Typography variant="body1">{message.message}</Typography>
                </Paper>
            </>
        </Box>
    </Box>
))}

            {messages.map((message, index) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    user._id !== message.userId ? "flex-start" : "flex-end",
                  mb: 2,
                }}
                key={index}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection:
                      user._id !== message.userId ? "row" : "row-reverse",
                    alignItems: "center",
                  }}
                >
                  <>
                    {" "}
                    <Avatar
                      sx={{
                        bgcolor:
                          user._id !== message.userId
                            ? "primary.main"
                            : "secondary.main",
                      }}
                      src={`${user.profilePhoto}`}
                    />
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        ml: user._id !== message.userId ? 1 : 0,
                        mr: user._id !== message.userId ? 0 : 1,
                        backgroundColor:
                          user._id !== message.userId ? "#631976" : "#a44fbb",
                        borderRadius:
                          user._id !== message.userId
                            ? "20px 20px 20px 5px"
                            : "20px 20px 5px 20px",
                      }}
                    >
                      <Typography variant="body1">{message.message}</Typography>
                    </Paper>
                  </>
                </Box>
              </Box>
            ))}
            <div ref={messagesEndRef} />
          </Box>
          <Box sx={{ p: 2, backgroundColor: "background.default" }}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={9}>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Type your message"
                  variant="outlined"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  sx={{ backgroundColor: "#6e43a3", borderRadius: "8px" }}
                />
              </Grid>

              <Grid item xs={1}>
                <label htmlFor="upload-image">
                  <InsertPhotoIcon
                    sx={{
                      fontSize: 30,
                      color: "#6e43a3",
                      cursor: "pointer",
                    }}
                  />
                </label>
                <input
                  type="file"
                  id="upload-image"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  endIcon={<SendIcon />}
                  onClick={handleSubmit}
                  sx={{
                    backgroundColor: "#6e43a3",
                    color: "#ffffff",
                    borderRadius: "8px",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#330e62",
                    },
                  }}
                >
                  Send
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ChatUI;
