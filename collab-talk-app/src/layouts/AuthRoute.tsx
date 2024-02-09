import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {useAppSelector} from "@hooks/hooks";
import {Outlet} from "react-router";

const AuthRoute: React.FC = () => {
  const token = useAppSelector((state) => state.userInfo.token) || sessionStorage.getItem('token') || '';

  if (token !== '') {
    return <Outlet/>;
  } else {
    return <Navigate to="auth/login" />;
  }
}

export default AuthRoute;
