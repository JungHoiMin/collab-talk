import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

const AuthRouter = ({element}) => {
  const [isLogined, setIsLogined] = useState(false);
  const token = useSelector((state) => state.userInfo.token)
  useEffect(() => {
    setIsLogined(token !== '')
  }, [token]);

  return isLogined
      ? (element)
      : (<Navigate to="/auth/login" {...alert("로그인이 필요합니다.")}></Navigate>);
}

export default AuthRouter;
