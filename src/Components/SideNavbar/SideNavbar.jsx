import * as React from "react";
import { NavLink } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Paper,
  styled,
  Popover
} from "@mui/material";
import { setSelectedNavIndex } from "../../redux/reducers/appReducer";
import { useDispatch, useSelector } from "react-redux";
import "./SideNavbar.css";
import { AdminPanelSettings, BarChart, CardGiftcardOutlined, HelpOutline, Stars } from "@mui/icons-material";
  import Menu from '@mui/material/Menu';
  import MenuItem from '@mui/material/MenuItem'; 
  import AccountBoxIcon from '@mui/icons-material/AccountBox';

function SideNavBar() {
  return (
    <div>
      <Paper
        elevation={2}
        className="side-bar"
        style={{ backgroundColor: "#002947", borderRadius: "0",  }}
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event,index) => {
    dispatch(setSelectedNavIndex(index));
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const handleClose = () => {
      setAnchorEl(null);
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
      <NavItem icon={<CardGiftcardOutlined sx={{ color: "#fff" }} />} route="appreciate" label="My Feed" index={0} subMenu={false} />
      <NavItem  index={1} subMenu={true} id="basic-button"
           aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
           aria-expanded={open ? 'true' : undefined}
           icon={<AccountBoxIcon sx={{ color: "#fff" }}/>}
           label="My Profile"
           route="received"></NavItem>
      <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          sx={{top: "6rem",
          left: "5.2rem"}}
        >
          <MenuItem><NavItem icon={<Stars sx={{ color: "#1D1D1D" }} />} route="received" label="Appreciations Received" index={2} subMenu={false}/></MenuItem>
          <MenuItem><NavItem icon={<BarChart sx={{ color: "#1D1D1D" }} />} route="sent" label="Appreciations Sent" index={3} subMenu={false} /></MenuItem>
        </Menu>
      <NavItem icon={<HelpOutline sx={{ color: "#fff" }} />} route="help" label="Help" index={4} />
      <NavItem icon={<AdminPanelSettings sx={{ color: "#fff" }} />} show={appReducerState.userRole === "admin"} route="allAppreciation" label="Appreciations (Admin)" index={5} />

    </List>
  );
  function NavItem({ subMenu, icon = null, route = "", label = "", show = true, index = 0 }) {
    return (
      subMenu ?<NavLink
      to={`/${route}`}
      style={{
        textDecoration: "none",
      }}
    >
      <NavListItemButton
        disableRipple
        selected={appReducerState.selectedNavIndex === index}
        onClick={(event) => {
          handleClick(event, index)
        }}
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
    </NavLink>
     : 
     <NavLink
      to={`/${route}`}
      style={{
        textDecoration: "none",
      }}
    >
      <NavListItemButton
        disableRipple
        selected={appReducerState.selectedNavIndex === index}
        onClick={(event) => {
          handleListItemClick(event, index)
        }}
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
    </NavLink>
    );
  }
};