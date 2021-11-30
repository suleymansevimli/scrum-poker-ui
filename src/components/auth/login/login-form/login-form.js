import { useContext, useLayoutEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@chakra-ui/button';
import { VStack, Input } from '@chakra-ui/react';
import { useSocket } from '../../../../providers/socket-providers';
import { authContext } from '../../../../hooks/useAuth'

const LoginForm = ({ redirectTo }) => {
    
    // socket
    // const { changeSocketUriSource } = useSocket();

    // useLayoutEffect(() => {
    //     changeSocketUriSource('auth');
    // },[changeSocketUriSource])

    // state
    const [userName, setUserName] = useState('');

    // hooks
    const navigate = useNavigate();

    const { login } = useContext(authContext);
    const { state } = useLocation();

    /**
     * Login function
     * @author [suleymansevimli](https://github.com/suleymansevimli)
     */
    const handleLogin = () => {
        login({ userName }).then(() => {
            navigate(redirectTo || state?.from || "/");
        });
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