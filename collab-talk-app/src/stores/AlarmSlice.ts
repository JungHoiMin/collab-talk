import {createSlice} from "@reduxjs/toolkit";
import {TAlarmState} from "@typings/states";

const initialState: TAlarmState = {
  badge: 0,
  alarmList: [],
  requestFriend: 0,
}

export const alarmSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {
    setBadge: (state, action) => {
      state.badge = action.payload
      sessionStorage.setItem('badge', `${state.badge}`)
    },
    increaseBadge: (state) => {
      state.badge = state.badge + 1;
      sessionStorage.setItem('badge', `${state.badge}`)
    },
    setAlarmList: (state, action) => {
      state.alarmList = action.payload
      sessionStorage.setItem('alarmList', JSON.stringify(state.alarmList))
    },
    pushAlarmList: (state, action) => {
      state.alarmList = [action.payload, ...state.alarmList];
      sessionStorage.setItem('alarmList', JSON.stringify(state.alarmList))
    },
    checkAlarm: (state, action) => {
      state.alarmList = state.alarmList.map((alarm, idx) => {
        const newAlarm = alarm
        if (action.payload === idx) {
          newAlarm.is_check = 'Y'
        }
        return newAlarm
      })
      sessionStorage.setItem('alarmList', JSON.stringify(state.alarmList))
      // db 에도 반영해야함

      state.badge = state.alarmList.filter((alarm) => alarm.is_check === 'N').length;
      sessionStorage.setItem('badge', `${state.badge}`)
      // db 에도 반영해야함
    },
    setRequestFriend: (state, action) => {
      state.requestFriend = action.payload
      sessionStorage.setItem('requestFriend', `${state.badge}`)
    },
    increaseRequestFriend: (state) => {
      state.requestFriend = state.requestFriend + 1;
      sessionStorage.setItem('requestFriend', `${state.badge}`)
    },
    clearAlarm: (state) => {
      sessionStorage.removeItem('badge')
      sessionStorage.removeItem('alarmList')
      sessionStorage.removeItem('requestFriend')
      state.badge = 0;
      state.alarmList = [];
      state.requestFriend = 0;
    },
  },
})

export const {
  setBadge,
  increaseBadge,

  setAlarmList,
  pushAlarmList,
  checkAlarm,

  clearAlarm,
  setRequestFriend,
  increaseRequestFriend,
} = alarmSlice.actions

export default alarmSlice.reducer