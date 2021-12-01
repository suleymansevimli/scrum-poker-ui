import { planningSocket } from "./planning-socket-wrapper";

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
}

export default PlanningSocketListener;