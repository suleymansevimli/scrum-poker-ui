import React, { useEffect, useState } from "react";
import * as socket from 'socket.io-client';

const PlanningSocketWrapper = () => {

    const [socketObj,setSocketObj] = useState(null) 

    console.log('planing render');

    useEffect(() => {
        setSocketObj(socket.io(`${process.env.REACT_APP_SOCKET_URI}/planning`))
    },[])


    useEffect(() => {

        if(socketObj) {
            socketObj.on('getAllTasks', data => {
                console.log('***-getAllTasks', data,'/planning')
            });
        }

        return () => {
            socketObj && socketObj.disconnect();
        }

    }, [socketObj]);

    return <></>;
}

export default React.memo(PlanningSocketWrapper);