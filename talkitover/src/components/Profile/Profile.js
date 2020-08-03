import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  get,
  adding,
  fetchData,
  updateProfile,
} from "../../store/profile-store";
import { Image, Container, Modal, Button, Form, Navbar } from "react-bootstrap";
import { CountryDropdown } from "react-country-region-selector";
import Reviews from "./reviews";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profile.scss";
import {Row,Col} from 'react-bootstrap';
import Sidebar from '../Sidebar/Sidebar';


var country1 = "Select Country";
const Profile = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    props.fetchData();
  }, []);

  const onChangeHandler = async (event) => {
    if (event.target) {
      props.adding({
        [event.target.name]: event.target.value,
      });
    } else {
      country1 = event;
      props.adding({
        country: event,
      });
    }
  };
  const onUpdate = async (event) => {
    event.preventDefault();
    props.updateProfile(props.profile.results.id, props.profile.profile);
    props.fetchData();
    setShow(false);
  };
  const photoRender = () => {
    if (props.profile.results.photo == "") {
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
      <Container className="profile-container">
        <Navbar className="profile-nav">
          <Navbar.Brand>
            <h2>{props.profile.results.username}</h2>
          </Navbar.Brand>
        </Navbar>
        <section className="profile">
          <div className="edit-container">
            <div className="img-container">{photoRender()}</div>
            <div className="edit-btn">
              <Button variant="primary" onClick={handleShow}>
                Edit Profile
              </Button>
            </div>
          </div>
          <div className="profile-data">
            <ul>
              <li>
                <h5>
                  <b>Email</b> : {props.profile.results.email}
                </h5>
              </li>
              <li>
                <h5>
                  <b>Country</b> : {props.profile.results.country}
                </h5>
              </li>
              <li>
                <h5>
                  <b>Role</b> : {props.profile.results.role}
                </h5>
              </li>
              <li>
                <h5>
                  <b>Status</b> : {props.profile.results.status}
                </h5>
              </li>
            </ul>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Your Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={onUpdate}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>user Name</Form.Label>
                  <Form.Control
                    type="userName"
                    name="username"
                    placeholder="Enter username"
                    defaultValue={props.profile.results.username}
                    onChange={onChangeHandler}
                  ></Form.Control>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    defaultValue={props.profile.results.email}
                    onChange={onChangeHandler}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Country</Form.Label>
                  <CountryDropdown
                    name="rcrs-country"
                    defaultOptionLabel={country1}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Photo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="photo"
                    name="photo"
                    defaultValue={props.profile.results.photo}
                    onChange={onChangeHandler}
                  />
                </Form.Group>
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
