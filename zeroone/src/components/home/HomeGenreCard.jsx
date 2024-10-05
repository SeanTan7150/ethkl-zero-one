import { Box, Card, CardMedia, Typography } from "@mui/material";

export default function HomeGenreCard() {
  return (
    <Card
      sx={{
        display: "flex",
        width: "350px",
        height: "80px",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 80 }}
        image="src/assets/store/store-placeholder.jpg"
        alt="Live from space album cover"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pl: 3,
        }}
      >
        <Typography
          component="div"
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Live From Space
        </Typography>
      </Box>
    </Card>
  );
}
