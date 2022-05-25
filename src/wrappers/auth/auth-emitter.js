import { AUTH_EVENT_ENUMS } from "./auth-enums";
import { authSocket } from "../socket-connections";

/**
 * ### UserName Emitter
 * 
 * @param {String} userName 
 * @returns Socket Emitter
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
export const loginRequest = (userName) => {
    return authSocket.emit(AUTH_EVENT_ENUMS.LOGIN_REQUEST, { userName });
}

/**
 * ### Get Re Join Request
 *  
 * @param {{uniqueId: string}} uniqueId Kullanıcının uniqueId'si
 * @returns Socket Emitter
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
export const getReJoinAlreadyLoginedUser = ({ uniqueId }) => {
    return authSocket.emit(AUTH_EVENT_ENUMS.GET_RE_JOIN_ALREADY_LOGINED_USER, { uniqueId });
}

/**
 * ### Logout Request
 * 
 * @returns Socket Emitter
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
export const logoutRequest = ({ uniqueId }) => {
    return authSocket.emit(AUTH_EVENT_ENUMS.USER_LOGOUT_REQUEST, { uniqueId });
}

/**
 * ### Create Room Request
 * 
 * @returns Socket Emitter
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
export const createNewRoom = (roomName) => {
    return authSocket.emit(AUTH_EVENT_ENUMS.NEW_ROOM_CREATE_REQUEST, { roomName });
}

/**
 * ### Join Room Request
 * 
 * @param {String} roomSlug 
 * 
 * @returns Socket Emitter
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
export const joinRoomRequest = (roomSlug) => {
    return authSocket.emit(AUTH_EVENT_ENUMS.ROOM_JOIN_REQUEST, { slug: roomSlug });
}