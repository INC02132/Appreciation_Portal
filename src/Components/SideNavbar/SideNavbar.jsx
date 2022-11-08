import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  Typography,
  Paper,
  styled,
} from "@mui/material";
import { setSelectedNavIndex } from "../../redux/reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";
import "./SideNavbar.css";
import { AdminPanelSettings, BarChart, CardGiftcardOutlined, Stars } from "@mui/icons-material";

function SideNavBar() {
  return (
    <div>
      <Paper
        elevation={2}
        className="side-bar"
        style={{ backgroundColor: "#002947", borderRadius: "0" }}
      >
        <div style={{ width: "100px" }}>
          <SelectedListItem />
        </div>
      </Paper>
    </div>
  );
}


export default SideNavBar;
const NavListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: "0",
  paddingTop: "1vh",
  paddingBottom: "0.5vh",
  paddingLeft: "5px",
  //   borderLeft: "5px solid #119AFF",
}));

const NavListItem = styled(ListItem)(({ theme }) => ({
  display: "block",
  minHeight: 48,
  textAlign: "center !important",
  autofocus: "false",
  textDecoration: "none",
}));
const NavListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  alignContent: "center",
  minWidth: 0,
  justifyContent: "center",
  color: "primary.light",
  textDecoration: "none",
}));

const SelectedListItem = () => {
  const appReducerState = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();

  const handleListItemClick = (event, index) => {
    dispatch(setSelectedNavIndex(index));
  };

  return (
    <List
      component="nav"
      sx={{
        "&& .Mui-selected, && .Mui-selected:hover": {
          borderLeft: "5px solid #119AFF",
          bgcolor: "#ffffff30",
          paddingLeft: "3px",
          "&, & .MuiListItemIcon-root": {
            color: "#DBD5D5",
          },
        },
        "& .MuiListItemButton-root:hover": {},
      }}
    >
      <NavItem icon={<CardGiftcardOutlined sx={{ color: "#fff" }} />} route="appreciate" label="My Feed" index={0} />
      <NavItem icon={<Stars sx={{ color: "#fff" }} />} route="received" label="Appreciations Received" index={1} />
      <NavItem icon={<BarChart sx={{ color: "#fff" }} />} route="sent" label="Appreciations Sent" index={2} />
      <NavItem icon={<AdminPanelSettings sx={{ color: "#fff" }} />} show={appReducerState.userRole === "admin"} route="allAppreciation" label="Appreciations (Admin)" index={3} />
    </List>
  );

  function NavItem({ icon = null, route = "", label = "", show = true, index = 0 }) {
    return (
      show ? <NavLink
        to={`/${route}`}
        style={{
          textDecoration: "none",
        }}
      >
        <NavListItemButton
          disableRipple
          selected={appReducerState.selectedNavIndex === index}
          onClick={(event) => handleListItemClick(event, index)}
        >
          <NavListItem disablePadding>
            <NavListItemIcon>
              {icon}
            </NavListItemIcon>
            <Typography
              display="block"
              sx={{
                fontSize: 12,
                justifyContent: "center",
                flexGrow: 1,
                textAlign: "center !important",
                textDecoration: "none",
                color: "primary.light",
              }}
            >
              {label}
            </Typography>
          </NavListItem>
        </NavListItemButton>
      </NavLink> : null
    );
  }
};
