import React, {useEffect} from "react";
import {CTTitleBar} from "@components/CTTitleBar";
import {CTRoomsList} from "@components/CTRoomsList";
import {Box, CssBaseline, Drawer} from "@mui/material";
import {Outlet} from "react-router";
import {getBadgeConnection} from "@apis/home/HomeApi";

const Home = () => {
  let badgeConnection;
  useEffect(() => {
    badgeConnection = getBadgeConnection();
  }, [])
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
        </Box>
      </div>
    </>
  )
}

export default Home
