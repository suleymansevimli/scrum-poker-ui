import { AUTH_EVENT_ENUMS } from "../constants/user-management-event-enums";
import { setAllUsers } from "../redux/slices/user-management-slice";

export default function AuthSocketWrapper({ listener, setToken, dispatch }) {

    /**
     * Login request accepted
     */
    listener(AUTH_EVENT_ENUMS.LOGIN_REQUEST_ACCEPTED, (data) => {
        setToken(data.uniqueId);
    });

    /**
     * User Already Exists
     */
    listener(AUTH_EVENT_ENUMS.USER_ALREADY_EXISTS, (data) => {
        alert('User already logined !')
    });

    /**
     * Set all users to redux
     */
    listener(AUTH_EVENT_ENUMS.GET_ALL_USERS, (allUsers) => {
        dispatch(setAllUsers(allUsers));
    });

    return null;
}