import Layout from "../../components/layout/layout";
import SelectBoard from "../../components/room/select-board";
import {
    Flex,
    Stack,
    Button,
    Box,
    Tabs,
    Tab,
    TabList,
    TabPanels,
    TabPanel
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import UserCard from "../../components/user/user-card";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react'
import { useState } from "react";

/**
 * Kişilerin scrum room'larını görüntüler.
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Room = () => {
    // redux
    const { users } = useSelector(state => state.userManagementSlice);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = () => setIsOpen(false);

    return (
        <Layout layoutStyles={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <Flex w={"100%"} height='calc(100vh - 110px)'>
                <Stack as="div" flexDir={'column'} mt={16} mb={16} justifyContent={"space-between"} display={"flex"} alignItems={"center"} flex={4} borderRight={"1px solid #ddd"}>
                    <SelectBoard />
                    <br />
                    <Box flex={1} width={"calc(100% - 640px)"} >
                        <Tabs isManual variant='enclosed'>
                            <TabList display="flex" justifyContent="space-between">
                                <Box d="flex">
                                    <Tab>On Process</Tab>
                                    <Tab>All Tasks</Tab>
                                    <Tab>Planned Tasks</Tab>
                                </Box>
                                <Button onClick={() => setIsOpen(true)} bgColor={"green.500"} mb="1"> Create New Task </Button>
                                <Modal onClose={onClose} size={"xl"} isOpen={isOpen} isCentered>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Create a new Task</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            {/* ! TODO: Task input's will be here  */} 
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button onClick={onClose}>Close</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <p>On Process</p>
                                </TabPanel>
                                <TabPanel>
                                    <p>All Tasks!</p>
                                </TabPanel>
                                <TabPanel>
                                    <p>Planned Tasks</p>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Stack>
                <Stack as="div" maxHeight={"100%"} overflowY={"auto"} flex={1} padding={5} flexDirection={"column"} justifyContent={"space-between"}>
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