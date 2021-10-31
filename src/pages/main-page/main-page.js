import React from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Text,
  Button
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './components/color-mode-switcher/color-mode-switcher';

const MainPage = () => {

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Text>App js</Text>
            <Button onClick={handleLogout}>Logout</Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default MainPage;