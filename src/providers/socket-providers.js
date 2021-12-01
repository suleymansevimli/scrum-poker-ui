import { useContext, useLayoutEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import SocketContext from '../context/socket-context';

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children, socketUri }) => {
    const socket = useRef(null);
    const [uri, setUri] = useState(socketUri)

    // useLayoutEffect(() => {
    //     socket.current = io.connect(uri ?? process.env.REACT_APP_SOCKET_URI)
    //     return () => socket.current.disconnect();
    // }, [uri])

    /**
     * Listener
     * 
     * @param {String} topic 
     * @param {Function} cb 
     */
    const listener = (topic, cb) => {
        socket.current.on(topic, data => cb(data))
    }

    /**
     * Emitter
     * 
     * @param {String} topic 
     * @param {Object} data 
     * @param {Function} cb 
     */
    const emitter = (topic, data, cb) => {
        socket.current.emit(topic, data);
        if (cb) {
            cb(data);
        }
    }

    /**
     * Change socket uri source 
     * 
     * @param {String} uri 
     */
    const changeSocketUriSource = (uri, isOutSource) => {
        setUri(isOutSource ? uri : `${process.env.REACT_APP_SOCKET_URI}/${uri}` )
    }

    return (
        <SocketContext.Provider value={{ socket: socket.current, listener, emitter, changeSocketUriSource, uri }}>
            {children}
        </SocketContext.Provider>
    )
}