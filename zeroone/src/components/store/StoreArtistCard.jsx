import React, { useState } from "react";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

export default function StoreArtistCard() {
  return (
    <Card
      sx={{
        minWidth: 330,
        maxWidth: 380,
        boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        borderRadius: "10px",
        // mb: 5,
        pb: 3,
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image="src/assets/store/store-placeholder.jpg"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: " bold" }}
        >
          Justin Bieber
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", fontSize: "10px" }}
        >
          0x69e75a2346ae86c1c70f91216e464811a99ed87f
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          sx={{
            // mr: 2,
            backgroundColor: "#E8DEF8",
            color: "#000",
            fontWeight: "bold",
            px: 6,
            py: 1,
            borderRadius: "10px",
            mx: "auto",
          }}
        >
          Purchase
        </Button>
      </CardActions>
    </Card>
  );
}
