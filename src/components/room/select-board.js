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
    const { loginedUser, joinedRoom } = useSelector(state => state.userManagementSlice);
    const { votingTask } = useSelector(state => state.planningSlice);

    // select after refresh page
    useEffect(() => {
        console.log('voteTask', votingTask);
        if (votingTask && loginedUser) {
           setSelectedNumber(votingTask.usersRating.find(rating => rating.user.uniqueId === loginedUser.uniqueId)?.rating);
        }
    }, [votingTask, loginedUser])

    /***
     * Select story point 
     * 
     * @param {String} rate
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    const handleSelectNumber = (rate) => {
        if (!rate) return

        const payload = {
            user: loginedUser,
            rate,
            votingTask,
            roomId: joinedRoom.id
        }

        setSelectedNumber(rate);
        voteTask(payload)
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