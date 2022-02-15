import { createSlice } from '@reduxjs/toolkit';
import { JOINING_ROOM_STATUS_ENUMS } from '../../wrappers/auth/auth-enums';

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
      state.rooms = action.payload
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
    },

    setUserDisconnected: (state, action) => {
      const user = state.users.find(user => user.uniqueId === action.payload.uniqueId);
      state.users = [user, ...state.users];
    },

    setClientId: (state, action) => {
      state.loginedUser.id = action.payload.id;
    }
  },
});

export const {
  setAllUsers,
  setSelfUserInfo,
  setIsRoomCreating,
  setJoinedRoom, setAllRooms,
  updateRoomList,
  setIsJoiningRoom,
  setUserDisconnected,
  setClientId
} = userManagementSlice.actions;

export default userManagementSlice.reducer;