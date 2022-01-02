import { Box } from '@chakra-ui/react';
import LoginForm from '../../components/auth/login/login-form/login-form';
import Layout from '../../components/layout/layout';

/**
 * Login page
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Login = () => {

  return (
    <Layout layoutStyles={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={"100%"}>
        <LoginForm />
      </Box>
    </Layout>
  );
};

export default Login;