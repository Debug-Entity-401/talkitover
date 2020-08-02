import React from "react";
import { connect } from "react-redux";
import { add, post } from "../../store/signup";
import Oauth from "../Oauth/Oauth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import { CountryDropdown } from "react-country-region-selector";
import "./Register.scss";

var country1 = "Select Country";
function Register(props) {
  function handelChange(event) {
    if (event.target) {
      
      if (event.target.files && event.target.files[0]) {
        //////////////////////////////

        let reader = new FileReader();
        reader.onload = (e) => {
          // this.setState({image: e.target.result});
          props.add({photo: e.target.result});
        };
        reader.readAsDataURL(event.target.files[0]);

        // ////////////////////////////////
        // console.log('///////////////',typeof URL.createObjectURL(event.target.files[0]));
        // props.add({[event.target.name]: URL.createObjectURL(event.target.files[0])});

    }else {
      
      props.add({[event.target.name]: event.target.value});}

    } else {
      country1 = event;
      props.add({
        country: event,
      });
    }
  }
  const handelSubmit = (e) => {
    e.preventDefault();

    props.post(props.signUp);
  };

  /////////////////////////////////////////

  
  return (
    <>
      <Container>
        <div className="signup">
          <Form className="signup-form" onSubmit={handelSubmit}>
            <Row>
              <Col xs={6} sm={6} md={6}>
                <div className="signup-header"> </div>
              </Col>
              <Col xs={6} sm={6} md={6}>
                <div className="signup-form-elements">
                  <h1> Sign Up </h1> <Form.Label> Email </Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    onChange={handelChange}
                    placeholder="email"
                  />
                  <Form.Label> Username </Form.Label>
                  <Form.Control
                    type="text"
                    name="user_name"
                    onChange={handelChange}
                    autoComplete="username"
                    placeholder="username"
                  />
                  <Form.Label> Password </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={handelChange}
                    autoComplete="current-password"
                    placeholder="password"
                  />
                  <Form.Label> Photo </Form.Label>
                  <input type="file" name="photo" onChange={handelChange} id='uploadImage' placeholder="photo" />
                  {/* <Form.Control
                    type="text"
                    name="photo"
                    onChange={handelChange}
                    placeholder="photo"
                  /> */}
                  <Form.Label> Role: </Form.Label>
                  <Form.Control as="select" name="role" onChange={handelChange}>
                    <option> Select Role </option>
                    <option value="ventor"> ventor </option>
                    <option value="Listener"> Listener </option>
                  </Form.Control>
                  <Form.Label>Country</Form.Label>
                  <br />
                  <Form.Group controlId="formBasicEmail">
                    <CountryDropdown
                      name="rcrs-country"
                      defaultOptionLabel={country1}
                      onChange={handelChange}
                    />
                  </Form.Group>
                  <br />
                  <div className="sign-section">
                    <Button
                      type="submit"
                      className="signup-btn"
                      variant="success"
                    >
                      Sign Up
                    </Button>
                    <div className="log-fb"> </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
      {/* <div className="facebook"> */}
        <Oauth />
      {/* </div> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  signUp: state.signUp,
});

const mapDispatchToProps = { add, post };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
