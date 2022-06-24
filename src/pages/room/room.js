import Layout from "../../components/layout/layout";
import SelectBoard from "../../components/room/select-board";
import TabMenu from "../../components/tab-menu/tab-menu";
import UserCard from "../../components/user/user-card";
import { Flex, Stack, Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../wrappers/planning/planning-emitter";
import { tabs, TabPanels as TabPanelRoom } from "../../constants/room-constants";
import { useContext, useEffect } from "react";
import { joinRoomRequest } from "../../wrappers/auth/auth-emitter";
import { useParams } from "react-router-dom";
import { authContext } from "../../hooks/useAuth";
import { setActiveTab, setIsVoting, setCurrentTask, toggleDetailModal } from "../../redux/slices/planning-slice";
import SPModal from "../../components/modal/sp-modal";
import TaskContent from "../../components/modal/task-content";


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
    const { isRoomCreating, users, loginedUser } = useSelector(state => state.userManagementSlice);
    const { tasks, isVoting, activeTab, detailModalIsOpen, detailModalData } = useSelector(state => state.planningSlice);

    // route
    const { roomId } = useParams();

    // join room
    useEffect(() => {
        if (!isRoomCreating && authed) {
            joinRoomRequest(roomId);
        }
    }, [isRoomCreating, authed, roomId]);

    // when user re-enter room
    useEffect(() => {
        if (tasks.IN_PROGRESS.length > 0) {
            dispatch(setIsVoting(true))
            dispatch(setActiveTab("IN_PROGRESS"))
            dispatch(setCurrentTask(tasks.IN_PROGRESS[0]))
        }
    }, [JSON.stringify(tasks.IN_PROGRESS)]);

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
                    flex={4}>

                    <Box display={"flex"} flexDirection={"column"} gridGap={10}>
                        
                        <SelectBoard isVoting={isVoting} isRoomOwner={loginedUser.userType === 'admin'} />
                        
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
                                    isRoomOwner: loginedUser.userType === 'admin',
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
                            users.map(user => (
                                <UserCard user={user} key={user.uniqueId} />
                            ))
                        }
                    </Stack>
                </Stack>
            </Flex>
            <SPModal
                isCentered
                isOpen={detailModalIsOpen}
                onClose={() => dispatch(toggleDetailModal({ isOpen: false }))}
                size="6xl"
                modalTitle={detailModalData?.taskName}>
                    <TaskContent taskDetail={detailModalData} />
            </SPModal>
        </Layout >
    );
}

export default Room;