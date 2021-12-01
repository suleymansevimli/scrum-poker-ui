import { AUTH_EVENT_ENUMS } from "./auth-enums";
import { authSocket } from "./auth-socket-wrapper";

/**
 * ### UserName Emitter
 * 
 * @param {String} userName 
 * @returns Socket Emitter
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
export const loginRequest = (userName) => {
    return authSocket.emit(AUTH_EVENT_ENUMS.SET_USER_NAME_REQUEST, { userName });
}

/**
 * ### Get Re Join Request
 *  
 * @param {Object} { uniqueId: String }
 * @returns Socket Emitter
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
export const getReJoinAlreadyLoginedUser = ({uniqueId}) => {
    return authSocket.emit(AUTH_EVENT_ENUMS.GET_RE_JOIN_ALREADY_LOGINED_USER, { uniqueId });
}