import React from "react";
import {Divider, List, ListItem, ListItemButton} from "@mui/material";
import {useNavigate} from "react-router-dom";
import PersonAddIcon from '@mui/icons-material/PersonAdd';

export const CTFriendsList = () => {
  const navigate = useNavigate()
  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => {navigate('/home/dm/addFrend')}}>
            <PersonAddIcon />
            친구추가
          </ListItemButton>
        </ListItem>
        <Divider/>
      </List>
    </>
  )
}