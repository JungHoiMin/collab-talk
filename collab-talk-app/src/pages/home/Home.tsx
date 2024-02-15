import React from "react";
import {CTTitleBar} from "@components/CTTitleBar";
import {CTRoomsList} from "@components/CTRoomsList";
import {Box, CssBaseline, Drawer} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {CTDm} from "@pages/home/dm/CTDm";
import {CTRoom} from "@pages/home/room/CTRoom";
import {Outlet} from "react-router";


const Home = () => {

  return (
    <>
      <div>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <CTTitleBar />

          <Box
            component="nav"
            sx={{ width: { sm: 70 }, flexShrink: { sm: 0 } }}
          >
            <CTRoomsList />
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, pt: 10, pl: 2, width: { sm: `calc(100% - ${70}px)` } }}
          >
            <Outlet />
          </Box>
        {/*<Drawer variant="permanent">*/}
        {/*  <List component="nav">*/}
        {/*    <ListItemButton>*/}
        {/*      <ListItemText primary="Daa"/>*/}
        {/*    </ListItemButton>*/}
        {/*  </List>*/}
        {/*</Drawer>*/}
        </Box>
      </div>
    </>
  )
}

export default Home
