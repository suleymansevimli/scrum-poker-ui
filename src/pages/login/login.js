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
    <Layout>
      <LoginForm />
    </Layout>
  );
};

export default Login;