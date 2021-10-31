import React, { useEffect, useState } from "react";
import App from "../App";
import { USER_MANAGEMENT_EVENT_ENUMS } from "../constants/user-management-event-enums";
import Login from "../pages/login/login";
import { useSocket } from "../providers/socket-providers";

function UserManagementHoc(Component) {

    return function WithLoadingComponent({ ...props }) {
        const { listener, emitter } = useSocket();
        const [users, setUsers] = useState([]);

        useEffect(() => {
            listener(USER_MANAGEMENT_EVENT_ENUMS.GET_ALL_USERS, (data) => {
                setUsers(data);
            })
        }, [listener]);

        let loggedUser = localStorage.getItem('loggedUser');

        if (loggedUser) {
            loggedUser = JSON.parse(loggedUser);
            const userNameMatched = users.find(user => ((user.userName === loggedUser.userName) && (user.uniqueId === loggedUser.uniqueId)));
            
            if(userNameMatched) {
                if (userNameMatched.id !== loggedUser?.id) {
                    emitter(
                        USER_MANAGEMENT_EVENT_ENUMS.RE_JOIN_ALREADY_LOGINED_USER,
                        { userName: userNameMatched.userName })
                }
                return <App />
            }
        }

        return <Login {...props} listener={listener} emitter={emitter} />
    }

}

export default UserManagementHoc;