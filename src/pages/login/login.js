import { Button } from '@chakra-ui/button';
import { useNavigate, useLocation } from 'react-router-dom'
import Layout from '../../components/layout/layout';
import useAuth from '../../hooks/useAuth'

/**
 * Login page
 * 
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { state } = useLocation();

  // let { search } = useLocation();
  // const query = new URLSearchParams(search);
  // const paramField = query.get('field');

  /**
   * Login function
   * @author [suleymansevimli](https://github.com/suleymansevimli)
   */
  const handleLogin = () => {
    login().then(() => {
      navigate( state?.from || "/main-page");
    });
  };

  return (
    <Layout>
        <Button onClick={handleLogin}>Login</Button>
    </Layout>
  );
};

export default Login;