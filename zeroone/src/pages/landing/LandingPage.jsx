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
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

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
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setModalOpen(true);
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
        </Button>
      </Box>
      <Modal
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
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setModalOpen(true);
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
      </Modal>
    </>
  );
}
