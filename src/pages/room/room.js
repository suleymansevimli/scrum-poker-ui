import Layout from "../../components/layout/layout";
import SelectBoard from "../../components/room/select-board";
import {
    Flex,
    Stack,
    Button,
    Box,
    TabPanels,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import UserCard from "../../components/user/user-card";
import { createTask } from "../../wrappers/planning/planning-emitter";
import TabMenu from "../../components/tab-menu/tab-menu";
import { tabs, TabPanels as TabPanelRoom } from "../../constants/room-constants";

/**
 * Scrum room
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Room = () => {
    // redux
    const { users } = useSelector(state => state.userManagementSlice);
    const { tasks } = useSelector(state => state.planningSlice);

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
                                    modalTitle: "Create A New Task"
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
                        {users.map(user => (
                            <UserCard user={user} key={user.userName} point={8} />
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