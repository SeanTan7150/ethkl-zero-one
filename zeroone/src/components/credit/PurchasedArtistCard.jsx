import React from "react";

import {
  Box,
  Tabs,
  Tab,
  Typography,
  Avatar,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";

export default function PurchasedArtistCard() {
  return (
    <Box>
      {/* Picture */}
      <Box
        sx={{
          width: "200px",
          height: "200px",
          borderRadius: "10px",
          overflow: "hidden",
          mb: 2,
        }}
      >
        <img
          style={{
            width: "200px",
            height: "200px",
          }}
          src="src/assets/store/store-placeholder.jpg"
        />
      </Box>
      <Typography
        sx={{
          fontWeight: "bold",
          textAlign: "start",
          fontSize: "18px",
          mb: 1,
        }}
      >
        Justin Bieber
      </Typography>
      <Typography
        sx={{
          // fontWeight: "bold",
          textAlign: "start",
          fontSize: "14px",
          mb: 1,
        }}
      >
        Slow Credit: 5
      </Typography>
      <Typography
        sx={{
          // fontWeight: "bold",
          textAlign: "start",
          fontSize: "14px",
          mb: 1,
        }}
      >
        Average Credit: 5
      </Typography>
      <Typography
        sx={{
          // fontWeight: "bold",
          textAlign: "start",
          fontSize: "14px",
          mb: 2,
        }}
      >
        Fast Credit: 5
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: "#E8DEF8",
          color: "#000",
          fontWeight: "bold",
          px: 6,
          py: 1,
          borderRadius: "10px",
          width: "100%",
        }}
      >
        Chat
      </Button>
    </Box>
  );
}
