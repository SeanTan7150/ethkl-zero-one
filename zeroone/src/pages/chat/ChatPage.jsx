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
import { Search, Verified, ChatBubbleOutline } from "@mui/icons-material";

export default function ChatPage() {
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
          width: 300,
          overflowY: "auto",
          borderRight: "1px solid #e0e0e0",
          padding: "2rem 1rem",
          //   height: "100%",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          style={{ margin: "10px 0" }}
        />
        {/* Contact Panel */}
        <List>
          {[...Array(7)].map((_, index) => (
            <ListItem
              key={index}
              style={{
                marginBottom: "1rem",
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
          <Paper
            style={{
              padding: "15px 25px",
              marginBottom: 20,
              minWidth: "200px",
              maxWidth: "600px",
              alignSelf: "end",
              borderRadius: "50px",
            }}
          >
            <Typography
              variant="body1"
              style={{
                textAlign: "start",
              }}
            >
              Message 1
            </Typography>
          </Paper>
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
                }}
              >
                <Typography
                  variant="body1"
                  style={{
                    textAlign: "start",
                  }}
                >
                  Message 1
                </Typography>
              </Paper>
            </Box>
            <Paper
              style={{
                minWidth: "200px",
                padding: "15px 25px",
                backgroundColor: "black",
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
                Reply 1
              </Typography>
            </Paper>
          </Box>
        </div>
        <Paper style={{ padding: 10, margin: 10 }}>
          <TextField
            fullWidth
            // variant="outlined"
            variant="standard"
            // style={{
            //   borderBottom: "",
            // }}
            placeholder="Type a message"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    <ChatBubbleOutline />
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
