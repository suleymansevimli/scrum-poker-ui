import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as socket from 'socket.io-client';
import { authContext } from '../../hooks/useAuth';
import AuthSocketListener from './auth-listener';

// socket initialize
export const authSocket = socket.io(`${process.env.REACT_APP_SOCKET_URI}/auth`)

/**
 * Auth Socket Wrapper
 * @returns {React.ReactFragment}
 */
const AuthSocketWrapper = () => {

    const dispatch = useDispatch();
    const useAuth = useContext(authContext); 

    useEffect(() => {

        if (authSocket) {
            AuthSocketListener({ dispatch, useAuth });
        }

        return () => authSocket.disconnect();
    }, []);

    return <></>;
};

export default AuthSocketWrapper;
