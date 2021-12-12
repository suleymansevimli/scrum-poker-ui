import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loginedUser: {},
  isRoomCreating: false,
  rooms: [],
  joinedRoom: {},
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

    setIsRoomCreating: (state, action) => {
      state.isRoomCreating = action.payload;
    },

    setJoinedRoom: (state, action) => {
      state.joinedRoom = action.payload;
    },

    setAllRooms: (state, action) => {
      if (!action.payload) {
        state.rooms = []
      } else {
        state.rooms = action.payload
      }
    }
  },
});

export const { setAllUsers, setSelfUserInfo, setIsRoomCreating, setJoinedRoom, setAllRooms } = userManagementSlice.actions;

export default userManagementSlice.reducer;