import { memo, useEffect, useState } from "react";
import { Box, Flex, Badge, Text, Tooltip } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { LIVELINESS_STATUS_ENUMS } from "../../wrappers/auth/auth-enums";
import { useSelector } from "react-redux";

const UserCard = ({ user = {} }) => {

    const [userPoint, setUserPoint] = useState('-'); 
    const { currentTask } = useSelector((state) => state.planningSlice)

    useEffect(() => {
        if(currentTask?.userVoteList) {
            setUserPoint(prev => {
                const userIndex = currentTask.userVoteList.findIndex(voteList => user.uniqueId === voteList.user.uniqueId);
                if(userIndex !== -1) {
                    prev = currentTask.userVoteList[userIndex].vote;
                    return prev;
                }  
                return '-'
            })
        }
    }, currentTask?.userVoteList)

    /**
     * ☕️
     */
    return (
        <Tooltip label={null} hasArrow bg="twitter.600" placement='auto' p="5px 10px">
            <Box key={user.id}
                border="1px"
                borderColor={user.livelinessStatus === LIVELINESS_STATUS_ENUMS.ONLINE ? "whiteAlpha.300" : 'red.900'}
                borderRadius={"8px"}
                transition={"all 0.3s ease-in-out"}
                cursor={"pointer"}
                _hover={{ borderColor: "twitter.600" }}>
                <Flex justifyContent={"space-between"} padding={"15px 30px"} w="100%">
                    <Text>
                        {user.userName}
                    </Text>
                    <Badge ml='1' fontSize='1em' colorScheme={userPoint !== '-' ? 'green' : 'red' }>
                        {userPoint !== '-' ? 'VOTED' : 'WAITING' }
                    </Badge>
                </Flex>
            </Box>
        </Tooltip>
    )
}

export default memo(UserCard);

UserCard.propTypes = {
    user: PropTypes.object
}