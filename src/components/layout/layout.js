import React, { useContext } from 'react';
import {
    Box,
    Flex,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../components/color-mode-switcher/color-mode-switcher';
import Navbar from '../navbar/navbar';
import { authContext } from '../../hooks/useAuth';
import LoginForm from '../auth/login/login-form/login-form';

/**
 * Kapsayıcı component.
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @param {Node|Function} children Wrapped Component 
 * @returns {JSX.Element}
 */
const Layout = ({ children, layoutStyles = {}}) => {
    const { authed } = useContext(authContext);

    return (
        <Box
            as="div"
            textAlign="center"
            fontSize="xl"
            height="100vh"
            {...layoutStyles}
        >
            <Box as="div" w="100%" flex={1}>
                <Navbar />
            </Box>

            {!authed
                ? <Box display={'flex'} flex={12} alignItems={'center'} justifyContent={'center'} width={"100%"}>
                    <LoginForm />
                </Box>
                : <Flex p={3} flex={12} width={"100%"}>
                    <Box position="absolute" top="5" right="5">
                        <ColorModeSwitcher justifySelf="flex-end" />
                    </Box>
                    {children}
                </Flex>
            }
        </Box>
    )
}

export default Layout;