import React from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Tabs,
  Tab,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export default function HomePage() {
  const [allArtists, setAllArtists] = React.useState([]);
  const navigate = useNavigate(); // Initialize the navigate hook
  const handleViewProfile = (artistAddress) => {
    // Redirect to the profile page with the artist's address as a query parameter
    navigate(`/profile?address=${artistAddress}`);
  };

  React.useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/user/getArtists");
        if (!res.ok) {
          throw new Error("Failed to fetch artists");
        }
        const data = await res.json();
        setAllArtists(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <>
      <Box
        sx={{
          flex: 1,
          p: 2,
          maxWidth: 1280,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Box sx={{ p: 3, mb: 3, backgroundColor: "#fff", borderRadius: "8px" }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "start",
            }}
          >
            GM
          </Typography>
          <Box>
            <Card sx={{ display: "flex", maxWidth: "300px", height: "80px" }}>
              <CardMedia
                component="img"
                sx={{ width: 80 }}
                image="src/assets/store/store-placeholder.jpg"
                alt="Live from space album cover"
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    Live From Space
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: "text.secondary" }}
                  >
                    Mac Miller
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
}
