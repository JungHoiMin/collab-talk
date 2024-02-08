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
    }
  }
})

export const { setToken, setEmail, setName, setNickName } = userInfoSlice.actions

export default userInfoSlice.reducer