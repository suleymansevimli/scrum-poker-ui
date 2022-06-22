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
    currentTask: null,
    lastVotedTask: {},
    detailModalIsOpen: false,
    detailModalData: {}
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

        setCurrentTask: (state, { payload }) => {
            state.currentTask = payload
        },

        setIsShowCreateTaskModal: (state, { payload }) => {
            state.isShowCreateTaskModal = !(state.isShowCreateTaskModal)
        },

        setStartVoting: (state, { payload }) => {
            // task state changes
            state.tasks.OPEN = state.tasks.OPEN.filter(task => task.taskId !== payload.task.taskId);
            state.tasks.IN_PROGRESS = [payload.task];
            state.activeTab = "IN_PROGRESS";

            // voting state changes
            state.isVoting = true;
            state.currentTask = payload.task;
        },

        setIsVoting: (state, { payload }) => {
            state.isVoting = payload
        },

        setStopVoting: (state, { payload }) => {
            state.isVoting = false

            state.tasks.IN_PROGRESS = state.tasks.IN_PROGRESS.filter(task => task.id !== payload.task.id)
            state.tasks.DONE = [...state.tasks.DONE, payload.task];

            state.currentTask = {};
            state.lastVotedTask = payload.task;
        },

        setUserVoteList: (state, { payload }) => {
            state.currentTask.userVoteList = payload;
        },

        toggleDetailModal: (state, { payload }) => {
            const { isOpen } = payload;
            state.detailModalData = isOpen ? payload.task : {}
            state.detailModalIsOpen = isOpen;
        }
    }
});

export const {
    setAllTasks,
    setStartVoting,
    setIsVoting,
    setStopVoting,
    setActiveTab,
    setCurrentTask,
    setUserVoteList,
    toggleDetailModal
} = planningSlice.actions;

export default planningSlice.reducer;