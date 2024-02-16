import {createSlice} from "@reduxjs/toolkit";
import {TAlarmState} from "@typings/states";

const initialState: TAlarmState = {
  badge: 0,
  requestFriend: 0,
}

export const alarmSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {
    setBadge: (state, action) => {
      state.badge = action.payload
    },
    increaseBadge: (state) => {
      state.badge = state.badge + 1;
    },
    setRequestFriend: (state, action) => {
      state.requestFriend = action.payload
    },
    increaseRequestFriend: (state) => {
      state.requestFriend = state.badge + 1;
    },
    clearAlarm: (state) => {
      state.badge = 0;
      state.requestFriend = 0;
    },
  },
})

export const {
  setBadge,
  increaseBadge,
  clearAlarm,
  setRequestFriend,
  increaseRequestFriend,
} = alarmSlice.actions

export default alarmSlice.reducer