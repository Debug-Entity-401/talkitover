import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import sondos from '../../assets/images/sondos.png';
import bushra from '../../assets/images/bushra.jpg';
import alaa from '../../assets/images/alaa.png';
import ammar from '../../assets/images/ammar.png';
import './testmonial.scss';

class Testominial extends React.Component {
    render() {
        return (
            <section>
                <div className="testmonials" id="testominals">
                    <h1>About Us</h1>
                    <Container>
                    <div id="about-us">

                                <Row>
                                    <Col xs={12} sm={12} md={3}>

                                        <Card className="testmonial-card" >
                                            <div className="user-image">
                                                <img src={sondos} alt="portrait" />
                                            </div>
                                            <Card.Body>
                                                <Card.Title>Sondos Abu-Elayyan</Card.Title>
                                                <Card.Text>
                                                A Software Developer with background in mechatronics engineer. Good at problem solving, can learn fast and work under pressure, I like working with teams.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs={12} sm={12} md={3}>

                                        <Card className="testmonial-card" >
                                            <div className="user-image">

                                                <img src={bushra} alt="men" />
                                            </div>
                                            <Card.Body>
                                                <Card.Title>Bushra Bilal</Card.Title>
                                                <Card.Text>
                                                    A Full-Stack Software Developer with background in Physics, passionate about Science and Technology, have a good leadership and orgaization skills.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs={12} sm={12} md={3}>

                                        <Card className="testmonial-card" >
                                            <div className="user-image">

                                                <img src={alaa} alt="women" />
                                            </div>                                    <Card.Body>
                                                <Card.Title>Ala'a Al-Masri</Card.Title>
                                                <Card.Text>
                                                 A Full-Stack Developer with a Degree in CIS, passionate about designing and building creative websites motivated to learn and discover new Technologies and skills.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs={12} sm={12} md={3}>

                                        <Card className="testmonial-card" >
                                            <div className="user-image">

                                                <img src={ammar} alt="men-portaits" />
                                            </div>                                            <Card.Body>
                                                <Card.Title>Ammar Al-Hariry</Card.Title>
                                                <Card.Text>
                                                 A Full-Stack Developer with background in Computer Applications. Passionate about coding to maximize efficiency while developing creative solutions.
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    
                                    </Col>
                                </Row>
                                </div>

            
                    </Container>
                </div>

            </section>
        )
    }
}

export default Testominial;