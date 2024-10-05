import React from "react";
import { useNavigate } from "react-router-dom";
import { HomeGenreCard, HomeArtistCard } from "../../components";

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
        const res = await fetch("http://10.0.2.2:5001/api/user/getArtists");
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
        <Box
          sx={{
            p: 3,
            mb: 3,
            backgroundColor: "#fff",
            borderRadius: "8px",
            mx: "auto",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "start",
              mb: 3,
            }}
          >
            GM
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: "20px",
              flexWrap: "wrap",
              mb: 8,
            }}
          >
            {[...Array(6)].map((_, index) => (
              <HomeGenreCard key={index} />
            ))}
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "start",
              mb: 3,
            }}
          >
            Recent Artist
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: "20px",
              flexWrap: "wrap",
              mb: 8,
            }}
          >
            {allArtists.map((artist, index) => (
              // <HomeGenreCard key={index} />
              <HomeArtistCard
                key={index}
                artistImage={artist.profile_pic_url}
                artistName={artist.username}
                onNavigate={() => {
                  handleViewProfile(artist.address);
                }}
              />
            ))}
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              textAlign: "start",
              mb: 3,
            }}
          >
            Discover new artist
          </Typography>
        </Box>
      </Box>
    </>
  );
}
