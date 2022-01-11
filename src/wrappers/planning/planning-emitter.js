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