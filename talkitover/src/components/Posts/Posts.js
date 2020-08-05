
import React, { useEffect, useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { LoginContext } from '../auth/context';
import { getPost, addPost, deletepost, updatepost } from '../../store/posts';
import { Form, Button, Row, Col, Card, Accordion, Container, Toast } from 'react-bootstrap';
import './posts.scss';
import Sidebar from '../Sidebar/Sidebar';
import DateTimePicker from 'react-datetime-picker';
import { Checkbox } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import { toggleLoader } from '../../store/loader';
import Show from '../auth/show';
import Loader from 'react-loader-spinner';

function Post(props) {
    const [toggle, setToggle] = useState('All');
    const [value, onChange] = useState(new Date());

    const context = useContext(LoginContext);
    useEffect(() => {
        props.getPost();
    },[]);
    const deletes = async (id) => {
        toggleLoader();

        await props.deletepost(id);
        await props.getPost();
        // toggleLoader();
    }


    //for posting posts
    const handelSubmit = async e => {
        e.preventDefault();
        toggleLoader();
        let user;
        e.target.user.checked ? user = 'Anonymous' : user = context.user.user_name;
        let description = document.getElementById('mains').value;
        let date = value;
        let day = date.getDate()
        let hours = date.getHours()
        let years = date.getFullYear()
        let month = date.getMonth() + 1;
        let obj = { availability: `${years}/${month}/${day}-${hours}`, description, view_as: user, user_name: context.user.user_name };
        document.getElementById('post-form-main').reset();
        await props.addPost(obj);
        await props.getPost();

        toggleLoader();
    }

    //for post update
    const handelSubmited = async (e) => {
        e.preventDefault();
        toggleLoader();
        let user;
        e.target.user.checked ? user = 'Anonymous' : user = context.user.user_name;
        let description = e.target.description.value;
        let id = e.target.id.value;
        let date = value;
        let day = date.getDate()
        let hours = date.getHours()
        let years = date.getFullYear()
        let month = date.getMonth() + 1;
        let obj = { availability: `${years}/${month}/${day}-${hours}`, description, view_as: user, user_name: context.user.user_name };
        await props.updatepost(obj, id);
        await props.getPost();
        toggleLoader();
    }
    const updateSolved = async (e) => {
        e.preventDefault();
        toggleLoader();
        let user;
        e.target.solved.value ? user = true : user = false;
        let id = e.target.id.value;
        
        let obj = { solved:user};
        await props.updatepost(obj, id);
        await props.getPost();
        toggleLoader();
    }

    function renderForm() {
        if (context.user.role === 'ventor') {
            return <div>
                <div id='post-form'>
                    <Container>

                        <Form id='post-form-main' onSubmit={handelSubmit}>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <div className="Messge-title">
                                    <Form.Label className="user-post-title">Talk Free</Form.Label>
                                </div>
                                <div class="md-form amber-textarea active-amber-textarea-2">
                                    <i class="fas fa-pencil-alt prefix"></i>
                                    <textarea id="form24" class="md-textarea form-control" rows="3"></textarea>
                                    <label for="form24">Material textarea with an always colorful prefix</label>
                                </div>
                                <textarea name="description" rows="3" id="mains" placeholder="Talk Free" className="form-control textarea-post" />
                                <FormGroup row>
                                    <div id='form-footer'>
                                        <FormControlLabel
                                            control={<Checkbox name="user" />}
                                            label="Post Anonymously"
                                        />
                                        <span>I am avaliable until</span>
                                        <DateTimePicker
                                            onChange={onChange}
                                            value={value}
                                        />
                                    </div>
                                    <div className="Post-button">
                                        <Button id="post-btn" type="submit">Post</Button>
                                    </div>
                                </FormGroup>

                            </Form.Group>
                        </Form>
                    </Container>
                </div>
            </div>

        }
    }


    function show(user, id, description) {

        if (user === context.user.user_name) {

            return <div>
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
                                        <input hidden={true} id="id" value={id} />
                                        <textarea name="description" rows="3" id="mains" placeholder="Talk Free" defaultValue={description} className="form-control textarea-post" />
                                        <FormGroup row>
                                            <div id='form-footer'>
                                                <FormControlLabel
                                                    control={<Checkbox name="user" />}
                                                    label="Post Anonymously"
                                                />
                                                <span>I am avaliable until</span>
                                                <DateTimePicker
                                                    onChange={onChange}
                                                    value={value}
                                                />
                                            </div>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                <Button data-toggle="collapse" type="submit">Save Change</Button>
                                            </Accordion.Toggle>
                                        </FormGroup>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        }
    }

    function renderChatLink(solved,user, id, availability) {
        let date = new Date();
        let day = date.getDate();
        let hours = date.getHours();
        let years = date.getFullYear();
        let month = date.getMonth() + 1;
        let timeSplit = availability.split('-')[0].split('/');
        timeSplit.push(availability.split('-')[1]);
        if(!solved)
    {if ((timeSplit[0] >= years && timeSplit[1] >= month && timeSplit[2] > day)) {
        if (context.user.role === 'Listener' || context.user.user_name === user) {
            return <div class="chat-btn"><Link onClick={e => (!context.user.user_name) ? e.preventDefault() : null} to={`/chat?name=${context.user.user_name}&room=${id}`}>chat</Link></div>
        }
    } else if (timeSplit[2] === day && timeSplit[3] >= hours)
        if (context.user.role === 'Listener' || context.user.user_name === user) {
            return <div class="chat-btn"><Link onClick={e => (!context.user.user_name) ? e.preventDefault() : null} to={`/chat?name=${context.user.user_name}&room=${id}`}>chat</Link></div>
        }}
    }
    function renderUserName(user) {
        if (user === "Anonymous") {
            return <h1>{user}</h1>;
        } else {
            return <Link to={`/otherProfile?name=${user}`}>{user}</Link>;
        }
    }
    function solveProblemForm(val) {
        if (context.user.user_name === val.user_name) {
            return <form onSubmit={updateSolved} >
                <input hidden={true} id="id" value={val._id}  />
                <FormControlLabel
                    control={<Checkbox type='submit' value={true} name="solved" />}
                    label="solved"
                />
            </form>
        }

    }
    let solve = "true"
    function renderPost() {
        let date = new Date();
        let day = date.getDate();
        let hours = date.getHours();
        let years = date.getFullYear();
        let month = date.getMonth() + 1;
        let array = props.posts.posts.slice().reverse();
        if (toggle === 'All') {
            return array.map((val, i) => {
                return <Toast key={i} className="post-box">
                    <Toast.Header closeButton={false}>


                        <div className="username-time">
                            <h1 className='head-post'>{renderUserName(val.view_as)}</h1>
                            <small>{val.date}</small>
                        </div>
                        {solveProblemForm(val)}
                        <div className='delete-btn'>
                            <Show condition={val.user_name === context.user.user_name}>
                                <Button variant="danger" id="delete-btn" onClick={() => deletes(val._id)}><i class="fa fa-trash" aria-hidden="true"></i></Button>
                            </Show>
                        </div>
                    </Toast.Header>

                    <Toast.Body>
                    {val.solved ? solve= "true" : solve="false"}         
                           <p >Solved: {solve} </p>

                        <p className='description'>{val.description}</p>
                        {show(val.user_name, val._id, val.description)}
                        <div>
                            {renderChatLink(val.solved,val.user_name, val._id, val.availability)}
                        </div>
                        <div className="time">
                        </div>
                    </Toast.Body>
                </Toast>
            })
        }
        else {
            return array.map((val, i) => {
                let timeSplit = val.availability.split('-')[0].split('/');
                timeSplit.push(val.availability.split('-')[1])
                if (timeSplit[0] >= years && timeSplit[1] >= month && timeSplit[2] > day) {
                    return <Toast key={i} className="post-box">
                        <Toast.Header closeButton={false}>

                            <div className="username-time">
                                <h1 className='head-post'>{renderUserName(val.view_as)}</h1>
                                <small>{val.date}</small>
                            </div>
                            {solveProblemForm(val)}
                            <div className='delete-btn'>
                                <Show condition={val.user_name === context.user.user_name}>
                                    <Button variant="danger" id="delete-btn" onClick={() => deletes(val._id)}><i class="fa fa-trash" aria-hidden="true"></i></Button>
                                </Show>
                            </div>
                        </Toast.Header>

                        <Toast.Body>
                            <p className='description'>{val.description}</p>
                            {val.solved ? solve= "true" : solve="false"}         
                           <p >Solved: {solve} </p>
                            {show(val.user_name, val._id, val.description)}
                            <div>
                            {renderChatLink(val.solved,val.user_name, val._id, val.availability)}

                            </div>
                            <div className="time">
                            </div>
                        </Toast.Body>
                    </Toast>
                } else if (timeSplit[2] === day && timeSplit[3] >= hours) {
                    return <Toast key={i} className="post-box">
                        <Toast.Header closeButton={false}>

                            <div className="username-time">
                                <h1 className='head-post'>{renderUserName(val.view_as)}</h1>
                                <small>{val.date}</small>
                            </div>
                            {solveProblemForm(val)}
                            <div className='delete-btn'>
                                <Show condition={val.user_name === context.user.user_name}>
                                    <Button variant="danger" id="delete-btn" onClick={() => deletes(val._id)}><i class="fa fa-trash" aria-hidden="true"></i></Button>
                                </Show>
                            </div>
                        </Toast.Header>

                        <Toast.Body>
                        {val.solved ? solve= "true" : solve="false"}         
                           <p >Solved: {solve} </p>

                            <p className='description'>{val.description}</p>
                            {show(val.user_name, val._id, val.description)}
                            <div>
                            {renderChatLink(val.solved,val.user_name, val._id, val.availability)}

                            </div>
                            <div className="time">
                            </div>
                        </Toast.Body>
                    </Toast>
                }
            })
        }
    }


    return (
        <>
            <Row>
                <Col xs={6} sm={6} md={1}>

                    <Sidebar />
                </Col>
                <Col xs={6} sm={6} md={11}>

                    <div id='contain'>
                        {renderForm()}

                        <div className="user-posts">
                            <div id="toggel-btns">
                                <Button className='toggles' onClick={() => setToggle('All')} >All Post</Button>
                                <Button className='toggles' onClick={() => setToggle('Avaliable')} >Avaliable Post</Button>
                            </div>
                            {renderPost()}
                        </div>
                    </div>
                </Col>

            </Row>
        </>
    )
}

const mapStateToProps = state => ({
    posts: state.posts,
    fullRoom: state.chatSlice,
    loader: state.loader
});
const mapDispatchToProps = { getPost, addPost, deletepost, updatepost, toggleLoader };
export default connect(mapStateToProps, mapDispatchToProps)(Post);
