
import React, { useEffect, useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { LoginContext } from '../auth/context';
import { getPost, addPost, deletepost, updatepost } from '../../store/posts';
import { Form, Button, Row, Col, Card, Accordion, Container } from 'react-bootstrap';
import './posts.scss';
import Sidebar from '../Sidebar/Sidebar';
import DateTimePicker from 'react-datetime-picker';
import { Checkbox } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';
import {IfRenderer,Then,Else} from '../Home/If/index';
import {toggleLoader } from '../../store/loader';
import Loader from 'react-loader-spinner';

function Post(props) {
    const [toggle, setToggle] = useState('All');
    const [value, onChange] = useState(new Date());
    const context = useContext(LoginContext);
    useEffect(() => {
        props.getPost();
    }, []);
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
        console.log(years, month, day, hours)
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
        console.log(years, month, day, hours)
        let obj = { availability: `${years}/${month}/${day}-${hours}`, description, view_as: user, user_name: context.user.user_name };
        await props.updatepost(obj, id);
        await props.getPost();
        toggleLoader();
    }

    function renderForm() {

        if (context.user.role === 'ventor') {
            return <div id='post-form'>
                <Container>
                    <Form id='post-form-main' onSubmit={handelSubmit}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="user-post-title">Talk Free</Form.Label>
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
                                <Button id="post-btn" type="submit">Post</Button>
                            </FormGroup>
                            
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        }
    }

    function show(user, id, description) {

        if (user === context.user.user_name) {
            return <div>
                <div id="delete-btn" onClick={() => deletes(id)}>Delete</div>
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

    function renderChatLink(user, id, availability) {
        let date = new Date();
        let day = date.getDate();
        let hours = date.getHours();
        let years = date.getFullYear();
        let month = date.getMonth() + 1;
        let timeSplit = availability.split('-')[0].split('/');
        timeSplit.push(availability.split('-')[1]);
        console.log('time ====> ', timeSplit[0] >= years, timeSplit[1] >= month, timeSplit[2] >= day, timeSplit[3] >= hours);
        if (timeSplit[0] >= years && timeSplit[1] >= month && timeSplit[2] > day) {
            if (context.user.role === 'Listener' || context.user.user_name === user) {
                return <div class="chat-btn"><Link onClick={e => (!context.user.user_name) ? e.preventDefault() : null} to={`/chat?name=${context.user.user_name}&room=${id}`}>chat</Link></div>
            }
        } else if (timeSplit[2] == day && timeSplit[3] >= hours)
            if (context.user.role === 'Listener' || context.user.user_name === user) {
                return <div class="chat-btn"><Link onClick={e => (!context.user.user_name) ? e.preventDefault() : null} to={`/chat?name=${context.user.user_name}&room=${id}`}>chat</Link></div>
            }
    }

    function renderPost() {
        let date = new Date();
        let day = date.getDate();
        let hours = date.getHours();
        let years = date.getFullYear();
        let month = date.getMonth() + 1;
        let array = props.posts.posts.slice().reverse();
        if (toggle === 'All') {
            return array.map((val, i) => {
                return <div className="user-post" key={i}>
                    <Row>
                        <Col xs={6} sm={6} md={4} className="user-section">
                            <h1 className='head-post'>{val.view_as}</h1>
                        </Col>
                        <Col xs={6} sm={6} md={8}>

                            <small>{val.date}</small>
                            <p className='description'>{val.description}</p>
                            <p hidden={true} >{val.availability}</p>
                            {show(val.user_name, val._id, val.description)}
                            <div>
                                {renderChatLink(val.user_name, val._id, val.availability)}
                            </div>
                        </Col>
                    </Row>
                </div>
            })
        }
        else {
            return array.map((val, i) => {
                let timeSplit = val.availability.split('-')[0].split('/');
                timeSplit.push(val.availability.split('-')[1])
                if (timeSplit[0] >= years && timeSplit[1] >= month && timeSplit[2] > day) {
                    return <div className="user-post" key={i}>
                        <h1 className='head-post'>{val.view_as}</h1>
                        <small>{val.date}</small>
                        <p className='description'>{val.description}</p>
                        <p hidden={true} >{val.availability}</p>
                        {show(val.user_name, val._id, val.description)}
                        <div>
                            {renderChatLink(val.user_name, val._id, val.availability)}
                        </div>
                    </div>
                } else if (timeSplit[2] == day && timeSplit[3] >= hours) {
                    return <div className="user-post" key={i}>
                        <h1 className='head-post'>{val.view_as}</h1>
                        <small>{val.date}</small>
                        <p className='description'>{val.description}</p>
                        <p hidden={true} >{val.availability}</p>
                        {show(val.user_name, val._id, val.description)}
                        <div>
                            {renderChatLink(val.user_name, val._id, val.availability)}
                        </div>
                    </div>
                }
            })
        }
    }


    return (
        <>
        <IfRenderer condition={!props.loader.loader}>
            <Then>
            <div id='contain'>
                {renderForm()}
                <div id="toggel-btns">
                    <Button className='toggles' onClick={() => setToggle('All')} >All Post</Button>
                    <Button className='toggles' onClick={() => setToggle('Avaliable')} >Avaliable Post</Button>
                </div>
                <div className="user-posts">
                    {renderPost()}
               </div>
               </div>
            </Then>
            <Else>
            <Loader
         type="Puff"
         color="#00BFFF"
         height={100}
         width={100}
         timeout={3000} //3 secs
 
      />
            </Else>
        </IfRenderer>
            
        </>
    )
}

const mapStateToProps = state => ({
    posts: state.posts,
    fullRoom: state.chatSlice,
    loader: state.loader
});
const mapDispatchToProps = { getPost, addPost, deletepost, updatepost ,toggleLoader};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
