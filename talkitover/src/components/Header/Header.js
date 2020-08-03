import React from 'react';
import { connect } from 'react-redux';
import { Container, Form, Nav, Navbar, Button, Modal, Row } from 'react-bootstrap';
import { Route, Link,Redirect } from 'react-router-dom';
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
            showAlert: false,
            redirect: null,

        };
    }
    showpassword(e)
    {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
    }
    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide });
        if (this.state.showHide === true) {
            this.setState({ showAlert: false });
        }
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
        else if (this.context.loggedIn) 
        {
            // this.handleModalShowHide();
            this.setState({redirect:'/home'})

        }
    }
    // facebookicon.appendChild(``)



    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
          }
          
        return (
            <header>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand ><img className="logo" src={logo} alt="main-logo" /></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="justify-content-end main-div" style={{ width: "50%" }} >
                                <ul>
                                    <li><Nav.Link href="/">Main</Nav.Link></li>
                                    <li><Nav.Link className="scroll" href="#misson">Misson</Nav.Link></li>
                                    <li><Nav.Link className="scroll" href="#services">Services</Nav.Link></li>
                                    <li><Nav.Link className="scroll" href="#overcome">Overcome</Nav.Link></li>
                                    <li> <Nav.Link className="scroll" href="#testominals">Testmonials</Nav.Link></li>
                                </ul>
                            </Nav>
                            <Nav className="justify-content-end  " style={{ width: "50%" }}>

                                <Show condition={this.context.loggedIn === true || this.props.signUp.loggedIn}>
                                    <Button variant="primary" onClick={this.context.logout}><Link id='logout-link' to='/'>Logout</Link> </Button>
                                </Show>
                                <Show condition={(this.context.loggedIn === false || this.context.loggedIn === 'invalid') && this.props.signUp.loggedIn === ''}>
                                    <Button className="primary-btn" variant="success" onClick={() => this.handleModalShowHide()}>
                                        Sign in
                                    </Button>
                                    <li> <Nav.Link href="/signup">Sign up</Nav.Link></li>
                                </Show>
                                <Modal show={this.state.showHide} onHide={() => this.handleModalShowHide()}>
                                    <Modal.Header className='exit' closeButton onClick={() => this.handleModalShowHide()}>
                                        <Modal.Title>
                                            <div className="sign-in-header">

                                                <h1>Sign in</h1>
                                            </div>

                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={this.handleSubmit} id="login-form" >
                                            <div className="user-inputs">

                                                {/* <Form.Control className="user-input"
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
                                                </div>  */}
                                                <div class="floating-label-group">
                                                    <Form.Control type="text" className='user-inputs' id="username" name="username" onChange={this.handleChange} class="form-control" autocomplete="off" autofocus required />
                                                    <Form.Label class="floating-label">Username</Form.Label>
                                                    <div className="border"></div>
                                                </div>
                                                <div class="floating-label-group">
                                                    <Form.Control type="password" className='user-inputs pwd' id="password" name="password" onChange={this.handleChange} class="form-control" autocomplete="off" required />
                                                    <Form.Label class="floating-label">Password</Form.Label>
                                                    <div className="border"></div>
                                                    <i class="fa fa-eye" onClick={()=>this.showpassword()}></i>
                                                </div>



                                            </div>

                                            <Alert variant="danger" className="faild-user-msg" show={this.state.showAlert}>
                                                Invalid username or password
                                           </Alert>

                                            <div className="login-btn">
                                                <Button type="submit" className="btn btn-login">Login</Button>
                                            </div>

                                            <div className="auth-login">
                                                <span>or Sign in with:</span>
                                                <br />
                                            </div>

                                            <div className="facebook-btns">
                                                <div className="facebook-login">
                                                <button type="button" class="btn btn-white btn-rounded mr-md-3 z-depth-1a"><img src="https://img.icons8.com/color/48/000000/facebook-new.png"/></button>
                                                </div>
                                                <div className="fa-auth">
                                                <Oauth />
                                                </div>
                                                
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