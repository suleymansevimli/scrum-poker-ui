import { planningSocket } from "../socket-connections";

export const createTask = (taskDTO) => {
  planningSocket.emit("createTask", taskDTO);
}