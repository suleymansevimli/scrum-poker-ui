/**
 * Eventlerin enum değerleri
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
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
    USER_DISCONNECTED: "userDisconnected",

    GET_ALL_ROOMS: "getAllRooms",
    UPDATED_ALL_ROOMS: "updatedAllRooms",
    NEW_ROOM_CREATE_REQUEST: "newRoomCreateRequest",
    NEW_ROOM_CREATE_ACCEPTED: "newRoomCreateAccepted",
    NEW_ROOM_CREATE_REJECTED: "newRoomCreateRejected",
    ROOM_JOIN_REQUEST: "roomJoinRequest",
    ROOM_JOIN_ACCEPTED: "roomJoinAccepted",
    ROOM_JOIN_REJECTED: "roomJoinRejected",
}

/**
 * Kullanıcıların online/offline durumunu gösteren enum değerleri
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
export const LIVELINESS_STATUS_ENUMS = {
    ONLINE: "online",
    OFFLINE: "offline"
}