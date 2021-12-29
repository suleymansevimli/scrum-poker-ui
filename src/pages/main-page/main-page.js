import React, { useEffect } from 'react';
import { Center, Button, Box, VStack } from '@chakra-ui/react';
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
  const { joinedRoom } = useSelector(state => state.userManagementSlice);

  /**
   * Room oluşturma işlemini başlatır.
   */
  const joinRoom = () => {
    dispatch(setIsRoomCreating(true));
    createNewRoom(roomName);
  };

  /**
   * Kullanıcı sadece bir tane room'a kayıtlı olabilir.
   * Bu yüzden, kullanıcı bir room'a giriş yapmış ise,
   * direkt o room'a gidecek.
   * 
   * @author [suleymansevimli](https://github.com/suleymansevimli)
   */
  useEffect(() => {
    if (joinedRoom.roomName) {
      navigate(`/room/${joinedRoom.roomName}`);
    }
  }, [joinedRoom]);

  return (
    <Layout layoutStyle={{display:'flex', alignItems: 'center',justifyContent:'center', w:'100%', h:'100%'}}>
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