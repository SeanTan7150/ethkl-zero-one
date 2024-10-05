import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  Modal,
} from "@mui/material";
import { ModalContext } from "../../context/useModalContext";
// import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function LandingPage() {
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  // const [username, setUsername] = useState("");
  // const [bio, setBio] = useState("");
  // const [img, setImg] = useState("");

  // const navigate = useNavigate();

  // const handleLogin = async () => {
  //   try {
  //     const res = await fetch(
  //       `http://10.0.2.2:5001/api/user/getUser/${sessionStorage.getItem(
  //         "loggedInAddress"
  //       )}`
  //     );
  //     if (!res.ok) {
  //       throw new Error("Failed to fetch user");
  //     }
  //     const data = await res.json();

  //     if (data.error) {
  //       console.error("Error fetching user:", data.error);
  //       // Return false to indicate that user is not found
  //       return false;
  //     } else {
  //       console.log("User found:", data);
  //       // Redirect to the home page if the user is found
  //       return true; // Return true to indicate success
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // };

  // const handleRegisterUser = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const res = await fetch("http://10.0.2.2:5001/api/user/createUser", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         address: sessionStorage.getItem("loggedInAddress"),
  //         username: username,
  //         profile_pic_url: img,
  //         bio: bio,
  //       }),
  //     });

  //     if (!res.ok) {
  //       throw new Error(`Error: ${response.status}`);
  //     }

  //     const data = await res.json();
  //     console.log("User created:", data);
  //     window.location.reload();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <Box
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Button
          variant="contained"
          color="primary"
          onClick={async () => {
            const isUserFound = await handleLogin();
            if (isUserFound) {
              navigate("/home"); // Redirect to the home page if user is found
            } else {
              setModalOpen(true); // Keep the modal open if user is not found
            }
          }}
          sx={{
            mr: 2,
            backgroundColor: "#333",
            color: "#fff",
            fontWeight: "bold",
            px: 6,
            py: 1,
            borderRadius: "10px",
          }}
        >
          Login
        </Button> */}
      </Box>
      {/* <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 3,
              }}
            >
              Register Profile
            </Typography>
            <TextField
              sx={{
                minWidth: "600px",
                mb: 3,
              }}
              required
              id="outlined-required"
              label="Username"
              defaultValue={username}
              placeholder="Your Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              autoComplete="off"
            />
            <TextField
              sx={{
                minWidth: "600px",
                mb: 3,
              }}
              required
              id="outlined-required"
              label="Profile Image"
              defaultValue={img}
              placeholder="Your Image"
              onChange={(e) => {
                setImg(e.target.value);
              }}
              autoComplete="off"
            />
            <TextField
              sx={{
                minWidth: "600px",
                mb: 3,
              }}
              id="outlined-multiline-static"
              label="Your Bio"
              multiline
              rows={4}
              defaultValue={bio}
              placeholder="Enter your bio here"
              onChange={(e) => {
                setBio(e.target.value);
              }}
              autoComplete="off"
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setModalOpen(true);
                handleRegisterUser(event);
              }}
              sx={{
                mr: 2,
                backgroundColor: "#333",
                color: "#fff",
                fontWeight: "bold",
                px: 6,
                py: 1,
                borderRadius: "10px",
              }}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Modal> */}
    </>
  );
}
