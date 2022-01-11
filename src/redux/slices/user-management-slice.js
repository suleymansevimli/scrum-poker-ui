import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loginedUser: {},
  isRoomCreating: false,
  rooms: [],
  joinedRoom: {},
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

    setAllRooms: (state, action) => {
      if (!action.payload) {
        state.rooms = []
      } else {
        state.rooms = action.payload
      }
    },

    updateRoomList: (state, action) => {
      state.rooms = [...state.rooms, action.payload]
    },

    setIsRoomCreating: (state, action) => {
      state.isRoomCreating = action.payload;
    },

    setJoinedRoom: (state, action) => {
      state.isJoiningRoom = false;
      state.joinedRoom = action.payload;
    },

    setIsJoiningRoom: (state, action) => {
      state.isJoiningRoom = action.payload;
    }
  },
});

export const {
  setAllUsers,
  setSelfUserInfo,
  setIsRoomCreating,
  setJoinedRoom, setAllRooms,
  updateRoomList,
  setIsJoiningRoom
} = userManagementSlice.actions;

export default userManagementSlice.reducer;