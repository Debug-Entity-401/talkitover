import React, { useEffect, useContext, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { LoginContext } from '../auth/context';
import { getPost, addPost, deletepost, updatepost } from '../../store/posts';
import { Form, Button, Card, Accordion, Container } from 'react-bootstrap';
import './posts.scss';
import DateTimePicker from 'react-datetime-picker';
import { Checkbox } from '@material-ui/core';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Link } from 'react-router-dom';



  


    

function Post(props) {
   
    const [value, onChange] = useState(new Date());
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
        let user;
        e.target.user.checked ? user = 'Anonymous' : user = context.user.user_name;
        let description = document.getElementById('mains').value;   
        let date = value;
        let day = date.getDate()
        let hours = date.getHours()
        let years = date.getFullYear()
        let month = date.getMonth()+1;
        console.log(years , month , day , hours ) 
        
        let obj = { availability: `${years}/${month}/${day}-${hours}`, description, view_as: user, user_name: context.user.user_name }
        props.addPost(obj);
        props.getPost();
    }

    //for post update
    const handelSubmited = async (e) => {
        e.preventDefault();
        let user;
        e.target.user.checked ? user = 'Anonymous' : user = context.user.user_name;
        let description = e.target.description.value;
        let id = e.target.id.value;
        let obj = { availability: value[1].toString(), description, view_as: user, user_name: context.user.user_name };
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
                                        <FormGroup row>
                                            <FormControlLabel
                                                control={<Checkbox name="user" />}
                                                label="Post Anonymously"
                                            />
                                        </FormGroup>
                                        <div>
                                            <input type='hidden' value={id} name='id' />

                                        </div>
                                        <div>
      <DateTimePicker
        onChange={onChange}
        value={value}
      />
    </div>
                                        <textarea name="description" rows="3"  defaultValue={description} />
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
    function renderChatLink(user, id,availability) {
        let date = new Date();
        let day = date.getDate();
        let hours = date.getHours();
        let years = date.getFullYear();
        let month = date.getMonth()+1;
        let timeSplit = availability.split('-')[0].split('/');
        timeSplit.push(availability.split('-')[1])
        //30<=29
        console.log('time ====> ',timeSplit[0]>=years ,timeSplit[1]>=month , timeSplit[2]>=day , timeSplit[3]>=hours);
        if(timeSplit[0]>=years && timeSplit[1]>=month && timeSplit[2]>day ){
            if (context.user.role === 'Listener' || context.user.user_name === user) {
                return <Link onClick={e => (!context.user.user_name) ? e.preventDefault() : null} to={`/chat?name=${context.user.user_name}&room=${id}`}>chat</Link>
            }
        }else if(timeSplit[2] == day && timeSplit[3]>=hours)
        if (context.user.role === 'Listener' || context.user.user_name === user) {
            return <Link onClick={e => (!context.user.user_name) ? e.preventDefault() : null} to={`/chat?name=${context.user.user_name}&room=${id}`}>chat</Link>
        }

        
    }
    function renderPost() {
       
        return props.posts.posts.map((val, i) => {
            return <div className="user-post" key={i}>
                <h1>{val.view_as}</h1>
                <p>{val.description}</p>
                <p>{val.availability}</p>
                <span>{val.date}</span>
                {show(val.user_name, val._id, val.description)}
                <div>
                    {renderChatLink(val.user_name, val._id,val.availability)}
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
                            <FormGroup row>
                                <FormControlLabel
                                    control={<Checkbox name="user" />}
                                    label="Post Anonymously"
                                />
                            </FormGroup>
                            <div>
      <DateTimePicker
        onChange={onChange}
        value={value}
      />
    </div>
                            <textarea name="description" rows="3" id="mains"/>

                            {/* <Form.Control as="textarea" id="main" rows="3" id="main" /> */}
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