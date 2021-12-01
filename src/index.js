import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { SocketProvider } from './providers/socket-providers';
import App from './App';
import { AuthProvider } from './hooks/useAuth';
import PlanningSocketWrapper from './wrappers/planning-socket-wrapper';
import ExampleWrapper from './wrappers/ExampleWrapper';

ReactDOM.render(
  <StrictMode>
    <SocketProvider>
      <Provider store={store}>
        <AuthProvider>
          <ColorModeScript />
          <ExampleWrapper />
          <PlanningSocketWrapper />
          <App />
        </AuthProvider>
      </Provider>
    </SocketProvider>
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
