import { useEffect, useState } from "react";
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

const createP2R = async () => {
  const dummyData = {
    p2r_id: "99991", // Dummy P2R ID
    user_address: "0xc7b207fdc7df0b4a99ef033736ae8307e6105ad5", // Dummy User Address
    artist_address: "0x69e75a2346ae86c1c70f91216e464811a99ed87f", // Dummy Artist Address
    credit: 5, // Dummy Credit value
    type: "fast", // Record type: "slow", "average", or "fast"
  };

  try {
    const response = await fetch(
      "http://localhost:5001/api/p2r/createP2RRecord",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dummyData),
      }
    );

    const data = await response.json();

    if (data.success) {
      console.log("P2R Record created successfully:", data.p2rRecord);
    } else {
      console.error("Error creating P2R Record:", data.message);
    }
  } catch (error) {
    console.error("Failed to create P2R Record:", error);
  }
};

const sendDummyMessage = async () => {
  const dummyData = {
    sender_id: "64ecccfcfc5ae1111abccdef", // Replace with a valid sender_id from your DB
    fanAddress: "0xFanAddress123", // Dummy fan address (e.g. a wallet address or user identifier)
    artistAddress: "0xArtistAddress456", // Dummy artist address (wallet address or user identifier)
    content: "This is a dummy message content", // The actual message content
    isP2R: true, // Specify whether this is related to a P2R record or not
    p2rRecordID: "64ecccfcdummyrecord1234", // Replace with a valid P2R record ID
  };

  try {
    const response = await fetch("http://localhost:5000/sendMsg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dummyData), // Convert the dummy data to JSON format
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Message sent successfully:", result);
      // You can update the UI or notify the user here if needed
    } else {
      console.error("Failed to send message:", result.message);
    }
  } catch (error) {
    console.error("Error in sending message:", error);
  }
};

export default function HomePage() {
  const [allArtists, setAllArtists] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate hook
  const handleViewProfile = (artistAddress) => {
    // Redirect to the profile page with the artist's address as a query parameter
    navigate(`/profile?address=${artistAddress}`);
  };

  useEffect(() => {
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
        <button
          onClick={() => {
            // sendMSG();
            createP2R();
          }}
        >
          Test
        </button>
      </Box>
    </>
  );
}
