import React from 'react';
import { connect } from 'react-redux';
import { add, post } from '../../store/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, InputGroup } from 'react-bootstrap';

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
        <Form noValidate onSubmit={handelSubmit}>
            <Form.Row>
                <Form.Group md="4" controlId="validationCustomUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            name="user_name"
                            onChange={handelChange}
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
                  </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
                <Form.Group md="4" controlId="validationCustom02">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                        required
                        name="email"
                        onChange={handelChange}
                        type="text"
                        placeholder="e-mail"

                    />
                    {/* <Form.Control.Feedback>Looks good!</Form.Control.Feedback> */}
                </Form.Group>
                <Form.Group md="4" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        name="password"
                        onChange={handelChange}
                    />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group md="6">
                    <Form.Label>Country</Form.Label>
                    <Form.Control name="country" onChange={handelChange} type="text" placeholder="Country" required />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid city.
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>Role</Form.Label>
                    <Form.Control as="select" custom name="role" onChange={handelChange}>
                        <option>Select Role</option>
                        <option value="ventor">ventor</option>
                        <option value="Listener">Listener</option>
                    </Form.Control>
                    {/* <div className="mb-3">
                        <Form.File onChange={handelChange} id="formcheck-api-regular">
                            <Form.File.Label>Photo</Form.File.Label>
                            <Form.File.Input />
                        </Form.File>
                    </div> */}
                </Form.Group>

            </Form.Row>
            <Form.Group>
                <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                />
            </Form.Group>
            
            <Button type="submit">Sign Up</Button>
           
        </Form>
    );

}
// isActive={props.signUp.assessment}
const mapStateToProps = state => ({
    signUp: state.signUp
});

const mapDispatchToProps = { add, post };

export default connect(mapStateToProps, mapDispatchToProps)(Register);