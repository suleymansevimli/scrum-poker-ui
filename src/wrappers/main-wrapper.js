import React from "react";
import AuthSocketWrapper from "./auth/auth-socket-wrapper";
import PlanningSocketWrapper from "./planning/planning-socket-wrapper";

/**
 * ### Main Wrapper
 * 
 * Kullanılan namespaceler bu ana wrapper içerisinden uygulamaya dahil edilir.
 * 
 * @returns {React.ReactElement}
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
const MainWrapper = () => {
    return (
        <>
            <PlanningSocketWrapper />
            <AuthSocketWrapper/>
        </>
    )
}

export default MainWrapper;