import ScrumPokerCard from "../../components/room/scrum-poker-card";
import React, { useState, memo, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { projectConfig } from "../../config";
import { useSelector } from "react-redux";
import { voteTask } from "../../wrappers/planning/planning-emitter";

/**
 * 
 * Select Board
 * 
 * @param {{isRoomOwner: Boolean, isVoting: Boolean}} { isRoomOwner: Boolean, isVoting: Boolean }
 * @returns {React.ReactNode} 
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 */
const SelectBoard = ({ isRoomOwner, isVoting }) => {

    // states
    const [selectedNumber, setSelectedNumber] = useState(null);

    // redux
    const { loginedUser } = useSelector(state => state.userManagementSlice);
    const { currentTask } = useSelector(state => state.planningSlice);

    // select after refresh page
    useEffect(() => {
        if (currentTask && loginedUser) {
           setSelectedNumber(currentTask?.userVoteList?.find(rating => rating.user.uniqueId === loginedUser.uniqueId)?.vote || null);
        }
    }, [currentTask, loginedUser])

    /***
     * Select story point 
     * 
     * @param {String} vote
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    const handleSelectNumber = (vote) => {
        if (!vote) return

        const payload = {
            user: loginedUser,
            vote,
        }
        voteTask(payload);

        setSelectedNumber(vote);
    }

    return (
        <Grid
            gridGap={15}
            gridTemplateColumns={"auto auto auto auto auto"} >
            {
                projectConfig.cardNumbers.map((cardNumber, i) => (
                    <GridItem key={cardNumber + i}>
                        <ScrumPokerCard
                            onSelected={(isVoting && !isRoomOwner) ? handleSelectNumber : () => { }}
                            cardNumber={cardNumber}
                            isDisable={isRoomOwner}
                            isSelected={selectedNumber === cardNumber} />
                    </GridItem>
                ))
            }
        </Grid>
    )
}

export default memo(SelectBoard);