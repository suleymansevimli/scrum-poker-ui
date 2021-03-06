import { useState } from 'react';
import { Button } from '@chakra-ui/button';
import { VStack, Input } from '@chakra-ui/react';
import { loginRequest } from '../../../../wrappers/auth/auth-emitter';

const LoginForm = () => {
    
    // state
    const [userName, setUserName] = useState('');

    /**
     * Login function
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    const handleLogin = () => {
        loginRequest(userName)
    };

    return (
        <VStack
            spacing="5"
            as="div"
            justifySelf="center"
            width="450px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column">
            <Input
                placeholder="Username"
                size="lg"
                width="100%"
                borderRadius="md"
                borderWidth="2px"
                onChange={(e) => setUserName(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
        </VStack>
    )
}

export default LoginForm;