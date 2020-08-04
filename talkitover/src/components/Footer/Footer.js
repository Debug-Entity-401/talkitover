import React from 'react';
import {Container,Nav,Navbar,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.scss';
import logo from '../../assets/images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube, faInstagram, } from '@fortawesome/free-brands-svg-icons';

function Footer() {

    return (
        <footer >
            <Container>
                <Row>
                    <Col xs={6} sm={6} md={8}>
                        <img className="footer-logo" src={logo} alt="logo"/>
                      
                    </Col>
                    <Col xs={12} sm={12} md={4}>


                        <ul>
                            <li><a href="http://facebook.com" target="_blank"><FontAwesomeIcon className="social-icon" icon={faFacebookF} /></a></li>
                            <li><a href="https://twitter.com/login" target="_blank"><FontAwesomeIcon className="social-icon" icon={faTwitter} /></a></li>
                            <li><a href="https://www.youtube.com/channel/UCcIiwbi-NN3ibQyvuGVWBYA?view_as=subscriber" target="_blank"><FontAwesomeIcon className="social-icon" icon={faYoutube} /></a></li>
                            <li><a href="https://www.instagram.com/" target="_blank"><FontAwesomeIcon  className="social-icon" icon={faInstagram} /></a></li>

                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
};
export default Footer;