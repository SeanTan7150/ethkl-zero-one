import React from "react";
import {
  Box,
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
import {
  Explore as DiscoverIcon,
  Chat as ChatIcon,
  FavoriteBorder as CreditIcon,
  Person as ProfileIcon,
  History as HistoryIcon,
  Verified as VerifiedIcon,
  Add as AddIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

export default function ProfilePage() {
  return (
    <Box
      sx={{
        flex: 1,
        p: 2,
        maxWidth: 800,
        marginLeft: "auto",
        marginRight: "auto",
        // backgroundColor: "#fff",
      }}
    >
      {/* <Typography variant="h4" sx={{ mb: 2 }}>
        Justin Bieber <VerifiedIcon color="primary" />
      </Typography> */}

      <Paper
        elevation={0}
        sx={{ p: 3, mb: 3, backgroundColor: "#fff", borderRadius: "8px" }}
      >
        <Box
          style={{
            display: "flex",
          }}
        >
          {/* Avatar */}
          <Box>
            <Avatar
              src="/path-to-avatar.jpg"
              style={{
                width: "120px",
                height: "120px",
                flex: 1,
                margin: "0rem 2.5rem 0rem 1rem",
              }}
            />
          </Box>

          {/* Information */}
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
              sx={{
                mb: 1,
              }}
            >
              <Typography
                variant="h5"
                style={{
                  marginRight: 10,
                }}
              >
                Justin Bieber <VerifiedIcon color="primary" fontSize="small" />
              </Typography>
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
            </Box>
            <Typography
              variant="caption"
              sx={{ wordBreak: "break-all", mb: 1, fontWeight: "bold" }}
            >
              0x69e75a2346ae86c1c70f91216e464811a99ed87f
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Add a bio to introduce yourself
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
              {/* <Button startIcon={<AddIcon />} variant="outlined" size="small">
                Add
              </Button> */}
            </Box>
          </Box>

          {/* Net Worth */}
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

        {/* Action  */}
        <Box
          sx={{
            mb: 3,
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              mr: 2,
              backgroundColor: "#E8DEF8",
              color: "#000",
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
              backgroundColor: "#E8DEF8",
              color: "#000",
              fontWeight: "bold",
              px: 6,
              py: 1,
              borderRadius: "10px",
            }}
          >
            Message
          </Button>
        </Box>

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
          }}
        >
          <CardContent
            sx={{
              paddingLeft: "0px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "start", mb: 2 }}>
              <Avatar src="/path-to-justin-bieber-avatar.jpg" sx={{ mr: 2 }} />
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
              <Typography
                variant="caption"
                sx={{
                  mr: 2,
                }}
              >
                💬 21
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  mr: 2,
                }}
              >
                🔁 31
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  mr: 2,
                }}
              >
                ❤️ 4k
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2">Or</Typography>
          <Typography variant="body1">
            User have not post any thing yet
          </Typography>
        </Box> */}
      </Paper>
    </Box>
  );
}
