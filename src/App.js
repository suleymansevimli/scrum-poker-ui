import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Login from './pages/login/login';
import MainPage from './pages/main-page/main-page';
import useAuth from './hooks/useAuth';
import Room from './pages/room/room';

/**
 * Default olarak dark mode setlenmesi için bu alan eklendi.
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
const config = {
  initialColorModeName: 'dark',
  useSystemColorMode: false,
};

// custom tema extend edildi.
const theme = extendTheme(config);

/**
 * Route işlemleri bu alanda yapılır.
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {React.ReactElement}
 */
export default function App() {

  // user login olup olmadığını kontrol eder.
  const useAuthHook = useAuth();
  const authed = useAuthHook?.authed;

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          {
            authed ?
              <>
                <Route path="/" element={<MainPage />} />
                <Route path="/room/:roomId" element={<Room />} />
              </>
              : <>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/room/:roomId" element={<Room />} />
                <Route path="*" element={<Login />} />
              </>
          }
        </Routes>
      </Router>
    </ChakraProvider>
  );
}