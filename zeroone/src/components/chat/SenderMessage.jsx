import { Typography, Paper } from "@mui/material";

export default function SenderMessage({ message = "Message 1" }) {
  return (
    <Paper
      style={{
        padding: "15px 25px",
        marginBottom: 20,
        minWidth: "200px",
        maxWidth: "600px",
        alignSelf: "end",
        borderRadius: "50px",
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
  );
}
