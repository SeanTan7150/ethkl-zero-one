import { Typography, Paper, Box, Button } from "@mui/material";

export default function SenderMessage({
  message = "Message 1",
  direction,
  is_p2r = false,
  onSelectReply,
}) {
  return (
    <Box
      style={{
        alignSelf: "start",
        alignItem: "start",
        display: "flex",
        flex: 1,
        marginBottom: 10,
      }}
    >
      <Paper
        style={{
          padding: "15px 25px",
          marginBottom: 5,
          minWidth: "100px",
          maxWidth: "40%",
          borderRadius: "50px",
          marginLeft: direction === "end" && "auto",
          backgroundColor: direction === "end" ? "#fff" : "#333",
          color: direction === "end" ? "black" : "white",
        }}
      >
        <Typography
          variant="body1"
          style={{
            textAlign: "start",
          }}
        >
          {message}
        </Typography>
      </Paper>
      {is_p2r && (
        <Button
          sx={{
            display: "flex",
            justifyContent: "start",
            marginRight: "auto",
            marginBottom: 2,
            textDecoration: "underline",
          }}
          onClick={onSelectReply}
        >
          Reply
        </Button>
      )}
    </Box>
  );
}
