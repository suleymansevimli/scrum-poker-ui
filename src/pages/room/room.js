import Layout from "../../components/layout/layout";
import SelectBoard from "../../components/room/select-board";
import {
    Flex,
    Stack,
    Button,
    Box,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import UserCard from "../../components/user/user-card";
import { createTask } from "../../wrappers/planning/planning-emitter";
import TabMenu from "../../components/tab-menu/tab-menu";
import { tabs, TabPanels as TabPanelRoom } from "../../constants/room-constants";
import { useContext, useEffect, useState } from "react";
import { joinRoomRequest } from "../../wrappers/auth/auth-emitter";
import { useParams } from "react-router-dom";
import { authContext } from "../../hooks/useAuth";
import { LIVELINESS_STATUS_ENUMS } from "../../wrappers/auth/auth-enums";

/**
 * Scrum room
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Room = () => {

    // states
    const [isRoomOwner, setIsRoomOwner] = useState(false);

    // auth provider
    const { authed } = useContext(authContext);

    // redux
    const { users, isRoomCreating, joinedRoom } = useSelector(state => state.userManagementSlice);
    const { tasks } = useSelector(state => state.planningSlice);

    // route
    const { roomId } = useParams();

    // join room
    useEffect(() => {
        if (!isRoomCreating && authed) {
            joinRoomRequest(roomId);
        }
    }, [isRoomCreating, authed, roomId]);

    // set room owner
    useEffect(() => {
        if (joinedRoom.roomOwner?.uniqueId === localStorage.getItem('token')) {
            setIsRoomOwner(true);
        }
    }, [joinedRoom?.roomOwner?.uniqueId]);

    console.log('room', joinedRoom);

    /**
     * Create Task Request
     * 
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     * 
     * @param {TaskDTO} data 
     * @returns void
     */
    const onSubmitCreateTask = (data) => createTask(data);

    return (
        <Layout layoutStyles={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Flex w={"100%"} height='calc(100vh - 110px)'>

                <Stack
                    as="div"
                    flexDir={'column'}
                    mt={16}
                    mb={16}
                    justifyContent={"space-between"}
                    display={"flex"}
                    alignItems={"center"}
                    flex={4}
                    borderRight={"1px solid #ddd"}>

                    <Box display={"flex"} flexDirection={"column"} gridGap={10}>
                        <SelectBoard />
                        <Box flex={1} width={"100%"}  >
                            <TabMenu
                                tabs={tabs}
                                tabPanels={TabPanelRoom(tasks)}
                                add={{
                                    hasAdd: true,
                                    addButtonLabel: "Create A New Task",
                                    onSubmit: onSubmitCreateTask,
                                    modalTitle: "Create A New Task",
                                    isRoomOwner: isRoomOwner,
                                }} />
                        </Box>
                    </Box>
                </Stack>

                <Stack
                    as="div"
                    maxHeight={"100%"}
                    overflowY={"auto"}
                    flex={1}
                    padding={5}
                    flexDirection={"column"}
                    justifyContent={"space-between"}>

                    <Stack>
                        {joinedRoom?.users?.filter(onlineUser => onlineUser.livelinessStatus === LIVELINESS_STATUS_ENUMS.ONLINE ).map(user => (
                            <UserCard user={user} key={user.userName} point={12} />
                        ))}
                    </Stack>

                    <Flex>
                        <Button isFullWidth bg={"green.700"} _hover={{ bg: "green.400" }}>
                            Finish
                        </Button>
                    </Flex>
                </Stack>
            </Flex>
        </Layout>
    );
}

export default Room;