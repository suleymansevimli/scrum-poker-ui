import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { SocketProvider } from './providers/socket-providers';
import Login from './pages/login/login';

/**
 * ! WORKARAOUND WARNING !
 * ! Default olarak dark tema kullanılması için bu kod bloğu eklendi.
 * @author suleyman.sevimli
 */
const colorMode = localStorage.getItem('chakra-ui-color-mode');
if (!colorMode) {
  localStorage.setItem('chakra-ui-color-mode', 'dark');
}

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <ColorModeScript />
        <Login />
      </SocketProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
