import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLogin: false,
};

export const userManagementSlice = createSlice({
  name: 'userManagementSlice',
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      if(!action.payload) {
        state.users = []
      } else { 
        state.users = action.payload
      }
    }
  },
});

export const { setAllUsers } = userManagementSlice.actions;

export default userManagementSlice.reducer;
