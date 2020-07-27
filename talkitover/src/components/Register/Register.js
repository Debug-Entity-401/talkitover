import React from 'react';
import { connect } from 'react-redux';
import { add, post  } from '../../store/signup';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container, Col } from 'react-bootstrap';
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
                    <div className="signup-header">

                    </div>
                    <div className="signup-form-elements">
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="email" onChange={handelChange} placeholder="email" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="user_name" onChange={handelChange} autoComplete="username" placeholder="username" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={handelChange} autoComplete="current-password" placeholder="password" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formRole">
                                <Form.Label>Role:</Form.Label>
                                <Form.Control as="select" name="role" onChange={handelChange}>
                                    <option>Select Role</option>
                                    <option value="ventor">ventor</option>
                                    <option value="Listener">Listener</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>

                        <div className="sign-section">
                            <Button  type="submit" className="signup-btn" variant="success">Sign Up</Button>
                        </div>

                    </div>
                </Form>

            </div>
        </Container>
        
      </>
    )
}

const mapStateToProps = state => ({
    signUp: state.signUp
});

const mapDispatchToProps = { add, post  };

export default connect(mapStateToProps, mapDispatchToProps)(Register);