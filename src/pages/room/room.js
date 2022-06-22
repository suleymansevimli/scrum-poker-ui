import Layout from "../../components/layout/layout";
import SelectBoard from "../../components/room/select-board";
import TabMenu from "../../components/tab-menu/tab-menu";
import UserCard from "../../components/user/user-card";
import { Flex, Stack, Box, Wrap, WrapItem, Avatar, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { createTask } from "../../wrappers/planning/planning-emitter";
import { tabs, TabPanels as TabPanelRoom } from "../../constants/room-constants";
import { useContext, useEffect } from "react";
import { joinRoomRequest } from "../../wrappers/auth/auth-emitter";
import { useParams } from "react-router-dom";
import { authContext } from "../../hooks/useAuth";
import { setActiveTab, setIsVoting, setCurrentTask, toggleDetailModal } from "../../redux/slices/planning-slice";
import SPModal from "../../components/modal/sp-modal";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { generatePieChartData } from "../../utils/chart-util";

ChartJS.register(ArcElement, Tooltip, Legend);

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

    console.log('detailModalIsOpen', detailModalIsOpen, detailModalData)

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


    /**
     *  ! ------------------------------- CHART -------------------------------------
     */


    /**
     *  ! ------------------------------ CHART END ---------------------------------
     */



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
                size="full"
                modalTitle={detailModalData?.taskName}>


                <Box bg={'whiteAlpha.500'} color={"red.400"}>
                    {detailModalData?.result?.averageVote}
                </Box>

                <Flex justifyContent={"center"} alignItems="center">
                    <Box w="500px" h="500px">
                        <Pie
                            data={generatePieChartData({
                                labels: Object.keys(detailModalData?.result?.votes ?? []),
                                data: Object.values(detailModalData?.result?.votes ?? [])
                            })}
                        />
                    </Box>
                </Flex>

                <Wrap display={"flex"} alignItems="center" justifyContent={"center"} mt="70">
                    {detailModalData?.userVoteList?.map(({ user, vote }) => (
                        <Flex justifyContent={"space-between"} borderRadius="16" p="50" alignItems="center" width={250} height={150} border="1px solid #ddd">
                            <Stack>
                                <Avatar name={user.userName} />
                                <Box ml='3'>
                                    <Text fontWeight='bold'>
                                        {user.userName}
                                    </Text>
                                </Box>
                            </Stack>
                            <Text d="flex" alignItems={"center"} justifyContent="center" fontSize='xl' bg="tomato" padding={"5"} w="5" h="5" borderRadius="100%">
                                {vote === 'coffee' ? '☕' : vote}
                            </Text>
                        </Flex>
                    ))}
                </Wrap>
            </SPModal>
        </Layout >
    );
}

export default Room;