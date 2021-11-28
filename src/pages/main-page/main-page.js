import React, { useEffect } from 'react';
import { Center, Button, Box, VStack } from '@chakra-ui/react';
import Layout from '../../components/layout/layout';
import { Input } from '@chakra-ui/react';
import { AUTH_EVENT_ENUMS } from '../../constants/user-management-event-enums';
import { useSocket } from '../../providers/socket-providers';
import { setIsRoomCreating } from '../../redux/slices/user-management-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

/**
 * Ana sayfa componenti
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element} JSX.Element
 */
const MainPage = () => {

  // socket
  const { emitter } = useSocket();

  // states
  const [roomName, setRoomName] = React.useState('');

  // redux 
  const dispatch = useDispatch();
  const { isRoomCreating, joinedRoom } = useSelector(state => state.userManagementSlice);

  // functions

  /**
   * Room oluşturma işlemini başlatır.
   */
  const joinRoom = () => {
    emitter(AUTH_EVENT_ENUMS.NEW_ROOM_CREATE_REQUEST, { roomName });
    dispatch(setIsRoomCreating(true));
  };

  return (
    <Layout>
      <Center as="div" display="flex" flexDirection="column" gridGap="4">
        <VStack>
          {Object.keys(joinedRoom).length > 0 &&
            (
              <Box>
                {joinedRoom.roomName}
              </Box>
            )
          }
        </VStack>
        <Box as="div" gridGap="4" display="flex" flexDirection="column">
          <Input placeholder="Room Name" value={roomName} onChange={e => setRoomName(e.target.value)} />
          <Button onClick={joinRoom}>Katıl</Button>
        </Box>
      </Center>
    </Layout>
  )
}

export default MainPage;