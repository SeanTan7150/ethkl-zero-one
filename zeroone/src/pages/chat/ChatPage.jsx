import React from "react";
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
import {
  Search,
  Verified,
  ChatBubbleOutline,
  //   SendIcon,
} from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { SenderMessage, ReplyMessage } from "../../components";

export default function ChatPage() {
  const [message, setMessage] = React.useState("");
  const [activeContact, setActiveContact] = React.useState(0);

  const onChangeActiveContact = (index) => {
    setActiveContact(index);
    console.log(activeContact);
  };
  const onSendMessage = () => {
    console.log(message);
    setMessage("");
    // Send message logic here
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        backgroundColor: "#f0f2f5",
        alignItems: "stretch",
      }}
    >
      {/* Left Sidebar */}
      <Paper
        style={{
          minWidth: 450,
          overflowY: "auto",
          borderRight: "1px solid #e0e0e0",
          padding: "2rem 0rem",
          //   height: "100%",
        }}
      >
        <TextField
          //   fullWidth
          style={{
            width: 300,
          }}
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          //   style={{ margin: "10px 0" }}
        />
        {/* Contact Panel */}
        <List>
          {[...Array(7)].map((_, index) => (
            <ListItem
              className={`
                list-contact
                ${
                  activeContact === index
                    ? "active-contact"
                    : "non-active-contact"
                }`}
              onClick={() => {
                // setActiveContact(index);
                // console.log(activeContact);
                onChangeActiveContact(index);
                // console.log(index);
              }}
              key={index}
              style={{
                marginBottom: "1rem",
                // backgroundColor: `${
                //   activeContact === index ? "#E8DEF8" : "none"
                // }`,
              }}
            >
              <ListItemAvatar>
                <Avatar src="/path-to-avatar.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="John Doe"
                secondary="lorem ipsum meta"
                primaryTypographyProps={{ style: { fontWeight: "bold" } }}
              />
              <Typography variant="caption" style={{ marginLeft: "auto" }}>
                Yesterday
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <AppBar
          position="static"
          color="default"
          elevation={0}
          style={{
            backgroundColor: "#fff",
            padding: "10px 10px",
          }}
        >
          <Toolbar>
            <Avatar src="/path-to-avatar.jpg" />
            <Typography variant="h6" style={{ marginLeft: 10 }}>
              John Doe
            </Typography>
            <Verified color="primary" style={{ marginLeft: 5 }} />
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button variant="outlined" style={{ marginRight: 10 }}>
                Verify Worldcoin
              </Button>
              <Typography variant="body2">0x...123</Typography>
              <Button variant="outlined" style={{ marginLeft: 10 }}>
                Buy Credit
              </Button>
              <Typography variant="body2" style={{ marginLeft: 10 }}>
                5 credits available
              </Typography>
            </div>
          </Toolbar>
        </AppBar>

        <div
          style={{
            flex: 1,
            padding: "20px 30px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SenderMessage message="This is the content" />
          <ReplyMessage
            message="This is the content"
            replyMessage="This is the message replied to"
          />
        </div>
        <Paper
          style={{
            padding: "20px 30px",
            margin: "10px auto",
            width: "1200px",
            borderRadius: "10px",
            backgroundColor: "#ECE6F0",
          }}
        >
          <TextField
            fullWidth
            // variant="outlined"
            variant="standard"
            // style={{
            //   borderBottom: "",
            // }}
            // slotProps={

            // }
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            placeholder="Type a message"
            InputProps={{
              disableUnderline: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onSendMessage}>
                    {/* <ChatBubbleOutline />
                     */}
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </div>
    </div>
  );
}
