import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loginedUser: {},
  isRoomCreating: false,
  room: {},
  isJoiningRoom: false,
};

export const userManagementSlice = createSlice({
  name: 'userManagementSlice',
  initialState,
  reducers: {

    setAllUsers: (state, action) => {
      if (!action.payload) {
        state.users = []
      } else {
        state.users = action.payload
      }
    },

    setSelfUserInfo: (state, action) => {
      state.loginedUser = action.payload;
    },

    setRoom: (state, action) => {
      state.room = action.payload.room ? action.payload.room : {};
    },

    setIsRoomCreating: (state, action) => {
      state.isRoomCreating = action.payload;
    },

    setIsJoiningRoom: (state, action) => {
      state.isJoiningRoom = action.payload;
    },

    setUserDisconnected: (state, action) => {
      if(!(action.payload)){
        return;
      }
      const userIndex = state.users.findIndex(user => user.id === action.payload.user.uniqueId);
      state.users[userIndex] = action.payload;
      state.users = [...state.users];
    },

    setClientId: (state, action) => {
      state.loginedUser.id = action.payload.id;
    },

    setUserType: (state, action) => {
      state.loginedUser.userType = action.payload;
    }
  },
});

export const {
  setAllUsers,
  setSelfUserInfo,
  setIsRoomCreating,
  setRoom,
  updateRoomList,
  setIsJoiningRoom,
  setUserDisconnected,
  setClientId,
  setUserType
} = userManagementSlice.actions;

export default userManagementSlice.reducer;