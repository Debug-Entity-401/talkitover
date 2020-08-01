import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {get, adding, fetchData, updateProfile } from '../../store/profile-store';
import { Image, Container, Modal, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Reviews from './reviews'
import './profile.scss';


const Profile = props => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
       console.log( props.fetchData())
    }, []);

    const onChangeHandler = async event => {
        props.adding({
	  [event.target.name]: event.target.value
	})
    }
    const onUpdate = async event => {
        event.preventDefault();
        props.updateProfile(props.profile.results.id, props.profile.profile);
        props.fetchData()
        setShow(false);
    }
    return (
<>
    <Container className="img-container">
        <Image src={ props.profile.results.photo} className="profile-img" />
        <section className="profile">
            <ul>
                <li>
                    <h3> {props.profile.results.username}</h3>
                </li>
                <li>
                    <h4>Email : {props.profile.results.email}</h4>
                </li>
                <li>Country: {props.profile.results.country}</li>
            </ul>
            <Button variant="primary" onClick={handleShow}>
    	  Edit Profile
      	  </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Your Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={onUpdate}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>user Name</Form.Label>
                            <Form.Control type="userName" name="username" placeholder="Enter username" defaultValue={props.profile.results.username} onChange={onChangeHandler}>
                            </Form.Control>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="Enter email" defaultValue={props.profile.results.email} onChange={onChangeHandler}>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" placeholder="country" name="country" defaultValue={props.profile.results.country} onChange={onChangeHandler}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Photo</Form.Label>
                            <Form.Control type="text" placeholder="photo" name="photo" defaultValue={props.profile.results.photo} onChange={onChangeHandler}/>
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="primary" type="submit">Save Changes</Button>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </section>
        <Reviews />
    </Container>
    </>
    )
}
const mapStateToProps = state => ({
    profile: state.createSlice
});
const mapDispatchToProps = {get, adding, fetchData, updateProfile };

export default connect(mapStateToProps, mapDispatchToProps)(Profile);