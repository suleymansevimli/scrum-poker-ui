import React from 'react';
import {
    Box,
    Grid,
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
        <Box textAlign="center" fontSize="xl">
            <Navbar />
            <Grid minH="100vh" p={3}>
                <Box position="absolute" top="5" right="5">
                    <ColorModeSwitcher justifySelf="flex-end" />
                </Box>
                {children}
            </Grid>
        </Box>
    )
}

export default Layout;