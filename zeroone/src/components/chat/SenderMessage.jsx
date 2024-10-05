import { Typography, Paper } from "@mui/material";

export default function SenderMessage({ message = "Message 1", direction }) {
  return (
    <Paper
      style={{
        padding: "15px 25px",
        marginBottom: 20,
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
  );
}
