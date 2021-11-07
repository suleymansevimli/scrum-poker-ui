import * as React from "react";

const authContext = React.createContext();

/**
 * Auth Context
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * @returns {React.Context<{}>}
 */
function useAuth() {
  const [authed, setAuthed] = React.useState(localStorage.getItem("token") ? true : false);

  return {
    authed,
    login() {
      return new Promise((res) => {
        setAuthed(true);
        localStorage.setItem("token", "token");
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        localStorage.removeItem("token");
        res();
      });
    }
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

export default function AuthConsumer() {
  return React.useContext(authContext);
}