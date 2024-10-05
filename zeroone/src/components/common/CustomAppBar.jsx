import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../context/useModalContext";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  Button,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  Modal,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

export default function CustomAppBar({ toggleDrawer }) {
  const { modalOpen, setModalOpen } = useContext(ModalContext);
  const [connectedAddress, setConnectedAddress] = useState(null);
  const [loggedInAddress, setLoggedInAddress] = useState(null);

  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [img, setImg] = useState("");

  const navigate = useNavigate();

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

        // Check off-chain user existence
        try {
          const res = await fetch(
            `http://localhost:5001/api/user/getUser/${sessionStorage.getItem(
              "loggedInAddress"
            )}`
          );

          // Handle non-404 errors (other types of errors)
          if (!res.ok && res.status !== 404) {
            throw new Error("Failed to fetch user");
          }

          if (res.status === 404) {
            // User not found, trigger modal to create profile
            setModalOpen(true);
            console.log("User not found, opening modal to create profile");
          } else {
            // User found, proceed with login flow
            const data = await res.json();
            console.log("User found:", data);
            navigate("/home");
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      } catch (error) {
        console.error("SIWE failed:", error);
      }
    }
  };

  const handleRegisterUser = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/user/createUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: sessionStorage.getItem("loggedInAddress"),
          username: username,
          profile_pic_url: img,
          bio: bio,
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      console.log("User created:", data);
      setModalOpen(false);
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = () => {
    sessionStorage.removeItem("loggedInAddress");
    sessionStorage.removeItem("connectedAddress");
    console.log("User signed out");
    navigate("/");
  };

  useEffect(() => {
    loadSession();
  }, []);

  return (
    <>
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
                {sessionStorage.getItem("loggedInAddress") ? (
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
      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 3,
              }}
            >
              Register Profile
            </Typography>
            <TextField
              sx={{
                minWidth: "600px",
                mb: 3,
              }}
              required
              id="outlined-required"
              label="Username"
              defaultValue={username}
              placeholder="Your Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              autoComplete="off"
            />
            <TextField
              sx={{
                minWidth: "600px",
                mb: 3,
              }}
              required
              id="outlined-required"
              label="Profile Image"
              defaultValue={img}
              placeholder="Your Image"
              onChange={(e) => {
                setImg(e.target.value);
              }}
              autoComplete="off"
            />
            <TextField
              sx={{
                minWidth: "600px",
                mb: 3,
              }}
              id="outlined-multiline-static"
              label="Your Bio"
              multiline
              rows={4}
              defaultValue={bio}
              placeholder="Enter your bio here"
              onChange={(e) => {
                setBio(e.target.value);
              }}
              autoComplete="off"
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setModalOpen(true);
                handleRegisterUser(event);
              }}
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
              Register
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
