import React, { useState } from "react";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

export default function HomeArtistCard({
  onNavigate,
  artistName = "Unknown User",
  artistImage,
}) {
  return (
    <Card
      className="home-artist"
      onClick={onNavigate}
      sx={{
        minWidth: 320,
        maxWidth: 320,
        boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        borderRadius: "10px",
        backgroundColor: "#000",
        // mb: 5,
        pb: 2,
      }}
    >
      <CardMedia
        sx={{
          backgroundColor: "#fff",
        }}
        component="img"
        alt="green iguana"
        height="230"
        image={artistImage ?? "/store/store-placeholder.jpg"}
      />
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: " bold", color: "#fff" }}
        >
          {artistName != "" ? artistName : "Username"}
        </Typography>
      </CardContent>
    </Card>
  );
}
