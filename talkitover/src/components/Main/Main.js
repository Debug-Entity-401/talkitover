import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss'
import '../../main-css/media.scss';
import "../../main-css/base.scss";
import {Container,Col,Row,Carousel,Card} from 'react-bootstrap';
import heroimg from '../../assets/images/hero-slier-img.webp';
import heroimg2 from '../../assets/images/hero-slider-img-2.webp';
import heroimg3 from '../../assets/images/hero-slier-img-3.webp';
import privateChat from '../../assets/images/padlock.svg';
import dollarSign from '../../assets/images/dollar.svg';
import brain from '../../assets/images/brain (1).svg';
import talk from '../../assets/images/conversation.svg';
import meditation from '../../assets/images/meditation.svg';
import conversation from '../../assets/images/conversation_.svg';
import happy_face from '../../assets/images/happy_face_monochromatic.svg';
import Aos from 'aos';
import "aos/dist/aos.css";

import Header from '../Header/Header';
const Main = () => {

    useEffect(() => {
        Aos.init({ duration: 1500 })
    }, [])

    useEffect(() => {
        document.addEventListener('DOMContentLoaded',function(event){
            // array with texts to type in typewriter
            var dataText = [ "You Don't Have To Struggle In Silence.", "Don't Hold It Back.", "TalkitOver."];
            
            // type one text in the typwriter
            // keeps calling itself until the text is finished
            function typeWriter(text, i, fnCallback) {
              // chekc if text isn't finished yet
              if (i < (text.length) && document.querySelector(".home-heading")) {
                // add next character to h1
               document.querySelector(".home-heading").innerHTML = text.substring(0, i+1) +'<span class="animated-heading" aria-hidden="true"></span>';
          
                // wait for a while and call this function again for next character
                setTimeout(function() {
                  typeWriter(text, i + 1, fnCallback)
                }, 100);
              }
              // text finished, call callback if there is a callback function
              else if (typeof fnCallback == 'function') {
                // call callback after timeout
                setTimeout(fnCallback, 700);
              }
            }
            // start a typewriter animation for a text in the dataText array
             function StartTextAnimation(i) {
               if (typeof dataText[i] == 'undefined'){
                  setTimeout(function() {
                    StartTextAnimation(0);
                  }, 1000);
               }
               // check if dataText[i] exists
               if(dataText[i]) {
                   if (i < dataText[i].length) {
                     // text exists! start typewriter animation
                    typeWriter(dataText[i], 0, function(){
                      // after callback (and whole text has been animated), start next text
                      StartTextAnimation(i + 1);
                    });
                   }
               }
            }
            // start the text animation
            StartTextAnimation(0);
          })
    },[])
 


    return (
        <>
        <Header />
        <main>

            <div className="hero-main-section">
                <Container>
                    <Row>
                        <Col xs={6} sm={6} md={6}>
                            <div className="website-introduction">
                            {/*<Fade big collapse duration={3000}>*/}
                            {/*</Fade>*/}
                            {/*<h1 id="heading-1">You Don't Have To Struggle In <span>Silence</span> </h1>
                                <h1 id="heading-2">Don't Hold It <span>Back</span> </h1>
                                <h1 id="heading-3"> <span>TalkitOver</span> </h1>
    <h1 id="heading-4">You Don't Have To Struggle In <span>Silence</span> </h1>*/}
                            <h1 className="home-heading"></h1>
                         

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
                                            {/*<h3>First slide label</h3>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>*/}
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={heroimg2}
                                            alt="Third slide"
                                        />

                                        <Carousel.Caption>
                                           {/* <h3>Second slide label</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>*/}
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={heroimg3}
                                            alt="hero"
                                        />

                                        <Carousel.Caption>
                                            {/*<h3>Third slide label</h3>
                                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>*/}
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="our-objective" id="misson">
            <br />
            <br />
            <br />
                <h2>Our Mission</h2>

                <Container>
                    <div className="talkitover-intro" >
                        <Row>
                            <Col xs={12} sm={12} md={6}>
                                <div className="talkitover-intro-title">
                                    <h3>TalkitOver</h3>
                                </div>
                                <div className="talkitover-intro-description">
                                <p>Talkitover Is A Social Platform That Aims To Provide A Social Service That's Similar To The Concept Of Talk Therapy, To Help And Support People Who Are Facing Mental issues To Cope, And To Help People Who Are Going Through A Hard Time To Get Some Advice From People Going/Went Through A Similar Situation, And Simply Give Them The Opportunity To Be Heard!
                                We Want To Provide A Free And Easy Solution For People Who Can't Afford A Professional Therapist And Are Just In Need For A Quick Free Talk Without The Fear Of Judgement. </p>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={6}>
                                <div data-aos="zoom-in">
                                    <div className="talkitover-intro-image">
                                        <img src={talk} id="intro-img" alt="introduction-for-web"/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
            <div className="feature" id="services">
                <h2>Our Services</h2>
                <div className="features-items" >
                    <Container>
                        <Row>
                            <Col xs={12} sm={12} md={4}>
                                <div data-aos="zoom-in" >

                                    <div class="circle">
                                        <div class="service-item">
                                            <div class="service-icon">
                                                <img src= {privateChat} style={{ width: '48px', height: "2.5rem", marginTop: '10px' }} />                                            </div>
                                        </div>

                                    </div>
                                    <div class="service-text">
                                        <div class="service-title">
                                            <h5>Private Chat</h5>
                                        </div>

                                        <div class="service-description">
                                            <p>Chat with strangers without the fear of judgement, and find support and friendship</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                                <div data-aos="zoom-in" >

                                    <div class="circle">
                                        <div class="service-item">
                                            <div class="service-icon">
                                                <img src={brain} style={{ width: '48px', height: "2.5rem", marginTop: '10px' }} />                                            </div>
                                        </div>

                                    </div>
                                    <div class="service-text">
                                        <div class="service-title">
                                            <h5>Mental Health Insights</h5>
                                        </div>

                                        <div class="service-description">
                                            <p>Insightful articles about psychology and mental health awareness</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={4}>
                                <div data-aos="zoom-in">

                                    <div class="circle">
                                        <div class="service-item">
                                            <div class="service-icon">
                                                <img src={dollarSign} style={{ width: '48px', height: "2.5rem", marginTop: '10px' }} />                                            </div>
                                        </div>

                                    </div>
                                    <div class="service-text">
                                        <div class="service-title">
                                            <h5>Completely Free</h5>
                                        </div>

                                        <div class="service-description">
                                            <p>A free solution to talk about your problems and get help and support</p>
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
                                        <img className="icon" src={happy_face} style={{ width: '66%', margin: "0 auto" }} />
                                        <Card.Body>
                                            <Card.Title className="card-title">Acceptance</Card.Title>
                                            <Card.Text>
                                                Accept who you are and value yourself, it's is essential for your mental health to avoid self-criticism and to treat yourself with kindness and acceptance.
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
                                        <img className="icon" src={conversation} style={{ width: '94%',margin: "6% auto" }} />
                                        <Card.Body>
                                            <Card.Title>Talking</Card.Title>
                                            <Card.Text>
                                                Talk about your feelings, talking about your feelings is so important in keeping your mental balance, and it helps you stay in good mental health.
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

                                        <img className="icon" src={meditation} style={{ width: '66%', margin: "0 auto", marginTop: '5%' }} />
                                        <Card.Body style={{marginTop: '12%'}}>
                                            <Card.Title>Take a break</Card.Title>
                                            <Card.Text>
                                                Taking a break to relax is good to free your mind from stress, give yourself some ‘me time’ to meditate, this can help you improve your state of mind.
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
        </>

    )
    
};
export default Main;