import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/layout";
import LoginForm from "../../components/auth/login/login-form/login-form";
import { authContext } from "../../hooks/useAuth";
import SelectBoard from "../../components/room/select-board";
import { Box, Flex, Badge, Stack, Text, Tooltip, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import FocusLock from "react-focus-lock"

/**
 * Kişilerin scrum room'larını görüntüler.
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Room = () => {
    // states
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);
    const [isOpen, setIsOpen] = useState(true);

    // router
    const { roomId } = useParams();

    // hooks
    const { authed } = useContext(authContext);

    // redux
    const { users } = useSelector(state => state.userManagementSlice);

    /**
     * Room'a giriş yapıldığında burası çalışır.
     * Kişi login olmamış ise login sayfasına yönlendirilir.
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    useEffect(() => {
        if (!authed) {
            setMessage("Lütfen giriş yapınız..");
        } else {
            // login olunmuş ise loading false yapılır.
            setLoading(false);

            // mesaj kaldırılır.
            setMessage(null);
        }
    }, [roomId, authed]);

    return (
        <Layout>
            <Flex w={"100%"} height='calc(100vh - 110px)'>
                <Stack as="div" justifyContent={"center"} display={"flex"} alignItems={"center"} flex={4} borderRight={"1px solid #ddd"}>
                    <SelectBoard />
                </Stack>
                <Stack as="div" maxHeight={"100%"} overflowY={"auto"} flex={1} padding={5} flexDirection={"column"} justifyContent={"space-between"}>
                    <Stack>
                        {users.map(user => (
                            // isOpen
                            <Tooltip label={null} hasArrow bg="twitter.600" placement='auto'  p="5px 10px">
                                <Box key={user.id}
                                    border="1px"
                                    borderColor={"whiteAlpha.300"}
                                    borderRadius={"8px"}
                                    transition={"all 0.3s ease-in-out"}
                                    cursor={"pointer"}
                                    _hover={{ borderColor: "twitter.600" }}>
                                    <Flex justifyContent={"space-between"} padding={"15px 30px"} w="100%">
                                        <Text>
                                            {user.userName}
                                        </Text>
                                        <Badge ml='1' fontSize='1em' colorScheme='red'>
                                            8
                                        </Badge>
                                    </Flex>
                                </Box>
                            </Tooltip>
                        ))}
                    </Stack>
                    <Flex>
                        <Button isFullWidth bg={"green.700"} _hover={{bg:"green.400"}}> 
                            Bitir 
                        </Button>
                    </Flex>
                </Stack>
            </Flex>
        </Layout>
    );
}

export default Room;