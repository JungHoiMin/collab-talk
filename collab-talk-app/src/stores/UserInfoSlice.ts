import {createSlice} from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: {
    token: '',
    email: '',
    name: '',
    nickName: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setName: (state, action) => {
      state.name = action.payload
    },
    setNickName: (state, action) => {
      state.nickName = action.payload
    },
    clearUserInfo: (state) => {
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