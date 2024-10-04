import React from "react";
import PropTypes from "prop-types";
// import { PurchasedArtistCard } from "..";
import { PurchasedArtistCard } from "../../components";

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

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "start",
            alignItems: "start",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function PurchaseArtistTab() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 6,
        }}
      >
        <Button
          variant="contained"
          color="primary"
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
          All
        </Button>
        <Button
          variant="contained"
          color="primary"
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
          Following
        </Button>
        <Button
          variant="contained"
          color="primary"
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
          Favorite
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          // justifyContent: "space-between",
          // rowGap: "10px",
          gap: "50px",
          flexWrap: "wrap",
        }}
      >
        {/* Individual Artist */}

        <PurchasedArtistCard />
        <PurchasedArtistCard />
        <PurchasedArtistCard />
        <PurchasedArtistCard />
        <PurchasedArtistCard />
        <PurchasedArtistCard />
      </Box>
    </>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CreditPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        width: 1300,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Box sx={{ p: 3, mb: 3, backgroundColor: "#fff", borderRadius: "8px" }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Purchase Artist" {...a11yProps(0)} />
              <Tab label="Purchase History" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {/* Item One
             */}
            <PurchaseArtistTab />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
}
