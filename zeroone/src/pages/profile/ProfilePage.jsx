import React, { useContext, useState } from "react";
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
import {
  Verified as VerifiedIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";
import VerifiedButton from "../../components/worldcoin/VerifyButton";
import { useContractContext } from "../../context";
import { ModalContext } from "../../context/useModalContext";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};
import { useLocation, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Use URLSearchParams to extract the 'address' parameter
  const searchParams = new URLSearchParams(location.search);
  const profileAddress =
    searchParams.get("address") ?? sessionStorage.getItem("loggedInAddress");

  const [userData, setUserData] = React.useState(null);
  const { modalOpen, setModalOpen } = useContext(ModalContext);

  const [artistName, setArtistName] = useState("");
  const [price1, setPrice1] = useState(0.0001);
  const [price3, setPrice3] = useState(0.0001);
  const [price5, setPrice5] = useState(0.0001);

  const { registerNewArtist } = useContractContext();

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/api/user/getUser/${profileAddress}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await res.json();
        setUserData(data); // Set the user data state
      } catch (error) {
        console.error(error);
      }
    };

    if (profileAddress) {
      // Fetch user data only if profileAddress is not empty
      fetchUserData();
    }
  }, [profileAddress]);

  const handleRegisterNewArtist = async () => {
    try {
      await registerNewArtist(artistName, price1, price3, price5);
      console.log("Register new artist success");

      // update off chain
      try {
        const res = await fetch(
          `http://localhost:5001/api/user/updateUser/${profileAddress}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ is_artist: true }), // Update isArtist to true
          }
        );

        if (!res.ok) {
          throw new Error("Failed to update user profile.");
        }

        const updatedUser = await res.json();
        console.log("User profile updated:", updatedUser);

        // Refresh the page
        window.location.reload();
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChatDirect = () => {
    // Redirect to the profile page with the artist's address as a query parameter
    navigate(`/chat?address=${profileAddress}`);
  };

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
        <Paper
          elevation={0}
          sx={{ p: 3, mb: 3, backgroundColor: "#fff", borderRadius: "8px" }}
        >
          <Box style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <Avatar
                src={
                  userData && userData.profile_pic_url
                    ? userData.profile_pic_url
                    : ""
                }
                style={{
                  width: "120px",
                  height: "120px",
                  flex: 1,
                  margin: "0rem 2.5rem 0rem 1rem",
                }}
              />
            </Box>

            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                flex: 3,
              }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                sx={{ mb: 1 }}
              >
                <Typography variant="h5" style={{ marginRight: 10 }}>
                  {userData && userData.username
                    ? userData.username
                    : "Unknown User"}

                  {userData && userData.is_artist === true ? (
                    <VerifiedIcon color="primary" fontSize="small" />
                  ) : (
                    <></>
                  )}
                </Typography>
                {userData && userData.worldcoin_status ? (
                  <>
                    <Box
                      style={{
                        backgroundColor: "#E6E0E9",
                        padding: "5px 10px",
                        borderRadius: "50px",
                      }}
                    >
                      <Typography
                        variant="p"
                        sx={{
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        Worldcoin verified
                      </Typography>
                    </Box>

                    {userData &&
                    !userData.is_artist &&
                    profileAddress ==
                      sessionStorage.getItem("loggedInAddress") ? (
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
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      >
                        Become artist
                      </Button>
                    ) : null}
                  </>
                ) : (
                  <>
                    {profileAddress ==
                      sessionStorage.getItem("loggedInAddress") && (
                      <VerifiedButton />
                    )}
                  </>
                )}
              </Box>
              <Typography
                variant="caption"
                sx={{ wordBreak: "break-all", mb: 1, fontWeight: "bold" }}
              >
                {profileAddress}
              </Typography>
              <Typography
                variant="body2"
                sx={{ mb: 1, mr: 4, textAlign: "left" }}
              >
                {userData && userData.bio
                  ? userData.bio
                  : "This user has no bio."}
              </Typography>
              <Box sx={{ mb: 1 }}>
                <IconButton size="small">
                  <TwitterIcon />
                </IconButton>
                <IconButton size="small">
                  <FacebookIcon />
                </IconButton>
                <IconButton size="small">
                  <InstagramIcon />
                </IconButton>
              </Box>
            </Box>

            <Box style={{}}>
              <Typography variant="h4">$906,211</Typography>
            </Box>
          </Box>

          <Grid
            container
            spacing={1}
            sx={{
              mt: 2,
              mb: 3,
              maxWidth: "500px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Grid item xs={4}>
              <Typography variant="subtitle2">Followers</Typography>
              <Typography variant="h6">269.1 M</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Following</Typography>
              <Typography variant="h6">791</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Earning</Typography>
              <Typography variant="h6">125.1 ETH</Typography>
            </Grid>
          </Grid>

          {searchParams.get("address") !== null && (
            <Box sx={{ mb: 3 }}>
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
                Follow
              </Button>
              <Button
                variant="contained"
                sx={{
                  mr: 2,
                  backgroundColor: "#333",
                  color: "#fff",
                  fontWeight: "bold",
                  px: 6,
                  py: 1,
                  borderRadius: "10px",
                }}
                onClick={() => {
                  handleChatDirect();
                }}
              >
                Message
              </Button>
            </Box>
          )}
          <Box
            sx={{
              borderBottom: "1px solid #000",
              maxWidth: "80px",
              pb: 1,
            }}
          >
            <Typography
              sx={{
                textAlign: "start",
                fontWeight: "bold",
              }}
            >
              Thread
            </Typography>
          </Box>
          <Card
            sx={{
              boxShadow: "none",
              maxWidth: "600px",
              paddingLeft: "0px",
              textAlign: "left",
            }}
          >
            {profileAddress === "0x69e75a2346ae86c1c70f91216e464811a99ed87f" ? (
              <CardContent sx={{ paddingLeft: "0px" }}>
                <Box sx={{ display: "flex", alignItems: "start", mb: 2 }}>
                  <Avatar
                    src="/path-to-justin-bieber-avatar.jpg"
                    sx={{ mr: 2 }}
                  />
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                    }}
                  >
                    <Typography variant="subtitle1">
                      Justin Bieber{" "}
                      <VerifiedIcon color="primary" fontSize="small" />
                    </Typography>
                    <Typography variant="body2">
                      New album is coming out. Check out my spotify now!!
                    </Typography>
                  </Box>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Typography variant="caption" sx={{ mr: 2 }}>
                    💬 21
                  </Typography>
                  <Typography variant="caption" sx={{ mr: 2 }}>
                    🔁 31
                  </Typography>
                  <Typography variant="caption" sx={{ mr: 2 }}>
                    ❤️ 4k
                  </Typography>
                </Box>
              </CardContent>
            ) : (
              <Typography
                variant="caption"
                sx={{ mt: 5, textAlign: "left", width: "100%" }}
              >
                User has not posted any threads yet.
              </Typography>
            )}
          </Card>
        </Paper>
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
              Become an Artist
            </Typography>

            <TextField
              sx={{
                minWidth: "600px",
                mb: 3,
              }}
              id="outlined-required"
              label="Artist Name"
              defaultValue={artistName}
              placeholder="Joe Mama"
              onChange={(e) => {
                setArtistName(e.target.value);
              }}
              autoComplete="off"
              required
            />

            <TextField
              sx={{
                minWidth: "600px",
                mb: 3,
              }}
              id="outlined-required"
              label="1 Credit Bundle Price (ETH)"
              defaultValue={price1}
              placeholder="0.0001"
              onChange={(e) => {
                setPrice1(e.target.value);
              }}
              autoComplete="off"
              required
            />

            <TextField
              sx={{
                minWidth: "600px",
                mb: 3,
              }}
              id="outlined-required"
              label="3 Credits Bundle Price (ETH)"
              defaultValue={price3}
              placeholder="0.0001"
              onChange={(e) => {
                setPrice3(e.target.value);
              }}
              autoComplete="off"
              required
            />

            <TextField
              sx={{
                minWidth: "600px",
                mb: 3,
              }}
              id="outlined-required"
              label="5 Credits Bundle Price (ETH)"
              defaultValue={price5}
              placeholder="0.0001"
              onChange={(e) => {
                setPrice5(e.target.value);
              }}
              autoComplete="off"
              required
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleRegisterNewArtist}
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
              Proceed
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
