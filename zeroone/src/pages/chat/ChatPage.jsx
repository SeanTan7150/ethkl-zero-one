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
import { Search, Verified } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import { SenderMessage, ReplyMessage, PurchaseModal } from "../../components";

export default function ChatPage() {
  const loggedInAddress = sessionStorage.getItem("loggedInAddress");

  const { modalOpen, setModalOpen } = useContext(ModalContext);

  const [message, setMessage] = React.useState("");
  const [activeContact, setActiveContact] = React.useState(0);
  const [chatMessages, setChatMessages] = useState([]);

  const [fetchedMessages, setFetchedMessages] = useState([]);

  // New state to store the organized remaining credit by type
  const [creditByType, setCreditByType] = useState({
    fast: { creditRemaining: 0, p2rRecords: [] },
    average: { creditRemaining: 0, p2rRecords: [] },
    slow: { creditRemaining: 0, p2rRecords: [] },
  });
  const [remainingCreditsDisplay, setRemainingCreditsDisplay] = useState("");

  useEffect(() => {
    // Organizing the remaining credit by type
    const creditEntries = Object.entries(creditByType)
      .filter(([type, { creditRemaining }]) => creditRemaining > 0) // Filter out types with 0 remaining
      .map(([type, { creditRemaining }]) => {
        return `${creditRemaining} ${
          type.charAt(0).toUpperCase() + type.slice(1)
        }`; // Capitalizing the first letter of the type
      });

    // Joining the entries and setting the state
    if (creditEntries.length > 0) {
      setRemainingCreditsDisplay(
        `Remaining: ${creditEntries.join(", ")} Credit`
      );
    } else {
      setRemainingCreditsDisplay("No remaining credits"); // Optional: Handle the case where all credits are 0
    }
  }, [creditByType]);

  const calculateRemainingCredits = (records) => {
    const creditSummary = {
      fast: { creditRemaining: 0, p2rRecords: [] },
      average: { creditRemaining: 0, p2rRecords: [] },
      slow: { creditRemaining: 0, p2rRecords: [] },
    };

    records.forEach((record) => {
      // Calculate remaining credit for this record
      const remainingCredit =
        record.credit - (record.sent + record.replied + record.creditCompleted);

      // If remaining credit is greater than 0, categorize by type
      if (remainingCredit > 0) {
        if (record.type === "fast") {
          creditSummary.fast.creditRemaining += remainingCredit;
          creditSummary.fast.p2rRecords.push(record._id);
        } else if (record.type === "average") {
          creditSummary.average.creditRemaining += remainingCredit;
          creditSummary.average.p2rRecords.push(record._id);
        } else if (record.type === "slow") {
          creditSummary.slow.creditRemaining += remainingCredit;
          creditSummary.slow.p2rRecords.push(record._id);
        }
      }
    });

    setCreditByType(creditSummary); // Store the result in state
    console.log(creditSummary, "credit remaining");
  };

  // Purchase Modal States
  const [activeCard, setActiveCard] = useState(0);
  // Selected Credit Object
  const [selectedCredit, setSelectedCredit] = useState(creditInfo[0]);
  // Selected Time Index
  const [activeTime, setActiveTime] = useState(0);
  // Selected Time Object
  const [selectedTime, setSelectedTime] = useState(timeToReachInfo[0]);

  const fetchTargetUser = async (address) => {
    try {
      console.log("Fetching user with address:", address);
      const response = await fetch(
        `http://localhost:5001/api/user/getUser/${address}`, // Address in URL
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json(); // Assuming the response is in JSON format

      return data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchConversations = async () => {
        try {
          const response = await fetch(
            `http://localhost:5001/api/conversation/getConversation/${loggedInAddress}`,
            { method: "GET" }
          );
          const data = await response.json();

          if (data.success) {
            const allConversation = data.conversations;
            const targetUserAddress = allConversation[0].participants.find(
              (p) => p !== loggedInAddress
            );

            const userDetails = await fetchTargetUser(targetUserAddress);
            console.log("User details fetched:", userDetails);

            const combinedChatMessage = {
              ...userDetails,
              conversation: allConversation[0],
            };

            // Update ChatMessages state with the new combined object
            setChatMessages((prev) => [...prev, combinedChatMessage]);

            // Fetch messages for the first conversation after the conversation is loaded
            if (allConversation[0]?._id) {
              await fetchMessages(allConversation[0]._id);
              const remainingCredit = await fetchRemainingCredit(
                allConversation[0].participants[0],
                allConversation[0].participants[1]
              );
              calculateRemainingCredits(remainingCredit);
            }
          }
        } catch (error) {
          console.error("Failed to fetch conversations:", error);
        }
      };

      const fetchURLAddress = async () => {
        const params = new URLSearchParams(window.location.search);
        const profileAddress = params.get("address");

        if (profileAddress) {
          const addressExists = chatMessages.some(
            (contact) => contact.address === profileAddress
          );

          if (!addressExists) {
            console.log("Fetching NEW user data for:", profileAddress);
            try {
              const res = await fetch(
                `http://localhost:5001/api/user/getUser/${profileAddress}`
              );
              if (!res.ok) throw new Error("Failed to fetch user data");
              const data = await res.json();
              setChatMessages((prev) => {
                if (!prev.some((contact) => contact.address === data.address)) {
                  return [data, ...prev];
                }
                return prev;
              });
              console.log("User data fetched successfully:", data);
            } catch (error) {
              console.error(error);
            }
          }
        }
      };

      // Fetch conversations first, then fetch URL address
      await fetchConversations();
      await fetchURLAddress();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInAddress]);

  const fetchMessages = async (conversationId) => {
    if (!conversationId) {
      console.warn("No valid conversation ID found.");
      return;
    }

    console.log("Fetching messages for conversation:", conversationId);
    try {
      const response = await fetch(
        `http://localhost:5001/api/conversation/conversationMsg/${conversationId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();

      setFetchedMessages(data.messages);
      console.log("Fetched messages:", data.messages);
    } catch (error) {
      console.error("Error fetching conversation messages:", error);
    }
  };

  const fetchRemainingCredit = async (userAddress, artistAddress) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/p2r/getP2RRecords/${userAddress}/${artistAddress}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch P2R records");
      }

      const data = await response.json();
      if (data.success) {
        return data.records;
      }
    } catch (error) {
      console.error("Error fetching P2R records:", error);
    }
  };

  const onChangeActiveContact = async (index) => {
    setActiveContact(index);
    const conversationId = chatMessages[index]?.conversation?._id;
    if (conversationId) {
      await fetchMessages(conversationId); // Fetch messages only if conversationId is available
    }
    const remainingCredit = await fetchRemainingCredit(
      conversationId.address,
      loggedInAddress
    );
    calculateRemainingCredits(remainingCredit);
  };

  const onSendMessage = async () => {
    const send_id = await fetchTargetUser(loggedInAddress);

    const msgData = {
      sender_id: send_id._id,
      fanAddress: loggedInAddress,
      artistAddress: chatMessages[activeContact].address,
      content: message,
      isP2R: true,
      p2rRecordID: creditByType.average.p2rRecords[0], /// Based on the user selection on the credit get [0] of that type on the p2rRecords
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/messages/sendMsg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(msgData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Message sent successfully:", result);
        window.location.reload();
        // You can update the UI or notify the user here if needed
      } else {
        console.error("Failed to send message:", result.message);
      }
    } catch (error) {
      console.error("Error in sending message:", error);
    }
    setMessage("");
  };

  const onReplyMessage = async (replyToMessageId) => {
    const send_id = await fetchTargetUser(loggedInAddress); // Fetch the sender's ID based on the logged-in user's address

    const replyData = {
      sender_id: send_id._id,
      fanAddress: loggedInAddress, // Address of the user replying
      artistAddress: chatMessages[activeContact].address, // The artist's address from the chat messages
      content: message, // The reply message content from the input
      isP2R: true, // Assuming the reply is P2R-related, you can modify this based on user selection
      reply_to: replyToMessageId, // The ID of the message being replied to
      p2rRecordID: creditByType.average.p2rRecords[0], // Based on the user selection on the credit get [0] of that type on the p2rRecords
    };

    try {
      const response = await fetch(
        "http://localhost:5001/api/messages/replyMsg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(replyData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Reply sent successfully:", result);
        // Optionally update the UI or notify the user here
      } else {
        console.error("Failed to send reply:", result.message);
      }
    } catch (error) {
      console.error("Error in sending reply:", error);
    }

    // Clear the message input after sending the reply
    setMessage("");
  };

  return (
    <>
      <div
        style={{
          height: "calc(100vh - 60px)",
          display: "flex",
          backgroundColor: "#f0f2f5",
          alignItems: "stretch",
          maxHeight: "calc(100vh - 60px)",
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
            {chatMessages.length === 0 && (
              <Typography variant="h6" style={{ margin: "1rem" }}>
                No conversations found
              </Typography>
            )}
            {chatMessages.map((contact, index) => (
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
                      {contact?.is_artist && (
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
                    chatMessages[activeContact]?.profile_pic_url ||
                    "/path-to-default-avatar.jpg"
                  }
                />
                {/* Use the selected user's name or a default name */}

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5" style={{ marginLeft: 10 }}>
                      {chatMessages[activeContact]?.username || "Unknown User"}
                    </Typography>
                    {chatMessages[activeContact]?.is_artist && (
                      <Verified color="primary" style={{ marginLeft: 5 }} />
                    )}
                  </Box>
                  <Typography variant="body2" style={{ marginLeft: 10 }}>
                    {chatMessages[activeContact]?.address}
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
                  {remainingCreditsDisplay}
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
            {fetchedMessages.map((msg, index) => (
              <div key={index}>
                {msg.sender_id.address === loggedInAddress ? (
                  msg.reply_to ? (
                    // When `reply_to` is not null, display a reply message
                    <ReplyMessage
                      direction="end"
                      message={msg.message_content} // The actual message content
                      replyMessage={msg.reply_to.message_content} // The content of the message being replied to
                    />
                  ) : (
                    // When `reply_to` is null, display a sender message
                    <SenderMessage
                      direction="end"
                      message={msg.message_content}
                    />
                  )
                ) : msg.reply_to ? (
                  // When `reply_to` is not null, but the message is from the other user
                  <ReplyMessage
                    direction="start"
                    message={msg.message_content}
                    replyMessage={msg.reply_to.message_content}
                  />
                ) : (
                  // When `reply_to` is null, display a message from the other user
                  <SenderMessage
                    is_p2r={msg.is_p2r}
                    direction="start"
                    message={msg.message_content}
                  />
                )}
              </div>
            ))}
            {/* <SenderMessage message="This is the content" />
            <ReplyMessage
              direction="end"
              message="This is the content"
              replyMessage="This is the message replied to"
            /> */}
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
