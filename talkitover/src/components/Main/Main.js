import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss'
import '../../main-css/media.scss';
import "../../main-css/base.scss";
import talkitoverintroImage from '../../assets/images/intro-img.webp';
import {Container,Col,Row,Carousel,Card} from 'react-bootstrap';
import heroimg from '../../assets/images/hero-slier-img.webp';
import heroimg2 from '../../assets/images/hero-slider-img-2.webp';
import heroimg3 from '../../assets/images/hero-slier-img-3.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import Aos from 'aos';
import "aos/dist/aos.css";
const Main = () => {
    useEffect(() => {
        Aos.init({ duration: 1500 })
    }, [])
    return (
        <main>
            <div className="hero-main-section">
                <Container>
                    <Row>
                        <Col xs={6} sm={6} md={6}>
                            <div className="website-introduction">
                                <h1>Committed To <span>Superior</span> Happiness And Results</h1>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <div className="hero-slider">
                                <Carousel>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={heroimg}
                                            alt="First slide"
                                        />
                                        <Carousel.Caption>
                                            <h3>First slide label</h3>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={heroimg2}
                                            alt="Third slide"
                                        />

                                        <Carousel.Caption>
                                            <h3>Second slide label</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={heroimg3}
                                            alt="hero"
                                        />

                                        <Carousel.Caption>
                                            <h3>Third slide label</h3>
                                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="our-objective">
                <h2>Our Objective</h2>

                <Container>
                    <div className="talkitover-intro" id="misson">
                        <Row>
                            <Col xs={12} sm={12} md={6}>
                                <div className="talkitover-intro-title">
                                    <h3>Talkit Over</h3>
                                </div>
                                <div className="talkitover-intro-description">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ex arcu, venenatis eu dignissim eu, molestie id est. In interdum risus et pulvinar convallis. Fusce vel elit pharetra, semper libero eu, fringilla lorem. Aenean eget ligula quis massa mattis rhoncus. Aliquam in aliquam nibh. Integer at consectetur leo. Nam elementum iaculis vestibulum. Nulla elit turpis, condimentum id augue at, sodales facilisis est. Aliquam nec dolor metus. Nullam tempus, arcu nec aliquet accumsan, velit ipsum eleifend est, ut convallis urna ligula fermentum nisi. Pellentesque eu dignissim lacus. Sed scelerisque, ligula id hendrerit blandit, nunc purus commodo neque, sit amet mattis sapien turpis ut mauris. Sed feugiat pellentesque venenatis. Suspendisse convallis eget orci a convalli </p>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <div data-aos="fade-left">
                                    <div className="talkitover-intro-image">
                                        <img src={talkitoverintroImage} alt="introduction-for-web"/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
            <div className="feature">
                <h2>Our Services</h2>
                <div className="features-items" id="services">
                    <Container>
                        <Row>
                            <Col xs={12} sm={6} md={3}>
                                <div data-aos="zoom-in" >

                                    <div class="circle">
                                        <div class="service-item">
                                            <div class="service-icon">
                                                <FontAwesomeIcon icon={faFacebookF} style={{ width: '48px', height: "2.5rem", marginTop: '10px' }} />                                            </div>
                                        </div>

                                    </div>
                                    <div class="service-text">
                                        <div class="service-title">
                                            <h5>PROFESSIONAL TEAM</h5>
                                        </div>

                                        <div class="service-description">
                                            <p>with our products and services you dont have to convince your clients</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={3}>
                                <div data-aos="zoom-in" >

                                    <div class="circle">
                                        <div class="service-item">
                                            <div class="service-icon">
                                                <FontAwesomeIcon icon={faFacebookF} style={{ width: '48px', height: "2.5rem", marginTop: '10px' }} />                                            </div>
                                        </div>

                                    </div>
                                    <div class="service-text">
                                        <div class="service-title">
                                            <h5>PROFESSIONAL TEAM</h5>
                                        </div>

                                        <div class="service-description">
                                            <p>with our products and services you dont have to convince your clients</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={3}>
                                <div data-aos="zoom-in">

                                    <div class="circle">
                                        <div class="service-item">
                                            <div class="service-icon">
                                                <FontAwesomeIcon icon={faFacebookF} style={{ width: '48px', height: "2.5rem", marginTop: '10px' }} />                                            </div>
                                        </div>

                                    </div>
                                    <div class="service-text">
                                        <div class="service-title">
                                            <h5>PROFESSIONAL TEAM</h5>
                                        </div>

                                        <div class="service-description">
                                            <p>with our products and services you dont have to convince your clients</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={3}>
                                <div data-aos="zoom-in">

                                    <div class="circle">
                                        <div class="service-item">
                                            <div class="service-icon">
                                                <FontAwesomeIcon icon={faFacebookF} style={{ width: '48px', height: "2.5rem", marginTop: '10px' }} />                                            </div>
                                        </div>

                                    </div>
                                    <div class="service-text">
                                        <div class="service-title">
                                            <h5>PROFESSIONAL TEAM</h5>
                                        </div>

                                        <div class="service-description">
                                            <p>with our products and services you dont have to convince your clients</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <div className="overcome" id="overcome">
                <h2>Ways to help you overcome Mental Issues</h2>
                <Container>
                    <div className="overcome-cards">
                        <Row>
                            <Col xs={12} sm={6} md={4}>
                                <div data-aos="flip-left"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000">
                                    <Card className="overcome-card" >
                                        <FontAwesomeIcon className="icon" icon={faFacebookF} style={{ width: '48px', height: "2.5rem", marginTop: "7%", marginLeft: "40%" }} />
                                        <Card.Body>
                                            <Card.Title className="card-title">Card Title</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
    </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <div data-aos="flip-left"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000">
                                    <Card className="overcome-card" >
                                        <FontAwesomeIcon className="icon" icon={faFacebookF} style={{ width: '48px', height: "2.5rem", marginTop: "7%", marginLeft: "40%" }} />
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
    </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <div data-aos="flip-left"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000">
                                    <Card className="overcome-card" >

                                        <FontAwesomeIcon className="icon" icon={faFacebookF} style={{ width: '48px', height: "2.5rem", marginTop: "7%", marginLeft: "40%" }} />
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
    </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>

                            <Col xs={12} sm={6} md={4}>
                                <div data-aos="flip-left"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000">
                                    <Card className="overcome-card" >
                                        <FontAwesomeIcon className="icon" icon={faFacebookF} style={{ width: '48px', height: "2.5rem", marginTop: "7%", marginLeft: "40%" }} />
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
    </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <div data-aos="flip-left"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000">
                                    <Card className="overcome-card" >
                                        <FontAwesomeIcon className="icon" icon={faFacebookF} style={{ width: '48px', height: "2.5rem", marginTop: "7%", marginLeft: "40%" }} />
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
    </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <div data-aos="flip-left"
                                    data-aos-easing="ease-out-cubic"
                                    data-aos-duration="2000">
                                    <Card className="overcome-card" >
                                        <FontAwesomeIcon className="icon" icon={faFacebookF} style={{ width: '48px', height: "2.5rem", marginTop: "7%", marginLeft: "40%" }} />
                                        <Card.Body>
                                            <Card.Title>Card Title</Card.Title>
                                            <Card.Text>
                                                Some quick example text to build on the card title and make up the bulk of
                                                the card's content.
    </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
           
        </main>
    )
};
export default Main;