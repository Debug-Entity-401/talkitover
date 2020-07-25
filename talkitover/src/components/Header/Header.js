import React, { useEffect } from 'react';
import { Container,Form, Nav, Navbar, Button, Modal } from 'react-bootstrap';
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
            showHide : false,

        };
       
    }
   
          handleModalShowHide() {
        this.setState({ showHide: !this.state.showHide })
    }
    handleChange = e => {
        this.setState({ [e.target.name] : e.target.value});
    }

    handleSubmit = e => {
        e.preventDefault();
        this.context.login(this.state.username, this.state.password);
    }
    
    render()
    {
    return (
        <header>

            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand ><img className="logo" src={logo} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-end main-div" style={{ width: "50%" }} >
                            <li><Nav.Link className="scroll" href="#home">Home</Nav.Link></li>
                            <li><Nav.Link  className="scroll" href="#misson">Misson</Nav.Link></li>
                            <li><Nav.Link  className="scroll" href="#services">Services</Nav.Link></li>
                            <li><Nav.Link  className="scroll" href="#overcome">Overcome</Nav.Link></li>
                            <li> <Nav.Link  className="scroll" href="#testominals">testmonials</Nav.Link></li>
                            {/* <NavLink to="/chat" activeClassName="here">chat</NavLink> */}
                        </Nav>
                        <Nav className="justify-content-end  " style={{ width: "50%" }}>
                    
                <Show condition={this.context.loggedIn}>
                    <Button variant="primary" onClick={this.context.logout}>Logout</Button>
                </Show>
                <Show condition={!this.context.loggedIn}>
                <Button variant="success" onClick={() => this.handleModalShowHide()}>
                    Sign in 
                </Button>
                </Show>
                <Modal show={this.state.showHide}>
        
                    <Modal.Header closeButton onClick={() => this.handleModalShowHide()}>
                    <Modal.Title>Sign in</Modal.Title>
                    </Modal.Header                >
                    <Modal.Body>
                    <Form onSubmit={this.handleSubmit} >
                        <div className="signin-logo">
                        <Navbar.Brand ><img  src={logo} /></Navbar.Brand>

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
        

                            <li> <Nav.Link href="#">Sign up</Nav.Link></li>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
    }
};

export default Header;