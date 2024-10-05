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
import { BorderLeft } from "@mui/icons-material";
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
  //       `http://localhost:5001/api/user/getUser/${sessionStorage.getItem(
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
  //     const res = await fetch("http://localhost:5001/api/user/createUser", {
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
      <Grid
        container
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Grid
          item
          xs={12}
          md={6}
          style={{
            paddingLeft: 40,
          }}
        >
          <Typography
            variant="h2"
            style={{
              fontWeight: "bolder",
              fontSize: 40,
              textAlign: "left",
              marginBottom: 20,
            }}
          >
            Money Talks, Celebrities Reply!
          </Typography>
          <Typography
            variant="h5"
            style={{
              fontWeight: "bold",
              fontSize: 25,
              textAlign: "left",
              marginBottom: 30,
            }}
          >
            "Why DM when you can P2R? Verified stars, real conversations, and
            rewards for their witty comebacks. Your fandom just got an upgrade!"
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src="landing-page-illustration.png"
            alt="Illustration"
            style={{
              width: "80%",
              maxWidth: "800px",
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
