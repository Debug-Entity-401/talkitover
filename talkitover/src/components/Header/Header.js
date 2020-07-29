import React from 'react';
import { connect } from 'react-redux';
import { Container, Form, Nav, Navbar, Button, Modal } from 'react-bootstrap';
import Oauth from '../Oauth/Oauth';
import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/logo.png';
import { LoginContext } from '../auth/context';
import { Alert } from 'react-bootstrap';
import Show from '../auth/show';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF } from '@fortawesome/free-brands-svg-icons';

class Header extends React.Component {
    static contextType = LoginContext;
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showHide: false,
            showAlert: false
        };
    }
    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }


    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();
        document.getElementById("login-form").reset();
        await this.context.login(this.state.username, this.state.password);
        console.log('>>>>>>>>>>>>>>>>>>>>', this.state.showAlert);
        if (this.context.loggedIn === 'invalid') this.setState({ showAlert: !this.state.showAlert });
        else if (this.context.loggedIn) this.handleModalShowHide();
    }
    // facebookicon.appendChild(``)



    render() {
        return (
            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand ><img className="logo" src={logo} alt="main-logo" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="justify-content-end main-div" style={{ width: "50%" }} >
                                <li><Nav.Link href="/">Main</Nav.Link></li>
                                <li><Nav.Link className="scroll" href="#misson">Misson</Nav.Link></li>
                                <li><Nav.Link className="scroll" href="#services">Services</Nav.Link></li>
                                <li><Nav.Link className="scroll" href="#overcome">Overcome</Nav.Link></li>
                                <li> <Nav.Link className="scroll" href="#testominals">testmonials</Nav.Link></li>
                                <li> <Nav.Link href="/profile">profile</Nav.Link></li>
                                <li> <Nav.Link href="/otherProfile">otherProfile</Nav.Link></li>
                                <li> <Nav.Link href="/posts">Post</Nav.Link></li>
                            </Nav>
                            <Nav className="justify-content-end  " style={{ width: "50%" }}>

                                <Show condition={this.context.loggedIn === true || this.props.signUp.loggedIn}>
                                    <Button variant="primary" onClick={this.context.logout}>Logout</Button>
                                </Show>
                                <Show condition={(this.context.loggedIn === false || this.context.loggedIn === 'invalid') && this.props.signUp.loggedIn === ''}>
                                    <Button variant="success" onClick={() => this.handleModalShowHide()}>
                                        Sign in
                                    </Button>
                                    <li> <Nav.Link href="/signup">Sign up</Nav.Link></li>
                                </Show>
                                <Modal show={this.state.showHide} onHide={() => this.handleModalShowHide()}>
                                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                                        <Modal.Title>
                                            <div className="sign-in-header">

                                                <h1>Sign in</h1>
                                            </div>

                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={this.handleSubmit} id="login-form" >
                                            <div className="user-inputs">
                                                <Form.Control className="user-input"
                                                    placeholder="Username"
                                                    name="username"
                                                    onChange={this.handleChange}

                                                />
                                                <div className="border">
                                                </div>

                                                <Form.Control className="user-input"
                                                    placeholder="Password"
                                                    name="password"
                                                    type="password"
                                                    onChange={this.handleChange}
                                                />
                                                <div className="border">
                                                </div>
                                            </div>
                                            
                                            <Alert variant="danger" className="user-msg" show={this.state.showAlert}>
                                                 Invalid username or password
                                           </Alert>
                                           
                                            <div className="login-btn">
                                                <Button type="submit" className="btn btn-login">Login</Button>
                                            </div>

                                            <div className="auth-login">
                                                <span>or Sign in with:</span>
                                                <br />
                                            </div>

                                            <div className="facebook-btn">
                                                <button type="button" class="btn btn-white btn-rounded mr-md-3 z-depth-1a"><i class="fa fa-facebook text-center"></i></button>
                                            </div>
                                        </Form>
                                    </Modal.Body>
                                </Modal>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    }
};

const mapStateToProps = state => ({
    signUp: state.signUp
});

export default connect(mapStateToProps)(Header);