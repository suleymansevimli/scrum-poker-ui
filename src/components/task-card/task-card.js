import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import SPModal from "../modal/sp-modal";
import PropTypes from 'prop-types';
import { startVoting, stopVoting } from "../../wrappers/planning/planning-emitter";
import { useSelector } from "react-redux";

const TaskCard = ({ taskName, taskDescription, taskId, status }) => {

    const { isVoting } = useSelector(state => state.planningSlice);
    const { loginedUser } = useSelector(state => state.userManagementSlice);

    // task detail modal open/close state
    const [isOpen, setIsOpen] = useState(false);

    const isRoomOwner = loginedUser.userType === 'admin';

    return (
        <Box
            display={"flex"}
            alignItems={"flex-start"}
            justifyContent={"flex-start"}
            flexDirection={"column"}
            border={"1px dashed"}
            borderColor={"whiteAlpha.400"}
            borderRadius={"8px"}
            padding={"10px"}
            margin={"10px 0"}
            cursor={"pointer"}
            transition={"all 2500ms"}
            _hover={{ borderColor: "tomato" }}>

            <Box display={"flex"} w={"100%"} justifyContent={"space-between"}>

                <Box
                    display={"flex"}
                    alignItems={"flex-start"}
                    flexDirection={"column"}
                    justifyContent={"flex-start"}>

                    <Text fontSize={24}> {taskName} </Text>
                    <Text fontSize={17} fontWeight={"thin"}>
                        {taskDescription.split("").length > 25 ? taskDescription.substring(0, 25) + "..." : taskDescription}
                    </Text>
                </Box>

                <Box display={"flex"} alignItems={"center"} justifyContent={"space-around"}>
                    <Button onClick={() => setIsOpen(true)} marginRight={"10px"}>
                        Details
                    </Button>

                    {status === "OPEN" && isRoomOwner && (
                        <Button
                            onClick={() => startVoting({ taskId })}
                            bg={"green.400"}
                            transition={"all 1s"}
                            _hover={{ background: "tomato" }}
                            disabled={isVoting}
                        >
                            Start Voting !
                        </Button>
                    )}

                    {status === "IN_PROGRESS" && isRoomOwner && (
                        <Button
                            onClick={() => stopVoting({ id: taskId })}
                            isFullWidth bg={"green.700"}
                            _hover={{ bg: "green.400" }}>
                            Finish
                        </Button>
                    )}
                </Box>
            </Box>

            <SPModal
                isCentered
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                size="full"
                modalTitle={taskName}>
                <Text>{taskDescription}</Text>
            </SPModal>

        </Box>
    )
}

export default TaskCard;

TaskCard.propTypes = {
    taskName: PropTypes.string.isRequired,
    taskDescription: PropTypes.string.isRequired
}

TaskCard.defaultProps = {
    taskName: '',
    taskDescription: ''
}