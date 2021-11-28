import { AUTH_EVENT_ENUMS } from "../constants/user-management-event-enums";
import { setAllUsers, setIsRoomCreating, setJoinedRoom, setSelfUserInfo } from "../redux/slices/user-management-slice";

export default function AuthSocketWrapper({ listener, emitter, setToken, dispatch }) {

    /**
     * On user connection to socket
     */
    listener(AUTH_EVENT_ENUMS.USER_CONNECTED, () => {
        if (localStorage.getItem("token")) {
            emitter(AUTH_EVENT_ENUMS.GET_RE_JOIN_ALREADY_LOGINED_USER, { uniqueId: localStorage.getItem("token") });
        }
    });

    /**
     * Login request accepted
     */
    listener(AUTH_EVENT_ENUMS.LOGIN_REQUEST_ACCEPTED, user => {
        setToken(user.uniqueId);
        dispatch(setSelfUserInfo(user));
    });

    /**
     * User Already Exists
     */
    listener(AUTH_EVENT_ENUMS.USER_ALREADY_EXISTS, data => {
        alert('User already logined !')
    });

    /**
     * Set all users to redux
     */
    listener(AUTH_EVENT_ENUMS.GET_ALL_USERS, allUsers => {
        dispatch(setAllUsers(allUsers));
    });

    /**
     * Rejoined User info
     */
    listener(AUTH_EVENT_ENUMS.RE_JOIN_ALREADY_LOGINED_USER, user => {
        dispatch(setSelfUserInfo(user));
    });

    /**
     * User logourt request accepted
     */
    listener(AUTH_EVENT_ENUMS.LOGOUT_REQUEST_ACCEPTED, () => {
        localStorage.removeItem("token");
        dispatch(setSelfUserInfo({}));
    });

    /**
     * Room Create Request Accepted
     */
    listener(AUTH_EVENT_ENUMS.NEW_ROOM_CREATE_ACCEPTED, room => {
        dispatch(setIsRoomCreating(false));
        dispatch(setJoinedRoom(room));
    });

    /**
     * Room Create Request Rejected
     * @param {string} err {reason, message}
     * 
     */
    listener(AUTH_EVENT_ENUMS.NEW_ROOM_CREATE_REJECTED, ({reason, message}) => {
        if(reason === "ALREADY_EXISTS") {
            alert(message);
        }
    });
}