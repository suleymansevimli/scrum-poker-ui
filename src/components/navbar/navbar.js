import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../hooks/useAuth';
import { Flex, Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from 'react-redux';
import { setJoinedRoom } from '../../redux/slices/user-management-slice';
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

    // route
    const navigate = useNavigate();

    // redux
    const dispatch = useDispatch();
    const { loginedUser } = useSelector(state => state.userManagementSlice);
    const { userName } = loginedUser;

    /**
     * Logout function
     */
    const handleLogout = () => {
        logout().then(() => {
            dispatch(setJoinedRoom({}));
            navigate('/')
        });
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
                {authed ? userName : null}
            </Box>
        </Flex>
    );
};

export default Navbar;