import {configureStore} from "@reduxjs/toolkit";
import userInfoReducer from "./UserInfoSlice";

export default configureStore({
  reducer: {
    userInfo: userInfoReducer
  },
})