import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './components.css'

//NavBar for the whole website.
function TopNavbar(props) {
    return (
        <div>
            <Navbar className='navbarMain' expand="lg">
                <Container>
                    <Navbar.Brand className='navbarItem main'>{process.env.REACT_APP_NAME}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar navbar-dark">
                        <NavLink className='navbarItem' to='/'>Home Page</NavLink>
                        <NavLink className='navbarItem' to='/profile'>Profile</NavLink>
                        <NavLink className='navbarItem' to='/'>Logout</NavLink> {/* TODO: attach logout functionality (i.e. API request trigger)*/}
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default TopNavbar;