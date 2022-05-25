import { createSlice } from "@reduxjs/toolkit";
import { tabs } from "../../constants/room-constants";

const initialState = {
    tasks: {
        OPEN: [],
        IN_PROGRESS: [],
        DONE: []
    },
    isShowCreateTaskModal: false,
    isVoting: false,
    activeTab: 0,
    votingTask: null,
    userRatingList: [],
    lastVotedTask: {}
}

export const planningSlice = createSlice({
    name: 'planningSlice',
    initialState,
    reducers: {
        setAllTasks: (state, { payload }) => {
            state.tasks = payload.tasks
        },

        setActiveTab: (state, { payload }) => {
            const getIndex = tabs.findIndex(tab => tab.key === payload)
            state.activeTab = getIndex
        },

        setVotingTask: (state, { payload }) => {
            state.votingTask = payload
        },

        setIsShowCreateTaskModal: (state, { payload }) => {
            state.isShowCreateTaskModal = !(state.isShowCreateTaskModal)
        },

        setStartVoting: (state, { payload }) => {
            // task state changes
            state.tasks.OPEN = state.tasks.OPEN.filter(task => task.taskId !== payload.task.taskId);
            state.tasks.IN_PROGRESS = [...state.tasks.IN_PROGRESS, payload.task];
            state.activeTab = "IN_PROGRESS";

            state.userRatingList.forEach(userRating => { 
                userRating.rating = '-';
            });
            
            // voting state changes
            state.isVoting = true;
            state.votingTask = payload.task;
        },

        setIsVoting: (state, { payload }) => {
            state.isVoting = payload
        },

        setStopVoting: (state, { payload }) => {
            state.isVoting = false

            state.tasks.IN_PROGRESS = state.tasks.IN_PROGRESS.filter(task => task.id !== payload.task.id)
            state.tasks.DONE = [...state.tasks.DONE, payload.task];

            state.votingTask = null;
            state.lastVotedTask = payload.task;
        },

        setUserRatingList: (state, { payload }) => {
            state.userRatingList = payload
        },
    }
});

export const {
    setAllTasks,
    setStartVoting,
    setIsVoting,
    setStopVoting,
    setActiveTab,
    setVotingTask,
    setUserRatingList
} = planningSlice.actions;

export default planningSlice.reducer;