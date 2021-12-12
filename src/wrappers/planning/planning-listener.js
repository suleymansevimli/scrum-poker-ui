import { planningSocket } from "../socket-connections"; 

/**
 * Planning Socket Listener
 * 
 * Namespace'i /planning olan eventleri dinleyen listener
 * 
 * @param {Object} {dispatch: ReduxDispatch, useAuth: AuthContext}
 * @returns {void}
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli) 
 */
const PlanningSocketListener = ({ dispatch }) => {

    /**
     * ! Örnek event
     */
    planningSocket.on('getAllTasks', data => {
        console.log('***-getAllTasks', data,'/planning')
    });

    planningSocket.on('craete-task-request-accepted', data => {
        console.log('***-create-task-request-accepted', data,'/planning')
    });
}

export default PlanningSocketListener;