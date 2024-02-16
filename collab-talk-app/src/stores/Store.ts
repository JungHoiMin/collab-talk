import {configureStore} from "@reduxjs/toolkit";
import userInfoReducer from "@stores/UserInfoSlice";
import alarmReducer from "@stores/AlarmSlice"

export const store = configureStore({
  reducer: {
    userInfo: userInfoReducer,
    alarm: alarmReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;