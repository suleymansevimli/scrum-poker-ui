import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useSocket } from '../../providers/socket-providers';
import { AUTH_EVENT_ENUMS } from '../../constants/user-management-event-enums';
import { Flex, Box, Text } from "@chakra-ui/react"
import './navbar.css';

/**
 * Custom navbar componenti
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Navbar = () => {

    // hooks
    const { authed, logout } = useAuth();
    const navigate = useNavigate();
    const { listener } = useSocket();

    useEffect(() => {
        listener(AUTH_EVENT_ENUMS.LOGOUT_REQUEST_ACCEPTED, (data) => {
            console.log('loggedOutedUser', data);
        })
    }, [listener])

    /**
     * Logout function
     */
    const handleLogout = () => {
        logout().then(() => {
            navigate('/')
        });
    }

    return (
        <Flex as="div" w="100%" justifyContent="space-around">
            <Box p="4">
                {
                    authed
                        ?
                        (
                            <Flex alignItems="center" gridGap="8">
                                <Box>
                                    <Link to="/">Main Page</Link>
                                </Box>
                                <Box>
                                    <Link to="/room/1231">Room</Link>
                                </Box>
                                <Box>
                                    <Text onClick={handleLogout}>
                                        Çıkış Yap
                                    </Text>
                                </Box>
                            </Flex>
                        )
                        :
                        (
                            <Flex alignItems="center" gridGap="4">
                                <Box>
                                    <Link to="/">Login</Link>
                                </Box>
                                <Box>
                                    <Link to="/room/1231">Room</Link>
                                </Box>
                            </Flex>
                        )
                }
            </Box>
            <Box p="4">
                {authed ? 'Giriş Yapmış Kullanıcı adı' : null}
            </Box>
        </Flex>
    );
};

export default Navbar;