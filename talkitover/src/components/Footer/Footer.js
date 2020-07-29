import React from 'react';
import {Container,Nav,Navbar,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.scss';
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube, faInstagram, } from '@fortawesome/free-brands-svg-icons';

function Footer() {

    return (
        <footer>
            <Container>
                <Row>
                    <Col xs={6} sm={6} md={8}>
                        <img className="footer-logo" src={logo} alt="logo"/>
                      
                    </Col>
                    <Col xs={12} sm={12} md={4}>

                        <Navbar  className="full-footer" expand="lg">
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="footer-nav">
                                        <li><Nav.Link href="#home">Home</Nav.Link></li>
                                        <li><Nav.Link href="#misson">Misson</Nav.Link></li>
                                        <li><Nav.Link href="#services">Services</Nav.Link></li>
                                        <li> <Nav.Link href="#About us">About Us</Nav.Link></li>
                                    </Nav>
                                </Navbar.Collapse>
                        </Navbar>
                        <ul>
                            <li><a href="http://facebookc.com"><FontAwesomeIcon className="social-icon" icon={faFacebookF} /></a></li>
                            <li><a href="https://twitter.com/login"><FontAwesomeIcon className="social-icon" icon={faTwitter} /></a></li>
                            <li><a href="https://www.youtube.com/channel/UCcIiwbi-NN3ibQyvuGVWBYA?view_as=subscriber"><FontAwesomeIcon className="social-icon" icon={faYoutube} /></a></li>
                            <li><a href="https://www.instagram.com/"><FontAwesomeIcon  className="social-icon" icon={faInstagram} /></a></li>

                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
};
export default Footer;