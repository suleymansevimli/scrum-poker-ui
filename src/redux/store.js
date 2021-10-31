import { configureStore } from '@reduxjs/toolkit';
import userManagementSlice from './slices/user-management-slice';

export const store = configureStore({
  reducer: {
      userManagementSlice: userManagementSlice
  },
});
