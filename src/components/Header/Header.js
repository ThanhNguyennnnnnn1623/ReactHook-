import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../../Service/apiService';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { SiReactivex } from "react-icons/si";
import { useState } from 'react';
import Profile from './Profile';


const Header = () => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();

    const handleLogin = () => {
        navigate('/login')
    }

    const handleLogOut = async () => {
        let res = await logOut(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            dispatch(doLogout());
            navigate('/login');
        }
        else {
            toast.error(res.EM);
        }
    }

    const handleProfile = () => {
        setShow(true);
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink to="/" className='navbar-brand'><SiReactivex className='logo-360' />Thanh Nguyen</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link'>Home</NavLink>
                            <NavLink to="/users" className='nav-link'>User</NavLink>
                            <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                        </Nav>
                        <Nav>
                            {isAuthenticated === false ?
                                <>
                                    <button className='btn-login'
                                        onClick={() => handleLogin()}
                                    >Log in</button>
                                    <button className='btn-signup'>Sign up</button>
                                </>
                                :
                                < NavDropdown title="Settings" id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => handleProfile()}>
                                        Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleLogOut()}>
                                        Log out
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                            <Language />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar >
            <Profile show={show} setShow={setShow} />
        </>
    );
}

export default Header;