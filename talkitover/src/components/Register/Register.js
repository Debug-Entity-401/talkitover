import React, { useState } from "react";
import { connect } from "react-redux";
import { add, post } from "../../store/signup";
import Oauth from "../Oauth/Oauth";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Link, Redirect } from 'react-router-dom';
import { Form, Container, Col, Row, Card } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import { CountryDropdown } from "react-country-region-selector";
import "./Register.scss";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import { IconButton, InputAdornment, FormControl, Input, TextField, MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';

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
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width:'100%'
  },
}));


var country1 = "Select Country";
function Register(props) {
  const classes = useStyles();
  const [redirict, setRedircit] = useState('');
  const [Role, setRole] = useState('');
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function handelChange(event) {
   
    if (event.target) {
      if (event.target.name === 'role') {
        setRole(event.target.value);
      }
      if (event.target.name === 'password') {
        setValues({ ...values, password: event.target.value });
      }




      if (event.target.files && event.target.files[0]) {
        //////////////////////////////
        let image = document.getElementById('uploadImage');
        // Check if any file is selected. 
        if (image.files.length > 0) {
          for (let i = 0; i <= image.files.length - 1; i++) {

            const fsize = image.files.item(i).size;
            const file = Math.round((fsize / 1024));
            // The size of the file. 
            if (file >= 100) {
              alert(
                "File must be lest 100 kb");
            }
          }
        }
        let reader = new FileReader();
        reader.onload = (e) => {
          // this.setState({image: e.target.result});
          props.add({ photo: e.target.result });
        };
        reader.readAsDataURL(event.target.files[0]);

        // ////////////////////////////////
        // console.log('///////////////',typeof URL.createObjectURL(event.target.files[0]));
        // props.add({[event.target.name]: URL.createObjectURL(event.target.files[0])});

      } else {

        props.add({ [event.target.name]: event.target.value });
      }

    } else {
      country1 = event;
      props.add({
        country: event,
      });
    }
  }
  const handelSubmit = async (e) => {
    e.preventDefault();

    console.log(props.signup);
    await props.post(props.signUp);
    console.log('asdasdasdasdasdsad', props.signUp.loggedIn);
    if (props.signUp.loggedIn) {

      setRedircit('/assess');
    }

  };

  /////////////////////////////////////////

  if (redirict) {
    return <Redirect to={redirict} />
  }
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

                  <TextField className={clsx(classes.margin, classes.textField)}
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
                  <input
                    accept="image/*"
                    className={classes.input} name="photo"
                    onChange={handelChange}
                    id='uploadImage'
                    multiple
                    type="file"
                  />
                  <label htmlFor="uploadImage" id="profile-label">
                  Profile Picture
                  <br/>
                    <Button variant="contained" style={{ color: '#fff' }} color="primary" component="span">
                      Upload 
        </Button>
                  </label>
                  <br />
                  <FormControl className={classes.formControl}>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select className={clsx(classes.margin, classes.textField)}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Role}
                    name="role"
                    defaultValue={'choose asadasd'}
                    onChange={handelChange}
                  >
                    <MenuItem value={'ventor'}>ventor</MenuItem>
                    <MenuItem value={'Listener'}>Listener</MenuItem>
                  </Select>
                  </FormControl>
                  <br />
                  <Form.Label>Country</Form.Label>
                  <br />
                  <Form.Group controlId="formBasicEmail">
                    <CountryDropdown className='form-control'
                      name="rcrs-country"
                      defaultOptionLabel={country1}
                      onChange={handelChange}
                    />
                  </Form.Group>
                  <br />
                  <div className="sign-section">
                    <Button
                      type="submit"
                      className="btn-primary"
                      variant="success" style={{backgroundColor:'#0062cc'}}
                    >
                      Sign Up
                    </Button>
                    <div className="log-fb">
                      <span>or Continue with:</span>
              
                      <br />
                       <div className="facebook-btn">
                       <Oauth />
<img src="https://img.icons8.com/color/48/000000/facebook-new.png"/>
                                            </div>
                       </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
  
    </>
  );
}

const mapStateToProps = (state) => ({
  signUp: state.signUp,
});

const mapDispatchToProps = { add, post };

export default connect(mapStateToProps, mapDispatchToProps)(Register);
