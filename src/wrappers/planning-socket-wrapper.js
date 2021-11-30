import React, { useEffect } from "react";
import * as socket from 'socket.io-client';

const PlanningSocketWrapper = () => {

    const PLANING = socket.io(`${process.env.REACT_APP_SOCKET_URI}/planning`);

    useEffect(() => {
        PLANING.on('getAllTasks', data => {
            console.log('***-getAllTasks', data,'/planning')
        });

        return () => PLANING.disconnect();

    }, [PLANING]);

    return <></>;
}

export default PlanningSocketWrapper;