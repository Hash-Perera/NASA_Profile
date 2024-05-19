import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

export default function AppDrawer({ isOpen, toggleDrawer }) {
  const Navigate = useNavigate();

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
      <Divider />
      <List>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton
            onClick={() => {
              Navigate("/dashboard");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Mars Rover" disablePadding>
          <ListItemButton
            onClick={() => {
              Navigate("/marsrover");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Mars Rover" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Mars Rover" disablePadding>
          <ListItemButton
            onClick={() => {
              Navigate("/earth");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Earth Imagery" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Favourites" disablePadding>
          <ListItemButton
            onClick={() => {
              Navigate("/favourites");
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Favourites" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <Drawer open={isOpen} onClose={toggleDrawer}>
        {DrawerList}
      </Drawer>
    </>
  );
}
