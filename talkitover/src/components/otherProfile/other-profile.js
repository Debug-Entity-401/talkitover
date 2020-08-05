import React, { useEffect, useState, useContext } from "react";
import {
  get,
  fetchOtherProfile,
  adding,
  addNewReview,
} from "../../store/other-profile-srore";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Sidebar from "../Sidebar/Sidebar";
import { Image, Container, Modal, Button, Form } from "react-bootstrap";
import OtherReviews from "./other-reviews";
import { LoginContext } from "../auth/context";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Checkbox } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profille2.scss";
import "../Profile/profile.scss";

const OtherProfile = (props) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const context = useContext(LoginContext);

  let query = useQuery();
  const name = query.get("name");
  
  useEffect(() => {
    props.fetchOtherProfile(name);
  }, []);

  const onChangeHandler = async (event, newValue) => {
    let user;
    if (event.target.name === "reviewer_name") {
      event.target.value
        ? (user = "Anonymous")
        : (user = context.user.user_name);
      console.log("loook ==>", user);

      props.adding({
        reviewer_name: user,
      });
    }
    if (event.target.name === "rating") {
      setValue(newValue);
      props.adding({
        [event.target.name]: parseInt(event.target.value),
      });
    }

    props.adding({
      [event.target.name]: event.target.value,
    });
  };

  const addReview = async (event) => {
    event.preventDefault();
    setShow(false);
    let obj = props.other.review;
    if (props.other.review.reviewer_name === "") {
      let reviewerUser = context.user.user_name;
      obj = {
        reviewer_name: reviewerUser,
        rating: props.other.review.rating,
        review_description: props.other.review.review_description,
      };
    }
    await props.addNewReview(obj, name);
    await props.fetchOtherProfile(name);
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
      <Row>
        <Col xs={6} sm={6} md={1}>
          <Sidebar />
        </Col>
        <Col xs={6} sm={6} md={11}>
          <div className="waves">
            <h2 className="user-name">{props.other.results.username}</h2>
            <div className="img-container">{photoRender()}</div>
            <svg
              id="parent-wave"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 320"
            >
              <path
                fill="#6fc5ba"
                fillOpacity="1"
                d="M0,288L40,293.3C80,299,160,309,240,288C320,267,400,213,480,186.7C560,160,640,160,720,176C800,192,880,224,960,245.3C1040,267,1120,277,1200,261.3C1280,245,1360,203,1400,181.3L1440,160L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
              ></path>
            </svg>
          </div>
          <Container className="profile-container">
            <section className="profile">
              <div className="edit-container">
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
                  <Divider variant="middle" component="li" />
                  <br />
                  <li>
                    <h5>
                      <b>Country</b> : {props.other.results.country}
                    </h5>
                  </li>
                  <Divider variant="middle" component="li" />
                  <br />
                  <li>
                    <h5>
                      <b>Role</b> : {props.other.results.role}
                    </h5>
                  </li>
                  <Divider variant="middle" component="li" />
                  <br />
                  <li>
                    <h5>
                      <b>Status</b> : {props.other.results.status}
                    </h5>
                  </li>
                  <Divider variant="middle" component="li" />
                  <br />
                </ul>
              </div>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form onSubmit={addReview}>
                    <Form.Group controlId="formBasicEmail">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="reviewer_name"
                            value="Anonymous"
                            onChange={onChangeHandler}
                          />
                        }
                        label="Review Anonymously"
                      />

                      <Box
                        component="fieldset"
                        mb={3}
                        borderColor="transparent"
                      >
                        <Typography component="legend">
                          Rate this User
                        </Typography>
                        <Rating
                          value={value}
                          name="rating"
                          onChange={onChangeHandler}
                        />
                      </Box>
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
        </Col>
      </Row>
    </>
  );
};

const mapStateToProps = (state) => ({
  other: state.otherProfile,
});

const mapDispatchToProps = { get, fetchOtherProfile, adding, addNewReview };

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
