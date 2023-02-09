import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './components.css'

//NavBar for the whole website.
function SiteNavbar(props) {
    return (
        <div>
            <Navbar className='navbarMain' expand="lg">
                <Container>
                    <Navbar.Brand className='navbarItem main' href="#home">ALerT</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="navbar navbar-dark">
                        <NavLink className='navbarItem' to={props.view=='student' ? '/student/landing' : '/instructor/landing'}>Home Page</NavLink>
                        <NavLink className='navbarItem' to='/edit_profile'>Edit Profile</NavLink>
                        <NavLink className='navbarItem' to='/'>Logout</NavLink>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default SiteNavbar;