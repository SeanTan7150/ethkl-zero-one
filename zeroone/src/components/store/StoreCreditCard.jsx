import { Box, Typography } from "@mui/material";

export default function StoreCreditCard({
  isActive,
  onPressCard,
  label,
  description,
  image,
}) {
  return (
    <Box
      onClick={onPressCard}
      className={`
        ${isActive ? "active-credit-card" : ""}
      `}
      sx={{
        padding: "1rem 2rem",
      }}
    >
      {/* Picture */}
      <Box
        sx={{
          width: "200px",
          height: "200px",
          borderRadius: "10px",
          overflow: "hidden",
          mb: 2,
        }}
      >
        <img
          style={{
            width: "200px",
            height: "200px",
          }}
          src="src/assets/store/store-placeholder.jpg"
        />
      </Box>
      <Typography
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "18px",
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          // fontWeight: "bold",
          textAlign: "center",
          fontSize: "14px",
          mb: 1,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
