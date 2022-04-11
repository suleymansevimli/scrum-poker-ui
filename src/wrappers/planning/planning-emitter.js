import { planningSocket } from "../socket-connections";
import { PLANNING_EVENT_TYPES } from "./planning-enums";

/**
 * Create Task Request 
 * 
 * @param {Object} taskDTO: Object 
 */
export const createTask = (taskDTO) => {
  planningSocket.emit(PLANNING_EVENT_TYPES.CREATE_TASK_REQUESTED, taskDTO);
}

/**
 * Start Voting Request
 * 
 * @param {Object} taskDTO 
 */
export const startVoting = (taskDTO) => {
  planningSocket.emit(PLANNING_EVENT_TYPES.START_VOTING_REQUESTED, taskDTO);
}

/**
 * Stop Voting Request
 * 
 * @param {String} id 
 */
export const stopVoting = (id) => {
  planningSocket.emit(PLANNING_EVENT_TYPES.STOP_VOTING_REQUESTED, id);
}

/**
 * Vote Task Request
 * 
 * @param {Object} payload 
 */
export const voteTask = (payload) => {
  planningSocket.emit(PLANNING_EVENT_TYPES.VOTE_REQUESTED, payload);
}