import React, { useContext, useState } from "react";
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
import {
  Verified as VerifiedIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import VerifiedButton from "../../components/worldcoin/VerifyButton";
import { useContractContext } from "../../context";
import { ModalContext } from "../../context/useModalContext";

export default function EditProfile() {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1000,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: "10px",
    p: 4,
  };
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  return (
    <>
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
        Edit Profile
      </Button>
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}></Box>
      </Modal>
    </>
  );
}
