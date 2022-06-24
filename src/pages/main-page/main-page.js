import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import Layout from '../../components/layout/layout';
import { Input } from '@chakra-ui/react';
import { setIsRoomCreating } from '../../redux/slices/user-management-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createNewRoom } from '../../wrappers/auth/auth-emitter';

/**
 * Ana sayfa componenti
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element} JSX.Element
 */
const MainPage = () => {

  // states
  const [roomName, setRoomName] = React.useState('');

  // router
  const navigate = useNavigate()

  // redux 
  const dispatch = useDispatch();
  const { room, users } = useSelector(state => state.userManagementSlice);

  /**
   * Room oluşturma işlemini başlatır.
   */
  const joinRoom = () => {
    dispatch(setIsRoomCreating(true));
    createNewRoom(roomName);
  };

  return (
    <Layout layoutStyles={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Box display={'flex'} gridGap={10} flexDirection='column' alignItems={'center'} justifyContent={'center'} width={"100%"} >


      {Object.keys(room).length > 1 &&
            (
              <Box border={'1px solid orange'} padding={15} borderRadius={8}>
                <Text color={"white"}> Odaya giriş yapabilirsiniz. </Text>
              </Box>
            )
          }

        <Box d="grid" placeItems={"center"} gridTemplateColumns={"auto"} gridGap={15}>
          {
            Object.keys(room).length > 0 && (
              <Box
                cursor={'pointer'}
                onClick={() => navigate(`/room/${room.slug}`)}
                key={room.slug}
                bg={"tomato"}
                width={'150px'}
                height={'150px'}
                display={'flex'}
                borderRadius={8}
                transition={"all .1s ease-in"}
                _hover={{ height: '170px', width: '170px' }}
                alignItems={'center'}
                justifyContent={'center'}>
                <Text>{room.roomName}</Text>
              </Box>
            )
          }
        </Box>

        <Box
          gridGap="4"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent={'center'} >
          
          <Input placeholder="Enter a room name here..." disabled={Object.keys(room).length} value={roomName} onChange={e => setRoomName(e.target.value)} />
          <Button disabled={Object.keys(room).length || !(roomName.length)} onClick={joinRoom}>
            Create Room
          </Button>
        </Box>
      </Box>
    </Layout >
  )
}

export default MainPage;