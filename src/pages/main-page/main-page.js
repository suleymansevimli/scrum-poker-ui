import React, { useEffect } from 'react';
import { Button, Box } from '@chakra-ui/react';
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
    if (joinedRoom.slug) {
      navigate(`/room/${joinedRoom.slug}`);
    }
  }, [joinedRoom]);

  return (
    <Layout layoutStyles={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={"100%"} height={"100%"}>
        <Box
          gridGap="4"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent={'center'}
          height={"100%"} >
          <Input placeholder="Room Name" value={roomName} onChange={e => setRoomName(e.target.value)} />
          <Button onClick={joinRoom}>Katıl</Button>
        </Box>
      </Box>
    </Layout>
  )
}

export default MainPage;