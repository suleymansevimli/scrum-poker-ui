import { configureStore } from '@reduxjs/toolkit';
import planningSlice from './slices/planning-slice';
import userManagementSlice from './slices/user-management-slice';

export const store = configureStore({
  reducer: {
      userManagementSlice: userManagementSlice,
      planningSlice: planningSlice
  },
});
