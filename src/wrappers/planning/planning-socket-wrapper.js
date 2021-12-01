import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as socket from 'socket.io-client';
import PlanningSocketListener from "./planning-listener";

// socket initialization
export const planningSocket = socket.io(`${process.env.REACT_APP_SOCKET_URI}/planning`);

/**
 * ### PlanningSocketWrapper
 * 
 * @returns {React.ReactFragment}
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
const PlanningSocketWrapper = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        if (planningSocket) {
            PlanningSocketListener({ dispatch })
        }

        return () => planningSocket.disconnect();
    }, [])


    return <></>;
}

export default PlanningSocketWrapper;