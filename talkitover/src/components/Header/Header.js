import React from 'react';
import { connect } from 'react-redux';
import { Container, Form, Nav, Navbar, Button, Modal } from 'react-bootstrap';
import './header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/logo.png';
import { LoginContext } from '../auth/context';
import Show from '../auth/show';


class Header extends React.Component {

    static contextType = LoginContext;

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showHide: false,

        };

    }

    handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }
    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = e => {
        e.preventDefault();
        this.context.login(this.state.username, this.state.password);
    }



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

                                <Show condition={this.context.loggedIn || this.props.signUp.loggedIn}>
                                    <Button variant="primary" onClick={this.context.logout}>Logout</Button>
                                </Show>
                                <Show condition={!this.context.loggedIn && this.props.signUp.loggedIn===''}>
                                    <Button variant="success" onClick={() => this.handleModalShowHide()}>
                                        Sign in
                </Button>
                                    <li> <Nav.Link href="/signup">Sign up</Nav.Link></li>
                                </Show>
                                <Modal show={this.state.showHide}>
                                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                                        <Modal.Title>Sign in</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form onSubmit={this.handleSubmit} >
                                            <div className="signin-logo">
                                                <Navbar.Brand ><img src={logo} alt="logo" /></Navbar.Brand>
                                            </div>
                                            <Form.Control
                                                placeholder="userName"
                                                name="username"
                                                onChange={this.handleChange}
                                            />
                                            <Form.Control
                                                placeholder="password"
                                                name="password"
                                                onChange={this.handleChange}
                                            />
                                            <div className="login-btn">
                                                <Button type="submit" onClick={() => this.handleModalShowHide()}>Login</Button>
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