import React from 'react';
import { Center, Button } from '@chakra-ui/react';
import Layout from '../../components/layout/layout';
import { Input } from '@chakra-ui/react';

/**
 * Ana sayfa componenti
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element} JSX.Element
 */
const MainPage = () => {

  return (
    <Layout>
      <Center>
        <Input placeholder="Room Name"/>
        <Button>Join</Button>
      </Center>
    </Layout>
  )
}

export default MainPage;