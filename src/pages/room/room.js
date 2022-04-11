import Layout from "../../components/layout/layout";
import SelectBoard from "../../components/room/select-board";
import TabMenu from "../../components/tab-menu/tab-menu";
import UserCard from "../../components/user/user-card";
import {
    Flex,
    Stack,
    Box,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../wrappers/planning/planning-emitter";
import { tabs, TabPanels as TabPanelRoom } from "../../constants/room-constants";
import { useContext, useEffect } from "react";
import { joinRoomRequest } from "../../wrappers/auth/auth-emitter";
import { useParams } from "react-router-dom";
import { authContext } from "../../hooks/useAuth";
import { LIVELINESS_STATUS_ENUMS } from "../../wrappers/auth/auth-enums";
import { setActiveTab, setIsVoting, setVotingTask } from "../../redux/slices/planning-slice";
import { setIsRoomOwner } from "../../redux/slices/user-management-slice";

/**
 * Scrum room
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Room = () => {

    // auth provider
    const { authed } = useContext(authContext);

    // dispatch
    const dispatch = useDispatch();

    // redux
    const { isRoomCreating, joinedRoom, isRoomOwner } = useSelector(state => state.userManagementSlice);
    const { tasks, isVoting, activeTab, userRatingList } = useSelector(state => state.planningSlice);

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
            dispatch(setIsRoomOwner(true));
        }
    }, [joinedRoom?.roomOwner?.uniqueId]);

    // when user re-enter room
    useEffect(() => {
        if (tasks.IN_PROGRESS.length > 0) {
            dispatch(setIsVoting(true))
            dispatch(setActiveTab("IN_PROGRESS"))
            dispatch(setVotingTask(tasks.IN_PROGRESS[0]))
        }
    }, [JSON.stringify(tasks.IN_PROGRESS)])

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
                        <SelectBoard isVoting={isVoting} isRoomOwner={isRoomOwner} />
                        <Box flex={1} width={"100%"}  >
                            <TabMenu
                                currentTab={activeTab}
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
                        {
                            isVoting
                                ? userRatingList.map(user => (
                                    <UserCard user={user.user} key={user.userName} point={user.rating} />
                                ))
                                : joinedRoom?.users?.filter(onlineUser => onlineUser.livelinessStatus === LIVELINESS_STATUS_ENUMS.ONLINE)
                                    .map(user => (
                                        <UserCard user={user} key={user.userName} point={"-"} />
                                    ))
                        }
                    </Stack>
                </Stack>
            </Flex>
        </Layout>
    );
}

export default Room;