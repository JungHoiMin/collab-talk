import React from "react";
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Signup from "@pages/auth/signup/Signup";
import Login from "@pages/auth/login/Login";
import Home from "@pages/home/Home";
import Init from "@pages/home/init/Init";
import AuthRoute from "@layouts/AuthRoute";
import {CTDm} from "@pages/home/dm/CTDm";
import {CTRoom} from "@pages/home/room/CTRoom";

const App = () => {
  return (
      <Routes>
        <Route path="/auth/*">
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<AuthRoute/>} >
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="init" element={<Init />} />
          <Route path="home" element={<Home />} >
            <Route path="dm" element={<CTDm />}/>
            <Route path="room/:roomId" element={<CTRoom />} />
          </Route>
        </Route>
      </Routes>
  );
}

export default App;
