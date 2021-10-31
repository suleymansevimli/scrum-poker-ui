import React, { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Button,
  Input,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from '../../components/color-mode-switcher/color-mode-switcher';
import { useDispatch } from 'react-redux';
import { userInformations } from '../../redux/slices/user-management-slice';
import { USER_MANAGEMENT_EVENT_ENUMS } from '../../constants/user-management-event-enums';
import { useSocket } from '../../providers/socket-providers';

function Login() {
  const dispatch = useDispatch();

  const {listener, emitter} = useSocket('');

  const [userName, setUserName] = useState(null);

  const handleUserName = () => {
    emitter(USER_MANAGEMENT_EVENT_ENUMS.SET_USER_NAME_REQUEST, { userName });
    localStorage.setItem('loggedUser', JSON.stringify({ userName }))
  };

  useEffect(() => {
    
    listener(USER_MANAGEMENT_EVENT_ENUMS.CONNECT, () => {
      // ! log
      console.log('connection successfully')
    })

    listener(USER_MANAGEMENT_EVENT_ENUMS.GET_ALL_USERS, (data) => {
      // ! log
      console.log('all-users', data)
    });

    listener(USER_MANAGEMENT_EVENT_ENUMS.NEW_USER_JOINED, (data) => {
      // ! log
      console.log('new user joined', data);

      // redux'a yeni kullanıcıyı ekle
      dispatch(userInformations(data));

      // kullanıcı bilgilerini localStorage'a ekle
      let getLoggedUserInfo = localStorage.getItem('loggedUser');
      if (getLoggedUserInfo) {
        getLoggedUserInfo = JSON.parse(getLoggedUserInfo);
        if (getLoggedUserInfo.userName === data.userName) {
          localStorage.setItem("loggedUser", JSON.stringify(data));
        }
      }

    })

    listener(USER_MANAGEMENT_EVENT_ENUMS.USER_ALREADY_EXISTS, (data) => {
      // ! log
      console.log('user already exists', data)
    })

  }, [listener, dispatch])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Input onChange={e => setUserName(e.target.value)} />
            <Button onClick={handleUserName}>Set User</Button>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default Login;
