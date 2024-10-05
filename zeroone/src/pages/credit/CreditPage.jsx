import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PurchasedArtistCard } from "../../components";

import {
  Box,
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
} from "@mui/material";
import { useContractContext } from "../../context";

function createData(
  id,
  name,
  transaction,
  timestamp,
  amount,
  credit,
  remaning
) {
  return { id, name, transaction, timestamp, amount, credit, remaning };
}

const rows = [
  createData(
    "1",
    "Justin Bieber",
    "0x69e75a2346ae86c1c70f91216e464811a99ed87f",
    "22/11/24 14:00",
    "0.0004 ETH",
    3,
    "Completed"
  ),
  // createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  // createData("Eclair", 262, 16.0, 24, 6.0),
  // createData("Cupcake", 305, 3.7, 67, 4.3),
  // createData("Gingerbread", 356, 16.0, 49, 3.9),
];

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
            backgroundColor: "#fff",
            border: "2px solid #333",
            color: "#000",
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
            backgroundColor: "#fff",
            border: "2px solid #333",
            color: "#000",
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
            backgroundColor: "#fff",
            border: "2px solid #333",
            color: "#000",
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

function PurchaseHistoryTab({ p2rs, claimRewards }) {
  return (
    <>
      <TableContainer component={Box}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Artist</TableCell>
              <TableCell align="right">Txn Hash</TableCell>
              <TableCell align="right">Timestamp</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Credit</TableCell>
              <TableCell align="right">Remaining</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.transaction}</TableCell>
                <TableCell align="right">{row.timestamp}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.credit}</TableCell>
                {/* <TableCell align="right">{row.remaning}</TableCell> */}
                <TableCell align="right">
                  <button
                    onClick={async () => {
                      try {
                        await claimRewards(row.id, row.credit);
                        console.log("Reward claimed successfully");
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                  >
                    Claim Reward
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
  const [p2rRecords, setP2RRecords] = useState([]);

  const { claimRewards } = useContractContext();

  useEffect(() => {
    const fetchP2RData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/p2r/getP2RRecord/${sessionStorage.getItem(
            "loggedInAddress"
          )}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setP2RRecords(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchP2RData();
  }, []);

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
        // height: "100%",
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
              <Tab label="Purchased Artist" {...a11yProps(0)} />
              <Tab label="Purchase History" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <PurchaseArtistTab />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <PurchaseHistoryTab p2rs={p2rRecords} claimRewards={claimRewards} />
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
}
