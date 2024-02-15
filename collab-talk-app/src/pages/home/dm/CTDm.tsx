import "@pages/home/Home.css"
import React from "react";
import {Box} from "@mui/material";
import {CTFriendsList} from "@components/CTFriendsList";
import {Outlet} from "react-router";
export const CTDm = () => {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          className="ctDmNav"
          component="nav"
          sx={{ width: { sm: 200 }, flexShrink: { sm: 0 } }}
        >
          <CTFriendsList />
        </Box>
        <Box
          component="main"
          sx={{ flexGrow: 1, pl: 2, width: { sm: `calc(100% - ${70 + 200}px)` } }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  )
}