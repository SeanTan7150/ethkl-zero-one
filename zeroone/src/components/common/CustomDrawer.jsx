import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import { Button, Avatar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { sidebarList, sidebarDown } from "../../types";

const drawerWidth = 300;

export default function CustomDrawer({ open, toggleDrawer }) {
  console.log(open);
  return (
    <Drawer
      open={open}
      onClose={toggleDrawer}
      sx={{
        flexShrink: 0,
        width: drawerWidth,
        height: "100%",
        // paddingLeft: "2rem",
        // paddingRight: "2rem",

        //       border: 'none',
        //       backgroundColor: '#F8F9FA'
        "& .MuiDrawer-paper": {
          // overflowY: "hidden",
          width: drawerWidth,
          height: "100%",
          padding: "1rem 1rem",
          border: "none",
          display: "flex",
          flexDirection: "column",
          gap: "3.5rem",
          justifyContent: "space-between",
          backgroundColor: "#F8F9FA",
        },
      }}
      anchor="left"
    >
      {/* <Toolbar /> */}
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
            marginBottom: "1rem",
            gap: "1rem",
          }}
        >
          <img
            src="/P2Reach.png"
            style={{
              width: "60px",
              height: "60px",
            }}
          />
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "25px",
              color: "#000",
              textAlign: "center",
            }}
          >
            P2Reach
          </Typography>
        </div>
        <Divider />
        <div
          style={{
            marginBottom: "1rem",
          }}
        ></div>
        <List>
          {["Discover", "Chat", "Credit", "Store", "Profile"].map((text) => (
            <NavLink
              key={text}
              to={sidebarList[text].url}
              className={({ isActive, isPending }) =>
                isActive
                  ? "active router-nav-link"
                  : isPending
                  ? "pending router-nav-link"
                  : ""
              }
            >
              {({ isActive }) =>
                isActive ? (
                  <div
                    style={{
                      borderRadius: "20px",
                      color: "#333",
                      padding: "0.8rem 2rem",
                      backgroundColor: "#fff",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.3rem",
                    }}
                  >
                    <Avatar
                      src={sidebarList[text].active}
                      style={{
                        width: "25px",
                        height: "25px",
                        // backgroundColor: "#6FC635",
                        backgroundColor: "#333",
                        padding: "0.5rem",
                      }}
                    />
                    <Typography
                      style={{ marginLeft: "1rem", fontWeight: "bold" }}
                    >
                      {text}
                    </Typography>
                  </div>
                ) : (
                  <div
                    style={{
                      borderRadius: "20px",
                      padding: "0.8rem 2rem",
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "0.3rem",
                    }}
                  >
                    <Avatar
                      src={sidebarList[text].inactive}
                      style={{
                        width: "25px",
                        height: "25px",
                        backgroundColor: "#FFF",
                        padding: "0.5rem",
                      }}
                    />
                    <Typography
                      style={{ marginLeft: "1rem", fontWeight: "bold" }}
                    >
                      {text}
                    </Typography>
                  </div>
                )
              }
              {/* <div
              style={{
                borderRadius: "20px",
                padding: "0.8rem 2rem",
                backgroundColor: "#fff",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                marginBottom: "0.3rem",
              }}
            >
              <Avatar
                src={sidebarList[text].active}
                style={{
                  width: "25px",
                  height: "25px",
                  backgroundColor: "#6FC635",
                  padding: "0.5rem",
                }}
              />
              <Typography
                style={{ marginLeft: "1rem", fontWeight: "bold" }}
              >
                {text}
              </Typography>
            </div> */}
            </NavLink>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
