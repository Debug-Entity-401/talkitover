import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  get,
  adding,
  fetchData,
  updateProfile,
} from "../../store/profile-store";
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import { Image, Container, Modal, Button, Form, Navbar } from "react-bootstrap";
import { CountryDropdown } from "react-country-region-selector";
import Reviews from "./reviews";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.scss";
import { IconButton, InputAdornment, FormControl, Input, TextField, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Row,Col} from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';



var country1 = "Select Country";

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
    width: '95%',
  },
  input: {
    display: 'none',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width:'98%'
  },
}));
const Profile = (props) => {
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    props.fetchData();
  }, []);

  const onChangeHandler = async (event) => {
    if (event.target) {
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
          props.adding({ photo: e.target.result });
        };
        reader.readAsDataURL(event.target.files[0]);

        // ////////////////////////////////
        // console.log('///////////////',typeof URL.createObjectURL(event.target.files[0]));
        // props.add({[event.target.name]: URL.createObjectURL(event.target.files[0])});

      } else {

        props.adding({
          [event.target.name]: event.target.value,
        });
      }
      
    } else {
      country1 = event;
      props.adding({
        country: event,
      });
    }
  };
  const onUpdate = async (event) => {
    event.preventDefault();
    console.log('profile ===> ',props.profile);
    if(!props.profile.profile.user_name) props.adding({ user_name: props.profile.results.user_name });
    if(!props.profile.profile.email) props.adding({ email: props.profile.results.email });
    if(!props.profile.profile.photo) props.adding({ photo: props.profile.results.photo });
    // let obj= {};
    props.updateProfile(props.profile.results.id, props.profile.profile);
    props.fetchData();
    setShow(false);
  };
  const photoRender = () => {
    if (props.profile.results.photo === "") {
      return (
        <Image
          src="https://www.beaconmanagement.com/wp-content/uploads/2018/04/no-person.jpg"
          className="profile-img"
        />
      );
    } else {
      return (
        <Image src={props.profile.results.photo} className="profile-img" />
      );
    }
  };
  return (
    <>
    <Row>
    <Col xs={6} sm={6} md={1}>
      <Sidebar />
</Col>
<Col xs={6} sm={6} md={11}>
<div className="waves">
<h2 className='user-name'>{props.profile.results.username}</h2>
<div className="img-container">{photoRender()}</div>
    <svg  id="parent-wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
  <path fill="#6fc5ba" fill-opacity="1" d="M0,288L40,293.3C80,299,160,309,240,288C320,267,400,213,480,186.7C560,160,640,160,720,176C800,192,880,224,960,245.3C1040,267,1120,277,1200,261.3C1280,245,1360,203,1400,181.3L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>
</svg>
</div>
      <Container className="profile-container">
        {/* <Navbar className="profile-nav">
          <Navbar.Brand>
           
          </Navbar.Brand>
        </Navbar> */}
        <section className="profile">
         
          <div className="profile-data">
            <ul>
              <li>
                <h5>
                  <b>Email</b> : {props.profile.results.email}
                </h5>
              </li>

              <Divider variant="middle" component="li" />
              <br/>
              <li>
                <h5>
                  <b>Country</b> : {props.profile.results.country}
                </h5>
              </li>
              <Divider variant="middle" component="li" />
              <br/>

              <li>
                <h5>
                  <b>Role</b> : {props.profile.results.role}
                </h5>
              </li>
              <Divider variant="middle" component="li" />
              <br/>

              <li>
                <h5>
                  <b>Status</b> : {props.profile.results.status}
                </h5>
              </li>

            </ul>
          </div>
          <div className="edit-container">
            
            <div className="edit-btn">
              <Button variant="primary" onClick={handleShow}>
                Edit Profile
              </Button>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Your Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={onUpdate}>
                <Form.Group controlId="formBasicEmail">
                  {/* <Form.Label>user Name</Form.Label> */}
                  <TextField className={clsx(classes.margin, classes.textField)}
                    id="standard-textarea"
                    label="Username"
                    value={props.profile.results.username}
                    placeholder="username" name='user_name' onChange={onChangeHandler}
                    multiline
                  />
                  <br/>
                  {/* <Form.Control
                    type="userName"
                    name="username"
                    placeholder="Enter username"
                    defaultValue={props.profile.results.username}
                    onChange={onChangeHandler}
                  ></Form.Control> */}
                  {/* <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    //////for image
                    name="email"
                    placeholder="Enter email"
                    defaultValue={props.profile.results.email}
                    onChange={onChangeHandler}
                  ></Form.Control> */}
                  <TextField className={clsx(classes.margin, classes.textField)}
                    id="standard-textarea"
                    defaultValue={props.profile.results.email}
                    label="Email"
                    placeholder="email" name='email' onChange={onChangeHandler}
                    multiline
                  />
                  <br/>
                 
                  <input
                    accept="image/*"
                    className={`${classes.input} uploadImage`} name="photo"
                    onChange={onChangeHandler}
                    // defaultValue={props.profile.results.photo}
                    
                    multiple
                    type="file"
                  />
                  <label htmlFor="uploadImage" className="profile-label">
                  Profile Picture
                  <br/>
                    <Button variant="contained" style={{ color: '#fff' }} color="primary" component="span">
                      Upload 
        </Button>
                  </label>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Country</Form.Label>
                  <CountryDropdown
                    name="rcrs-country"
                    defaultOptionLabel={country1}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
                {/* <Form.Group>
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="photo"
                    name="photo"
                    defaultValue={props.profile.results.photo}
                    onChange={onChangeHandler}
                  />
                </Form.Group> */}
                <Modal.Footer>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </section>
        <Reviews />
      </Container>
      </Col>
      </Row>
    </>
  );
};
const mapStateToProps = (state) => ({
  profile: state.createSlice,
});
const mapDispatchToProps = { get, adding, fetchData, updateProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
