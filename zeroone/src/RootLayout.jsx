import CustomDrawer from "./components/common/CustomDrawer";
import CustomAppBar from "./components/common/CustomAppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Outlet, useLocation } from "react-router-dom";
import { matchPathName } from "./utils";
import { useState } from "react";

// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: "8px",
//   backgroundColor: "#ECECEC",
//   "&:hover": {
//     backgroundColor: "#ECECEC",
//   },
//   marginLeft: 0,
//   width: "280px",

// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   width: "100%",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     [theme.breakpoints.up("sm")]: {
//       width: "12ch",
//       "&:focus": {
//         width: "20ch",
//       },
//     },
//   },
// }));

export default function RootLayout() {
  const location = useLocation();
  const breadcrumb = matchPathName(location.pathname);
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <CustomAppBar
        toggleDrawer={() => {
          console.log(open);
          setOpen(!open);
        }}
      />
      <CustomDrawer
        open={open}
        toggleDrawer={() => {
          setOpen(false);
        }}
      />
      <Box
        sx={{
          // backgroundColor: "#000",
          // borderRadius: 8,
          flexGrow: 2,
          height: "100%",
          padding: "2rem 2rem 14rem 3rem",
          backgroundColor: "#fff",
        }}
      >
        {/* Top Section */}
        {/* <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <Breadcrumbs
              aria-label="breadcrumb"
              sx={{
                marginBottom: "1rem",
              }}
            >
              <Typography color="#A0AEC0">Pages</Typography>
              <Typography color="text.primary">{breadcrumb}</Typography>
            </Breadcrumbs>
            <Typography
              color="text.primary"
              sx={{
                fontWeight: "bold",
              }}
            >
              {breadcrumb}
            </Typography>
          </div>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Type here..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </div> */}
        <Outlet />
      </Box>
    </Box>
  );
}
