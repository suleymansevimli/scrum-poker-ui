import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PlanningSocketListener from "./planning-listener";
import { planningSocket } from "../socket-connections";

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

        return () => planningSocket.close();
    }, [])


    return <></>;
}

export default PlanningSocketWrapper;