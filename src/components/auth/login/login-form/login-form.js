import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@chakra-ui/button';
import { VStack, Input } from '@chakra-ui/react';
import { useSocket } from '../../../../providers/socket-providers';
import { AUTH_EVENT_ENUMS } from '../../../../constants/user-management-event-enums';
import useAuth from '../../../../hooks/useAuth'
import { useDispatch } from 'react-redux';
import { setAllUsers } from '../../../../redux/slices/user-management-slice';

const LoginForm = ({ redirectTo }) => {

    // state
    const [userName, setUserName] = useState('');

    // hooks
    const navigate = useNavigate();
    const { login, setToken } = useAuth();
    const { state } = useLocation();

    // socket
    const { listener } = useSocket();

    // redux
    const dispatch = useDispatch();

    // functions
    useEffect(() => {
        listener(AUTH_EVENT_ENUMS.LOGIN_REQUEST_ACCEPTED, (data) => {
            setToken(data.uniqueId);
        });
        listener(AUTH_EVENT_ENUMS.GET_ALL_USERS, (allUsers) => {
            dispatch(setAllUsers(allUsers));
        })
    }, [listener]);

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