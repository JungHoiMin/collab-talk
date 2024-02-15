import {createSlice} from "@reduxjs/toolkit";
import {TUserInfoState} from "@typings/states";

const initialState: TUserInfoState = {
  token: '',
  email: '',
  name: '',
  nickName: '',
}

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setToken: (state, action) => {
      sessionStorage.setItem('token', action.payload)
      state.token = action.payload
    },
    setEmail: (state, action) => {
      sessionStorage.setItem('email', action.payload)
      state.email = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setNickName: (state, action) => {
      state.nickName = action.payload
    },
    clearUserInfo: (state) => {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('email')
      state.token = '';
      state.email = '';
      state.name = '';
      state.nickName = '';
    },
  },
})

export const {
  setToken,
  setEmail,
  setName,
  setNickName,
  clearUserInfo,
} = userInfoSlice.actions

export default userInfoSlice.reducer