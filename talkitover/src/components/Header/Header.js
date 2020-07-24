import React, { useState } from 'react';
import { Container, Nav, Navbar, Button, Modal } from 'react-bootstrap';
import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/logo.png';
const Header = () => {

    return (
        <header>

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand ><img className="logo" src={logo} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-end main-div" style={{ width: "50%" }} >
                            <li><Nav.Link href="#home">Home</Nav.Link></li>
                            <li><Nav.Link href="#misson">Misson</Nav.Link></li>
                            <li><Nav.Link href="#services">Services</Nav.Link></li>
                            <li> <Nav.Link href="#About us">About Us</Nav.Link></li>
                        </Nav>
                        <Nav className="justify-content-end  " style={{ width: "50%" }}>
  
                            <li> <Nav.Link href="#About us">Sign up</Nav.Link></li>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
};
export default Header;