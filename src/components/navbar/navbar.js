import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import useAuth from '../../hooks/useAuth';

/**
 * Custom navbar componenti
 * @author [suleymansevimli](https://github.com/suleymansevimli)
 * 
 * @returns {JSX.Element}
 */
const Navbar = () => {

    // Router Hooks
    const { authed, logout } = useAuth();
    const navigate = useNavigate();

    /**
     * Logout function
     */
    const handleLogout = () => {
        logout().then(() => {
            navigate('/')
        });
    }

    return (
        <nav className="navbar">
            {authed
                ?
                <ul>
                    <li>
                        <span onClick={handleLogout}>Çıkış Yap</span>
                    </li>
                    <li>
                        <Link to="/">Main Page</Link>
                    </li>
                </ul>
                : <ul>
                    <li>
                        <Link to="/">Login</Link>
                    </li>
                    <li>
                        <Link to="/room/1231">Room</Link>
                    </li>
                </ul>
            }
        </nav>
    );
};

export default Navbar;