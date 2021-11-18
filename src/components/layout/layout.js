import React from 'react';
import {
    Box,
    Flex,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../components/color-mode-switcher/color-mode-switcher';
import Navbar from '../navbar/navbar';

/**
 * Kapsayıcı component.
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @param {Node|Function} children Wrapped Component 
 * @returns {JSX.Element}
 */
const Layout = ({ children }) => {
    return (
        <Box
            as="div"
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="column"
            textAlign="center"
            fontSize="xl"
            height="100vh"
        >
            <Box as="div" w="100%">
                <Navbar />
            </Box>
            
            <Flex alignItems="center" justifyContent="center" w="100%" h="100%" p={3}>
                <Box position="absolute" top="5" right="5">
                    <ColorModeSwitcher justifySelf="flex-end" />
                </Box>
                {children}
            </Flex>
        </Box>
    )
}

export default Layout;