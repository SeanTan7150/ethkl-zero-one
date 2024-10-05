import React, { useContext, useState, useEffect } from "react";
import { ModalContext } from "../../context/useModalContext";

import { creditInfo, timeToReachInfo } from "../../types";
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
import { SenderMessage, ReplyMessage, PurchaseModal } from "../../components";

export default function ChatPage() {
  const loggedInAddress = sessionStorage.getItem("loggedInAddress");

  const { modalOpen, setModalOpen } = useContext(ModalContext);

  const [message, setMessage] = React.useState("");
  const [activeContact, setActiveContact] = React.useState(0);
  const [conversations, setConversations] = useState([]);
  const [userData, setUserData] = useState(null);
  const [activeCard, setActiveCard] = useState(0);
  // Selected Credit Object
  const [selectedCredit, setSelectedCredit] = useState(creditInfo[0]);
  // Selected Time Index
  const [activeTime, setActiveTime] = useState(0);
  // Selected Time Object
  const [selectedTime, setSelectedTime] = useState(timeToReachInfo[0]);

  // Get the address from query parameters
  const params = new URLSearchParams(window.location.search);
  const profileAddress = params.get("address"); // The address you want to chat with

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/user/getUser/${profileAddress}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUserData(data); // Set the user data state
      } catch (error) {
        console.error(error);
      }
    };

    if (
      profileAddress &&
      !conversations.some((convo) =>
        convo.participants.includes(profileAddress)
      )
    ) {
      // Only fetch user data if the address is not found in conversations
      fetchUserData();
    }
  }, [profileAddress, conversations]);

  // If userData exists, map it to the conversations array for display
  const mappedConversations = userData
    ? [
        {
          address: userData.address,
          username: userData.username,
          profile_pic_url: userData.profile_pic_url,
          bio: userData.bio,
          // You can add more properties here if needed
        },
        ...conversations, // Assuming conversations can have other entries as well
      ]
    : conversations;

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/conversation/getConversation/${loggedInAddress}`, // Address in URL
          {
            method: "GET",
          }
        );
        const data = await response.json(); // Assuming the response is in JSON format
        if (data.success) {
          setConversations(data.conversations);
        }
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    if (loggedInAddress) {
      fetchConversations();
    }
  }, [loggedInAddress]);

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
    <>
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
            {mappedConversations.length === 0 && (
              <Typography variant="h6" style={{ margin: "1rem" }}>
                No conversations found
              </Typography>
            )}
            {mappedConversations.map((contact, index) => (
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
                  <Avatar
                    src={
                      contact.profile_pic_url || "/path-to-default-avatar.jpg"
                    }
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {contact.username || "Unknown User"}
                      {userData?.is_artist && (
                        <Verified
                          color="primary"
                          style={{ marginLeft: 5, width: "auto" }}
                        />
                      )}
                    </Box>
                  }
                  secondary="lorem ipsum meta"
                  //{contact.bio || "No bio available"}
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
              {/* Use the selected user's profile picture or a default one if not available */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={
                    userData?.profile_pic_url || "/path-to-default-avatar.jpg"
                  }
                />
                {/* Use the selected user's name or a default name */}

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5" style={{ marginLeft: 10 }}>
                      {userData?.username || "Unknown User"}
                    </Typography>
                    {userData?.is_artist && (
                      <Verified color="primary" style={{ marginLeft: 5 }} />
                    )}
                  </Box>
                  <Typography variant="body2" style={{ marginLeft: 10 }}>
                    {userData?.address}
                  </Typography>
                </Box>
              </Box>
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="outlined"
                  style={{ marginLeft: 10 }}
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  Buy Credit
                </Button>
                <Typography variant="body2" style={{ marginLeft: 10 }}>
                  Remaining: 5 Fast, 10 Slow Credit
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
      <PurchaseModal
        modalOpen={modalOpen}
        setModalOpen={() => {
          setModalOpen(false);
        }}
        activeCard={activeCard}
        selectedCredit={selectedCredit}
        activeTime={activeTime}
        selectedTime={selectedTime}
        setActiveCard={(index) => {
          setActiveCard(index);
        }}
        setSelectedCredit={(newCredit) => {
          setSelectedCredit(newCredit);
        }}
        setActiveTime={(index) => {
          setActiveTime(index);
        }}
        setSelectedTime={(newTime) => {
          setSelectedTime(newTime);
          console.log(newTime);
        }}
      />
    </>
  );
}
