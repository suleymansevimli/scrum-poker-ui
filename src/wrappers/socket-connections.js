import * as socket from 'socket.io-client';

// auth
export const authSocket = socket.io(`${process.env.REACT_APP_SOCKET_URI}/auth`);

// planning
export const planningSocket = socket.io(`${process.env.REACT_APP_SOCKET_URI}/planning`);