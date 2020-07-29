import React, { useEffect, useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { LoginContext } from '../auth/context';
import { getPost, addPost, deletepost, updatepost } from '../../store/posts';
import { Form, Button, Card, Accordion, Container } from 'react-bootstrap';
import './posts.scss';
import DateAndTimePickers from './datetime-picker.js'
import { Checkbox } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
function Post(props) {

    const [value, onChange] = useState([new Date(), new Date()]);
    const context = useContext(LoginContext);
    useEffect(() => {
        props.getPost();
    }, []);
    const deletes = async (id) => {
        await props.deletepost(id);
        await props.getPost();

    }
    //for posting posts
    const handelSubmit = (e) => {
        e.preventDefault();
        let user = e.target.user.checked || context.user.user_name;
        console.log('post user>>>>>>>', user);
        console.log('selector ===> ', e.target.user.value);
        let description = document.getElementById('main').value;
        let obj = { availability: value[1].toString(), description, view_as: user, user_name: context.user.user_name }
        console.log('obj in post ===> ', obj);
        props.addPost(obj);
        props.getPost();
    }

    //for post update
    const handelSubmited = async (e) => {
        e.preventDefault();
        let user;
        e.target.user.checked ? user = 'Anonymous' : user = context.user.user_name;
        // let user = e.target.user.checked || context.user.user_name;/
        console.log('selector ===> ', e.target.user.checked);
        let description = document.getElementById('mains').value;
        let id = e.target.id.value;
        let availableTime = document.getElementById("datetime-local").value;
        console.log('availableTime>>>>>>>>>', availableTime);
        let obj = { availability: availableTime, description, view_as: user, user_name: context.user.user_name }
        console.log('obj in post ===> ', obj);
        await props.updatepost(obj, id);
        await props.getPost();
    }

    function show(user, id, description) {

        if (user === context.user.user_name) {
            return <div>
                <div onClick={() => deletes(id)}>Delete</div>
                <Accordion>
                    <Card>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Update
                                </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form id={id} onSubmit={handelSubmited}>
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>User POST</Form.Label>
                                        {  /*  <Form.Check
                                            className="user"
                                            // onClick={handelClick}
                                            value={context.user.user_name}
                                            type='radio'
                                            name='user'
                                            label={context.user.user_name}
                                    />*/}
             {                        /*   <Checkbox
                                            className="user"
                                            value="checkedA"
                                            inputProps={{ 'title': 'Post Anonymously' }}
                                            name='user'

                                            label='Post Anonymously'
             />*/}
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={<Checkbox name="user" />}
                                                label="Post Anonymously"
                                            />
                                        </FormGroup>
                                        {/*<Form.Check
                                            className="user"
                                            // onClick={handelClick}
                                            checked='Anonymous'
                                            type='checkbox'
                                            defaultChecked={false}
                                            name='user'
                                            label='Post Anonymously'
                                        />*/}
                                        <div>
                                            <input type='hidden' value={id} name='id' />

                                        </div>
                                        <DateAndTimePickers />
                                        <textarea name="description" rows="3" id="mains" defaultValue={description} />
                                        <Button type="submit">Save Change</Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        }

    }
    function renderChatLink(user) {
        if (context.user.role === 'Listener' || context.user.user_name === user) {
            return <Link onClick={e => (!context.user.user_name) ? e.preventDefault() : null} to={`/chat?name=${context.user.user_name}&room=chat`}>chat</Link>
        }
    }
    function renderPost() {
        return props.posts.posts.map((val, i) => {
            console.log(props.posts.posts);
            return <div className="user-post" key={i}>
                <h1>{val.view_as}</h1>
                <p>{val.description}</p>
                <p>{val.availability}</p>
                <span>{val.date}</span>

                {/* to={`/chat?name=${name}&room=${room}`} */}


                {show(val.user_name, val._id, val.description)}
                <div>
                    {renderChatLink(val.user_name)}
                </div>
            </div>
        })
    }
    return (
        <>
            <div>
                <Container>
                    <Form onSubmit={handelSubmit}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="user-post-title">User POST</Form.Label>
                            {         /*   <Form.Check
                            className="user"
                            // onClick={handelClick}
                            value={context.user.user_name}
                            type='radio'
                            name='user'
                            label={context.user.user_name}
            /> */}
                            <Form.Check
                                className="user"
                                // onClick={handelClick}
                                value='Anonymous'
                                type='checkbox'
                                name='user'
                                label='Anonymous'
                            />
                            <div>
                                <DateAndTimePickers />

                            </div>
                            <Form.Control as="textarea" rows="3" id="main" />
                            <Button type="submit">Post</Button>
                        </Form.Group>
                    </Form>
                </Container>
            </div>
            <div className="user-posts">
                {renderPost()}
            </div>

        </>
    )
}
const mapStateToProps = state => ({
    posts: state.posts,
    fullRoom: state.chatSlice
});
const mapDispatchToProps = { getPost, addPost, deletepost, updatepost };
export default connect(mapStateToProps, mapDispatchToProps)(Post);