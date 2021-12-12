import * as React from "react";
import { logoutRequest } from "../wrappers/auth/auth-emitter";

/**
 * Auth Context
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * @returns {React.Context<{}>}
 */
export const authContext = React.createContext();

/**
 * Auth Hook
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * @returns {React.Context<{}>}
 */
function useAuth() {
  const [authed, setAuthed] = React.useState(localStorage.getItem("token") ? true : false);

  return {
    authed,
    login(data = {}) {
      localStorage.setItem("token", data.token);
      setAuthed(true);
    },
    logout() {
      return new Promise((res) => {
        logoutRequest()
        setAuthed(false);
        localStorage.removeItem("token");
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