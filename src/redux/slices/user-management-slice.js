import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLogin: false,
};

export const userManagementSlice = createSlice({
  name: 'userManagementSlice',
  initialState,
  reducers: {
    userInformations: (state, action) => {
      state.users.push({
        ...action.payload
      })
    },
  },
});

export const { userInformations } = userManagementSlice.actions;

export default userManagementSlice.reducer;
