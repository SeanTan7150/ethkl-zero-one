import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

export default function CustomAppBar({ toggleDrawer }) {
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [loggedInAddress, setLoggedInAddress] = useState(null);

  const loadSession = () => {
    const storedConnectedAddress = sessionStorage.getItem("connectedAddress");
    const storedLoggedInAddress = sessionStorage.getItem("loggedInAddress");

    if (storedConnectedAddress) {
      setConnectedAddress(storedConnectedAddress);
    }

    if (storedLoggedInAddress) {
      setLoggedInAddress(storedLoggedInAddress);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        setConnectedAddress(accounts[0]);
        sessionStorage.setItem("connectedAddress", accounts[0]);
      } catch (error) {
        console.error("Wallet connection failed: ", error);
      }
    } else {
      console.error("MetaMask not installed");
    }
  };

  const signInWithEthereum = async () => {
    if (connectedAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const message = `Sign this message to authenticate with address: ${connectedAddress}`;
      try {
        const signature = await signer.signMessage(message);
        console.log("Signature:", signature);

        sessionStorage.setItem("loggedInAddress", connectedAddress);
        setLoggedInAddress(connectedAddress);
        console.log("User signed in, session updated");
      } catch (error) {
        console.error("SIWE failed:", error);
      }
    }
  };

  const signOut = () => {
    sessionStorage.removeItem("loggedInAddress");
    sessionStorage.removeItem("connectedAddress");
    console.log("User signed out");
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#000",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              toggleDrawer();
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          {connectedAddress ? (
            <div>
              {loggedInAddress ? (
                <button onClick={signOut}>Sign Out</button>
              ) : (
                <button onClick={signInWithEthereum}>Sign In</button>
              )}
            </div>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
