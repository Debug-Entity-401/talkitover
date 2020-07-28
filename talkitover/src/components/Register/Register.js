import React from 'react';
import { connect } from 'react-redux';
import { add, post } from '../../store/signup';
import Oauth from '../Oauth/Oauth';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col,Row } from 'react-bootstrap';
import './Register.scss';

function Register(props) {

    function handelChange(e) {
        props.add({ [e.target.name]: e.target.value })
    }
    const handelSubmit = (e) => {
        e.preventDefault();

        props.post(props.signUp);
    }

    /////////////////////////////////////////

    return (
        <>
        <Container>
            <div className="signup">
            

                <Form className="signup-form" onSubmit={handelSubmit}>
                <Row>
            <Col xs={6} sm={6} md={6}>
                    <div className="signup-header">

                    </div>
                    </Col>
                    <Col xs={6} sm={6} md={6}>

                    <div className="signup-form-elements">
                    <h1>Sign Up</h1>

                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" onChange={handelChange} placeholder="email" />
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="user_name" onChange={handelChange} autoComplete="username" placeholder="username" />
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={handelChange} autoComplete="current-password" placeholder="password" />
                                <Form.Label>Role:</Form.Label>
                                <Form.Control as="select" name="role" onChange={handelChange}>
                                    <option>Select Role</option>
                                    <option value="ventor">ventor</option>
                                    <option value="Listener">Listener</option>
                                </Form.Control>

                        <div className="sign-section">
                            <Button  type="submit" className="signup-btn" variant="success">Sign Up</Button>
                           
                            <div className="log-fb">
                <p>Or:</p>
        <Oauth />

            </div>
                        </div>
                        
                    </div>
                </Col>
                </Row>
                </Form>
            </div>
            
        </Container>
        
      </>
    )
}

const mapStateToProps = state => ({
    signUp: state.signUp
});

const mapDispatchToProps = { add, post };

export default connect(mapStateToProps, mapDispatchToProps)(Register);