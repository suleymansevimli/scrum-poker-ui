import { setActiveTab, setAllTasks, setStartVoting, setStopVoting, setUserVoteList, toggleDetailModal } from "../../redux/slices/planning-slice";
import { planningSocket } from "../socket-connections";
import { PLANNING_EVENT_TYPES } from "./planning-enums";

/**
 * Planning Socket Listener
 * 
 * Namespace'i `/planning` olan eventleri dinleyen listener
 * 
 * @param {Object} {
 *  `dispatch`: ReduxDispatch, 
 *  `useAuth`: AuthContext
 * }
 * @returns {void}
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli) 
 */
const PlanningSocketListener = ({ dispatch }) => {

    /**
     * GET ALL TASKS
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    planningSocket.on(PLANNING_EVENT_TYPES.GET_ALL_TASKS, data => {
        const { tasks } = data;
        dispatch(setAllTasks({ tasks }))
    });

    /**
     * CREATE TASK REQUEST ACCEPTED
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    planningSocket.on(PLANNING_EVENT_TYPES.CREATE_TASK_REQUEST_ACCEPTED, data => {
        console.log('***-create-task-request-accepted', data, '/planning')
    });

    /**
     * CREATE TASK REQUEST REJECTED
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    planningSocket.on(PLANNING_EVENT_TYPES.CREATE_TASK_REQUEST_REJECTED, data => {
        alert('Something went wrong!')
    });

    /**
     * START VOTING REQUEST ACCEPTED
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    planningSocket.on(PLANNING_EVENT_TYPES.START_VOTING_REQUEST_ACCEPTED, ({ task }) => {
        dispatch(setStartVoting({ task }))
        dispatch(setActiveTab("IN_PROGRESS"))
    });

    /**
     * START VOTING REQUEST REJECTED
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    planningSocket.on(PLANNING_EVENT_TYPES.START_VOTING_REQUEST_REJECTED, data => {
        console.log('***-start-voting-request-rejected', data, '/planning')
    });

    /**
     * STOP VOTING REQUEST ACCEPTED
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    planningSocket.on(PLANNING_EVENT_TYPES.STOP_VOTING_REQUEST_ACCEPTED, ({ task }) => {
        // dispatch(setStopVoting({ task }));
        dispatch(toggleDetailModal({ isOpen: true, task }))
    });

    /**
     * STOP VOTING REQUEST REJECTED
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    planningSocket.on(PLANNING_EVENT_TYPES.VOTE_REQUEST_ACCEPTED, ({ task }) => {
        // dispatch(setCurrentTask(task))
    });

    /**
     * CURRENT USER VOTE LIST UPDATED
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    planningSocket.on(PLANNING_EVENT_TYPES.CURRENT_USER_VOTE_LIST_UPDATED, ({ userVoteList }) => {
        dispatch(setUserVoteList(userVoteList))
    })

}

export default PlanningSocketListener;