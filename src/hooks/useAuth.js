import * as React from "react";
import { AUTH_EVENT_ENUMS } from "../constants/user-management-event-enums";
import { useSocket } from "../providers/socket-providers";

export const authContext = React.createContext();

/**
 * Auth Context
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * @returns {React.Context<{}>}
 */
function useAuth() {
  const [authed, setAuthed] = React.useState(localStorage.getItem("token") ? true : false);
  const { emitter, changeSocketUriSource } = useSocket();

  React.useLayoutEffect(() => {
      changeSocketUriSource('auth');
  },[changeSocketUriSource]);

  return {
    authed,
    login(data = {}) {
      return new Promise((res) => {
        emitter(AUTH_EVENT_ENUMS.SET_USER_NAME_REQUEST, {
          ...data
        })
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        localStorage.removeItem("token");
        emitter(AUTH_EVENT_ENUMS.USER_LOGOUT_REQUEST);
        res();
      });
    },
    setToken(token) {
      localStorage.setItem("token", token);
      setAuthed(true);
    },
  };
}

/**
 * Auth Provider
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * @returns {React.Context<{}>}
 */
export function AuthProvider({ children }) {
  const auth = useAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}