import React, { useEffect, useState, useContext } from "react";
import {
  get,
  fetchOtherProfile,
  adding,
  addNewReview,
} from "../../store/other-profile-srore";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Image, Container, Modal, Button, Form, Navbar } from "react-bootstrap";
import OtherReviews from "./other-reviews";
import { LoginContext } from "../auth/context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profille2.scss";

const OtherProfile = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const context = useContext(LoginContext);

  let query = useQuery(show);
  const name = query.get("name");

  useEffect(() => {
    props.fetchOtherProfile(name);
  }, show);

  const onChangeHandler = async (event) => {
    props.adding({
      [event.target.name]: event.target.value,
    });
  };

  const addReview = async (event) => {
    event.preventDefault();
    setShow(false);
     props.addNewReview(props.other.review, name);
     props.fetchOtherProfile(name);
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const photoRender = () => {
    if (props.other.results.photo === "") {
      return (
        <Image
          src="https://www.beaconmanagement.com/wp-content/uploads/2018/04/no-person.jpg"
          className="profile-img"
        />
      );
    } else {
      return <Image src={props.other.results.photo} className="profile-img" />;
    }
  };
  return (
    <>
      <Container className="profile-2">
        <Navbar className="profile-nav">
          <Navbar.Brand>
            <h2>{props.other.results.username}</h2>
          </Navbar.Brand>
        </Navbar>
        <section className="profile">
          <div className="edit-container">
            <div className="img-container">{photoRender()}</div>
            <div className="edit-btn">
              <Button variant="primary" onClick={handleShow}>
                Add Review
              </Button>
            </div>
          </div>
          <div className="profile-data">
            <ul>
              <li>
                <h5>
                  <b>Email</b> : {props.other.results.email}
                </h5>
              </li>
              <li>
                <h5>
                  <b>Country</b> : {props.other.results.country}
                </h5>
              </li>
              <li>
                <h5>
                  <b>Role</b> : {props.other.results.role}
                </h5>
              </li>
              <li>
                <h5>
                  <b>Status</b> : {props.other.results.status}
                </h5>
              </li>
            </ul>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={addReview}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>reviewer name</Form.Label>
                  <Form.Check
                    className="user"
                    // onClick={handelClick}
                    value={context.user.user_name}
                    type="radio"
                    name="reviewer_name"
                    label={context.user.user_name}
                    onChange={onChangeHandler}
                  />
                  <Form.Check
                    className="user"
                    // onClick={handelClick}
                    value="Anonymous"
                    type="radio"
                    name="reviewer_name"
                    label="Anonymous"
                    onChange={onChangeHandler}
                  />
                  <Form.Label>Rate this User</Form.Label>
                  <Form.Control
                    size="sm"
                    as="select"
                    name="rating"
                    onChange={onChangeHandler}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Add Discription</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="4"
                    placeholder="review_description"
                    name="review_description"
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
        <OtherReviews />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  other: state.otherProfile,
});

const mapDispatchToProps = { get, fetchOtherProfile, adding, addNewReview };

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
