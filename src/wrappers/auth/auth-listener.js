import { AUTH_EVENT_ENUMS } from "./auth-enums";
import { setAllUsers, setIsRoomCreating, setJoinedRoom, setSelfUserInfo } from "../../redux/slices/user-management-slice";
import { getReJoinAlreadyLoginedUser } from "./auth-emitter";
import { authSocket } from "./auth-socket-wrapper";

/**
 * Auth Socket Listener
 * 
 * @description /auth namespace'i üzerinden gelen eventleri dinleyen listener
 * 
 * @param {Object} {dispatch: ReduxDispatch, useAuth: AuthContext}
 * @returns {void}
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli) 
 */
const AuthSocketListener = ({ dispatch, useAuth }) => {

    // authContext
    const { setToken } = useAuth;

    /**
     * Login Request Accepted
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    authSocket.on(AUTH_EVENT_ENUMS.LOGIN_REQUEST_ACCEPTED, user => {
        setToken(user.uniqueId);
        dispatch(setSelfUserInfo(user))
    });

    /**
     * # User Already Login 
     * 
     * Kullanıcı daha önceden bağlanmışsa bu event üzerinden tekrardan giriş yapılması sağlanır.
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    authSocket.on(AUTH_EVENT_ENUMS.USER_CONNECTED, () => {
        if (localStorage.getItem("token")) {
            getReJoinAlreadyLoginedUser({ uniqueId: localStorage.getItem("token") });
        }
    });

    /**
     * User Already Exists
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    authSocket.on(AUTH_EVENT_ENUMS.USER_ALREADY_EXISTS, data => {
        alert('User already logined !')
    });

    /**
     * Set all users to redux
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    authSocket.on(AUTH_EVENT_ENUMS.GET_ALL_USERS, allUsers => {
        dispatch(setAllUsers(allUsers));
    });

    /**
     * Rejoined User info
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    authSocket.on(AUTH_EVENT_ENUMS.RE_JOIN_ALREADY_LOGINED_USER, user => {
        dispatch(setSelfUserInfo(user));
    });

    /**
     * User logourt request accepted
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    authSocket.on(AUTH_EVENT_ENUMS.LOGOUT_REQUEST_ACCEPTED, () => {
        localStorage.removeItem("token");
        dispatch(setSelfUserInfo({}));
    });

    /**
     * Room Create Request Accepted
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    authSocket.on(AUTH_EVENT_ENUMS.NEW_ROOM_CREATE_ACCEPTED, room => {
        dispatch(setIsRoomCreating(false));
        dispatch(setJoinedRoom(room));
    });

    /**
     * Room Create Request Rejected
     * @param {string} err {reason, message}
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    authSocket.on(AUTH_EVENT_ENUMS.NEW_ROOM_CREATE_REJECTED, ({ reason, message }) => {
        if (reason === "ALREADY_EXISTS") {
            alert(message);
        }
    });
}

export default AuthSocketListener;