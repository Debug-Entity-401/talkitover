import React, { useEffect, useState } from 'react';
import {get, fetchOtherProfile, adding, addNewReview } from '../../store/other-profile-srore';
import { connect } from 'react-redux'
import { Image, Container, Modal, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import OtherReviews from './other-reviews'
import './profile.scss';

const OtherProfile = props => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        props.fetchOtherProfile();
    }, []);

    const onChangeHandler = async event => {
        console.log(event.target.value);
        props.adding({
            [event.target.name]: event.target.value
        })
    }
    const addReview = async event => {
        event.preventDefault();
        props.addNewReview(props.other.review);
        props.fetchOtherProfile()
        setShow(false);
    }
    return (
<>
    <Container className="img-container">
        <Image src={ props.other.results.photo} className="profile-img" roundedCircle />
        <section className="profile">
	        {console.log(props.other.results.id)}
            <ul>
                <li>
                    <h3> {props.other.results.username}</h3>
                </li>
                <li>
                    <h4>Email : {props.other.results.email}</h4>
                </li>
                <li>Country: {props.other.results.country}</li>
            </ul>
        </section>
        <Button variant="primary" onClick={handleShow}>
      Add Review
      </Button>
	        <Modal show={show} onHide={handleClose}>
		  <Modal.Header closeButton>
		      <Modal.Title>Edit Your Profile</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
		      <Form onSubmit={addReview}>
			<Form.Group controlId="formBasicEmail">
			    <Form.Label>reviewer_name</Form.Label>
			    <Form.Control type="userName" name="reviewer_name" placeholder="reviewer_name" onChange={onChangeHandler}>
			    </Form.Control>
			    <Form.Label>Rate this User</Form.Label>
			    <Form.Control size="sm" as="select" name="rating" onChange={onChangeHandler}>
    				    <option>1 star</option>
				    <option>2 star</option>
				    <option>3 star</option>
				    <option>4 star</option>
				    <option>5 star</option>
			    </Form.Control>
			</Form.Group>
			<Form.Group controlId="formBasicPassword">
			    <Form.Label>Add Discription</Form.Label>
			    <Form.Control as="textarea" rows="4"  placeholder="review_description" name="review_description" onChange={onChangeHandler}/>
			</Form.Group>
			<Modal.Footer>
			    <Button variant="primary" type="submit">Save Changes</Button>
			    <Button variant="secondary" onClick={handleClose}>Close</Button>
			</Modal.Footer>
		      </Form>
		  </Modal.Body>
	        </Modal>
        <OtherReviews />
    </Container>
</>
    )
}

const mapStateToProps = state => ({
    other: state.otherProfile
});

const mapDispatchToProps = {get, fetchOtherProfile, adding, addNewReview };

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile)