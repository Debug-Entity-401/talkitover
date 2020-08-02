import React from "react";
import { connect } from "react-redux";
import { add, post } from "../../store/signup";
import Oauth from "../Oauth/Oauth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Container, Col, Row, Card } from "react-bootstrap";
import { CountryDropdown } from "react-country-region-selector";
import "./Register.scss";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, InputAdornment, FormControl, Input, InputLabel, TextField } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { sign } from "jsonwebtoken";


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '100%',
  },
}));


var country1 = "Select Country";
function Register(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  // const handelChanges= (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function handelChange(event) {
  if(event.target.type==='password')
    {
       setValues({ ...values, password:event.target.value });

    }
    
    

    if (event.target) {
      props.add({
        [event.target.name]: event.target.value,
      });
    } else {
      country1 = event;
      props.add({
        country: event,
      });
    }
  }
  const handelSubmit = (e) => {
    e.preventDefault();
console.log(props.signup);
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
                  <h1> Sign Up </h1>

                  <TextField  className={clsx(classes.margin, classes.textField)}
                    id="standard-textarea"
                    label="Email"
                    placeholder="email" name='email' onChange={handelChange}
                    multiline
                  />
                  <br />
                  <TextField className={clsx(classes.margin, classes.textField)}
                    id="standard-textarea"
                    label="Username"
                    placeholder="username" name='user_name' onChange={handelChange}
                    multiline
                  />

<FormControl className={clsx(classes.margin, classes.textField)}>
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handelChange} name='password'
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
                  <br />
                  <Form.Label> Photo </Form.Label>
                  <Form.Control
                    type="text"
                    name="photo"
                    onChange={handelChange}
                    placeholder="photo"
                  />
                  <Form.Label> Role: </Form.Label>
                  <Form.Control as="select" name="role" onChange={handelChange}>
                    <option> Select Role </option>
                    <option value="ventor"> ventor </option>
                    <option value="Listener"> Listener </option>
                  </Form.Control>

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
      {/* <div className="facebook">
        <Oauth />
      </div> */}
    </>
  );
}

const mapStateToProps = (state) => ({
  signUp: state.signUp,
});

const mapDispatchToProps = { add, post };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
