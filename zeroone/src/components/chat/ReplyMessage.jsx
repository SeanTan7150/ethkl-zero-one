import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  Button,
  IconButton,
} from "@mui/material";

export default function ReplyMessage({
  replyMessage = "Message 1",
  message = "Reply 1",
}) {
  return (
    <Box
      style={{
        minWidth: "200px",
        maxWidth: "600px",
        alignSelf: "start",
      }}
    >
      <Typography
        style={{
          textAlign: "start",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Replied to
      </Typography>
      <Box
        style={{
          borderLeft: "2px solid #000",
          paddingLeft: "1rem",
        }}
      >
        <Paper
          style={{
            padding: "15px 25px",
            marginBottom: 20,
            minWidth: "200px",
            maxWidth: "inherit",
            alignSelf: "end",
            borderRadius: "50px",
            backgroundColor: "#ECE6F0",
          }}
        >
          <Typography
            variant="body1"
            style={{
              textAlign: "start",
            }}
          >
            {replyMessage}
          </Typography>
        </Paper>
      </Box>
      <Paper
        style={{
          minWidth: "200px",
          padding: "15px 25px",
          backgroundColor: "#333",
          color: "white",
          maxWidth: "600px",
          alignSelf: "start",
          borderRadius: "50px",
        }}
      >
        <Typography
          variant="body1"
          style={{
            textAlign: "start",
          }}
        >
          {message}
        </Typography>
      </Paper>
    </Box>
  );
}
