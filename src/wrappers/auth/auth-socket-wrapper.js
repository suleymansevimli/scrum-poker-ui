import React, { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authContext } from '../../hooks/useAuth';
import AuthSocketListener from './auth-listener';
import { authSocket } from '../socket-connections';

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

        return () => authSocket.close();
    }, []);

    return <></>;
};

export default AuthSocketWrapper;
