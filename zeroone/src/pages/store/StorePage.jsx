import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Grid,
  Grid2,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StoreArtistCard } from "../../components";

export default function StorePage({ open, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    gender: {
      male: false,
      female: false,
    },
    genre: {
      music: false,
      movies: false,
      books: false,
      tvShows: false,
      gaming: false,
      sports: false,
      comedy: false,
      drama: false,
    },
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (category, option) => (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: {
        ...prevFilters[category],
        [option]: event.target.checked,
      },
    }));
  };

  const FilterCategory = ({ title, options, category }) => (
    <Accordion
      defaultExpanded
      sx={{
        boxShadow: "none",
      }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle1">{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          {Object.entries(options).map(([key, value]) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={value}
                  onChange={handleFilterChange(category, key)}
                  name={key}
                />
              }
              label={key.charAt(0).toUpperCase() + key.slice(1)}
            />
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
  return (
    <Box
      sx={{
        // height: "100%",
        display: "flex",
        alignItems: "stretch",
        // backgroundColor: "#f0f2f5",
      }}
    >
      <Drawer
        variant="permanent"
        anchor="left"
        open={open}
        onClose={onClose}
        // sx={{
        //   height: "100%",
        // }}
        PaperProps={{
          sx: { width: 380, position: "relative", height: "100vh" },
          flexShrink: 0,
          zIndex: 0,
          position: "relative",
          [`& .MuiDrawer-paper`]: {
            width: 500,
            boxSizing: "border-box",
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Filters
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ mb: 2 }}
          />
          {/* <Divider sx={{ my: 2 }} /> */}
          <FilterCategory
            title="Gender"
            options={filters.gender}
            category="gender"
          />
          <FilterCategory
            title="Genre"
            options={filters.genre}
            category="genre"
          />
        </Box>
      </Drawer>
      <Box
        sx={{
          p: "3rem 1rem 3rem 1rem",
          backgroundColor: "#f0f2f5",
        }}
      >
        <Grid2
          container
          spacing={8}
          sx={{
            // width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gridAutoFlow: "column",
          }}
        >
          <Grid2 item xs={3}>
            <StoreArtistCard />
          </Grid2>
          <Grid2 item xs={3}>
            <StoreArtistCard />
          </Grid2>
          <Grid2 item xs={3}>
            <StoreArtistCard />
          </Grid2>
          <Grid2 item xs={3}>
            <StoreArtistCard />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}
