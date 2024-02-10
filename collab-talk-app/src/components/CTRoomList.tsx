import React from "react";
import {Avatar, Divider, List, ListItem, ListItemButton, ListItemIcon} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import {useNavigate} from "react-router-dom";

const rooms = ['room1', 'room2', 'room3', 'room4', 'room5'];
export const CTRoomList = () => {
  const navigate = useNavigate();

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: name[0],
    };
  }

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => {navigate('/home/dm')}}>
            <Avatar sx={{ bgcolor: deepOrange[500] }} variant="square">
              DM
            </Avatar>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {rooms.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => {navigate(`/home/room/${text}`)}}>
              <Avatar {...stringAvatar(text)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )

}