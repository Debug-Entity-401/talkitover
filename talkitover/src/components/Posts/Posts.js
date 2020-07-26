import React,{useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import {getPost} from '../../store/posts';
import Date from '../date';
import { Form, Button, Container, Col } from 'react-bootstrap';

function Post(props) {
    useEffect(()=>{
        props.getPost();
    });
    function renderPost() {
        return props.posts.posts.map((val, i) => {
            return <div key={i}>
                <p>{val.description}</p>
            </div>
        })
    }
    return (
        <>
            <div>
                <Form>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>User POST</Form.Label>
                        <Form.Check
                            type='radio'
                            name='user'
                            label='By User'
                        />
                        <Form.Check
                            type='radio'
                            name='user'
                            label='Anonymous'
                        />
                        <Date/>
                        <Form.Control as="textarea" rows="3" />
                        <Button>Post</Button>
                    </Form.Group>
                </Form>
            </div>
            <div>
                {renderPost()}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    posts: state.posts
});
const mapDispatchToProps = {getPost};

export default connect(mapStateToProps,mapDispatchToProps)(Post);


