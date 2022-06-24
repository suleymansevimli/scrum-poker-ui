import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../hooks/useAuth';
import { Flex, Box, Text } from "@chakra-ui/react";
import { useSelector } from 'react-redux';
import './navbar.css';

/**
 * Custom navbar componenti
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Navbar = () => {
    
    // hooks
    const { authed, logout } = useContext(authContext);

    // redux
    const { loginedUser } = useSelector(state => state.userManagementSlice);
    const { userName } = loginedUser;

    /**
     * Logout function
     */
    const handleLogout = () => {
        logout();
    }

    return (
        <Flex as="div" w="100%" justifyContent="space-around">
            <Box p="4">
                {
                    authed ?
                        (
                            <Flex alignItems="center" gridGap="8">
                                <Box>
                                    <Link to="/">Main Page</Link>
                                </Box>

                                <Box>
                                    <Text cursor={"pointer"} onClick={handleLogout}>
                                        Logout
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
                            </Flex>
                        )
                }
            </Box>
            <Box p="4">
                {authed ? userName : null}
            </Box>
        </Flex>
    );
};

export default Navbar;