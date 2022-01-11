import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: {
        OPEN: [],
        IN_PROGRESS: [],
        DONE: []
    },
    isShowCreateTaskModal: false
}

export const planningSlice = createSlice({
    name: 'planningSlice',
    initialState,
    reducers: {
        setAllTasks: (state, { payload }) => {
            state.tasks = payload.tasks
        },

        setIsShowCreateTaskModal: (state, { payload }) => {
            state.isShowCreateTaskModal = !(state.isShowCreateTaskModal)
        }
    }
});

export const { setAllTasks } = planningSlice.actions;
export default planningSlice.reducer;