import { setAllTasks } from "../../redux/slices/planning-slice";
import { planningSocket } from "../socket-connections";
import { PLANNING_EVENT_TYPES } from "./planning-enums";

/**
 * Planning Socket Listener
 * 
 * Namespace'i /planning olan eventleri dinleyen listener
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
        console.log('***-create-task-request-rejected', data, '/planning')
    });
}

export default PlanningSocketListener;