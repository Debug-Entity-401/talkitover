import React, { useEffect, useContext, useState } from 'react';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { LoginContext } from '../auth/context';
import { getPost, addPost } from '../../store/posts';


import { Form, Button, Container, Col } from 'react-bootstrap';

function Post(props) {
    // const [availability, setAvailability] = useState(new Date());
    const [value, onChange] = useState([new Date(), new Date()]);
    const [description, setDescription] = useState('');
    const [user, setUser] = useState('');
    // const onChange = availability => setAvailability({ availability });
    const context = useContext(LoginContext);
    // useEffect(()=>{
    //     props.getPost();
    // });
    const handelClick = (e) => {
        let user = e.target.user.value;
        setUser(user);
    }
    const changed = (e) => {
        let description = e.target.name.value;
        setDescription(description);
    }
    const handelSubmit = (e) => {
        e.preventDefault();
        let user = e.target.user.value;
        console.log('selector ===> ',e.target.user.value);
        let description = document.getElementById('main').value;
        let obj = { availability: value[1].toString(), description, user_name:user }
        console.log('obj in post ===> ', obj);
        props.addPost(obj);
    }
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
                <Form onSubmit={handelSubmit}>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>User POST</Form.Label>
                        <Form.Check
                            className="user"
                            // onClick={handelClick}
                            value={context.user.user_name}
                            type='radio'
                            name='user'
                            label={context.user.user_name}
                        />
                        <Form.Check
                            className="user"
                            // onClick={handelClick}
                            value='Anonymous'
                            type='radio'
                            name='user'
                            label='Anonymous'
                        />
                        <div>
                            <DateTimeRangePicker
                                onChange={onChange}
                                value={value}
                            />
                        </div>
                        <textarea name="description" rows="3" id="main" onChange={changed} />
                        <Button type="submit">Post</Button>
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
const mapDispatchToProps = { getPost, addPost };

export default connect(mapStateToProps, mapDispatchToProps)(Post);


