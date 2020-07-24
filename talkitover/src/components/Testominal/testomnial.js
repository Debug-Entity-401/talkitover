import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faYoutube, faInstagram, faSnapchat } from '@fortawesome/free-brands-svg-icons';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/Col';
import './testmonial.scss';

class Testominial extends React.Component {
    render() {
        return (
            <section>
                <div className="testmonials">
                    <h1>testmonials</h1>
                    <Container>
                        <Carousel className="testominal-slider" style={{ height: "450px" }}>
                            <Carousel.Item>
                                <Row>
                                    <Col xs={4} sm={4} md={4}>

                                        <Card className="testmonial-card" >
                                            <div className="user-image">
                                                <img src="https://randomuser.me/api/portraits/men/11.jpg" />
                                            </div>
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
    </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs={4} sm={4} md={4}>

                                        <Card className="testmonial-card" >
                                            <div className="user-image">

                                                <img src="https://randomuser.me/api/portraits/men/94.jpg" />
                                            </div>
                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
    </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs={4} sm={4} md={4}>

                                        <Card className="testmonial-card" >
                                            <div className="user-image">

                                                <img src="https://randomuser.me/api/portraits/women/26.jpg" />
                                            </div>                                    <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
    </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Carousel.Item>
                            <Carousel.Item>
                                <Row>
                                    <Col xs={4} sm={4} md={4}>

                                        <Card className="testmonial-card" >
                                            <div className="user-image">

                                                <img src="https://randomuser.me/api/portraits/men/94.jpg" />
                                            </div>                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
    </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs={4} sm={4} md={4}>

                                        <Card className="testmonial-card" >
                                        <div className="user-image">

<img src="https://randomuser.me/api/portraits/women/66.jpg" />
</div>                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
    </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col xs={4} sm={4} md={4}>

                                        <Card className="testmonial-card" >
                                        <div className="user-image">

<img src="https://randomuser.me/api/portraits/men/60.jpg" />
</div>                                            <Card.Body>
                                                <Card.Title>Card Title</Card.Title>
                                                <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
    </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Carousel.Item>
                        </Carousel>
                    </Container>
                </div>

            </section>
        )
    }
}

export default Testominial;