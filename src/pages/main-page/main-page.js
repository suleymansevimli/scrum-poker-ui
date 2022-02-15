import React from 'react';
import { Button, Box, Text } from '@chakra-ui/react';
import Layout from '../../components/layout/layout';
import { Input, Tooltip } from '@chakra-ui/react';
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
  const { rooms } = useSelector(state => state.userManagementSlice);

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

        <Box d="grid" placeItems={"center"} placeItems="center" gridTemplateColumns={"auto"} gridGap={15}>
          {
            rooms.length > 0 &&
            rooms.map(room => (
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
                <Text>{room.slug}</Text>
              </Box>
            ))
          }
        </Box>

        <Box
          gridGap="4"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent={'center'} >
          {rooms.length === 1 &&
            (
              <Box border={'1px solid orange'} padding={15} borderRadius={8}>
                <Text color={"white"}> Sadece bir tane oda oluşturulabilir. Oluşturulan odaya giriş yapabilirsiniz. </Text>
              </Box>
            )
          }
          <Input placeholder="Room Name" disabled={rooms.length === 1} value={roomName} onChange={e => setRoomName(e.target.value)} />
          <Button disabled={rooms.length === 1} onClick={joinRoom}>Oluştur</Button>
        </Box>
      </Box>
    </Layout >
  )
}

export default MainPage;