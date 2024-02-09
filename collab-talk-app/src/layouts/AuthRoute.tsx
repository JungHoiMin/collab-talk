import React from 'react';
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "@hooks/hooks";
import {Outlet} from "react-router";
import {setToken} from "@stores/UserInfoSlice";
import {setAuthorizationToken} from "@apis/AxiosInstance";

const AuthRoute: React.FC = () => {
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => {
    const reduxToken = state.userInfo.token;
    const sessionToken = sessionStorage.getItem('token') || '';

    if (reduxToken === '') {
      if (sessionToken === '') {
        return '';
      }
      dispatch(setToken(sessionToken))
      return sessionToken;
    }
    return reduxToken;
  });

  if (token !== '') {
    setAuthorizationToken(token);
    return <Outlet/>;
  } else {
    return <Navigate to="auth/login" />;
  }
}

export default AuthRoute;
