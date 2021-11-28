/**
 * Eventlerin enum değerleri
 * @author suleymansevimli
 */
export const AUTH_EVENT_ENUMS = {
    CONNECT: "connect",
    USER_CONNECTED: "userConnected",
    GET_ALL_USERS: "getAllUsers",
    NEW_USER_JOINED: "newUserJoined",
    USER_ALREADY_EXISTS: "userAlreadyExists",
    GET_RE_JOIN_ALREADY_LOGINED_USER: "getReJoinAlreadyLoginedUser",
    RE_JOIN_ALREADY_LOGINED_USER: "reJoinAllreadyLoginedUser",
    USER_RE_JOINED: "userReJoined",
    SET_USER_NAME_REQUEST: "setUserNameRequest",
    LOGIN_REQUEST_ACCEPTED: "loginRequestAccepted",
    USER_LOGOUT_REQUEST: "userLogoutRequest",
    LOGOUT_REQUEST_ACCEPTED: "logoutRequestAccepted",
    NEW_ROOM_CREATE_REQUEST: "newRoomCreateRequest",
    NEW_ROOM_CREATE_ACCEPTED: "newRoomCreateAccepted",
    NEW_ROOM_CREATE_REJECTED: "newRoomCreateRejected",
}