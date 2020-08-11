
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
import { makeStyles } from '@material-ui/core/styles';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import check from '../../assets/images/check.gif';
import Swal from 'sweetalert2';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
function Post(props) {

    // document.querySelector('.solved').addEventListener('click',()=>{

    // })
    const classes = useStyles();
    const [toggle, setToggle] = useState('All');
    // const [spinner, setSpinner] = useState(true);
    const [value, onChange] = useState(new Date());
    

    const context = useContext(LoginContext);
    useEffect(() => {
        // setSpinner(true);
        props.getPost();
    }, []);
    const deletes = async (id) => {
        
        toggleLoader();

        await props.deletepost(id);
       
        await props.getPost();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your post has been deleted',
            showConfirmButton: false,
            timer: 1500
          })
       
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
        console.log('hours ===> ',hours);
        let obj = { availability: `${years}/${month}/${day}-${hours}`, description, view_as: user, user_name: context.user.user_name };
        document.getElementById('post-form-main').reset();
        await props.addPost(obj);
        await props.getPost();
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'your post is Published',
            showConfirmButton: false,
            timer: 1500
          })
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
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Post has been Updated',
            showConfirmButton: false,
            timer: 1500
          })
       
        toggleLoader();
    }
    const updateSolved = async (e) => {
        e.preventDefault();
        toggleLoader();
        let user;
        e.target.solved.value ? user = true : user = false;
        let id = e.target.id.value;
        console.log( document.getElementById(`${id}`))
        document.getElementById(`${id}`).classList.add("solved");
        let obj = { solved: user };
        await props.updatepost(obj, id);
        await props.getPost();
        toggleLoader();
    }

    function renderForm() {
        if (context.user.role === 'ventor') {
            return <div>

                <div id='post-form'>
                    <Container>
                        <Card id="post-card" className={classes.root}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Describe your Problem
                      </Typography>
                            </CardContent>
                            <Form id='post-form-main' onSubmit={handelSubmit}>
                                <Form.Group controlId="exampleForm.ControlTextarea1">

                                    <textarea name="description" rows="3" id="mains" placeholder="" className="form-control textarea-post" />
                                   
                                    <FormGroup row>
                                        <div id='form-footer'>

                                            <span>I am avaliable until</span>
                                            <DateTimePicker
                                                onChange={onChange}
                                                value={value}
                                            />
                                        </div>
                                        <div className="Post-button">
                                            <FormControlLabel
                                                control={<Checkbox name="user" />}
                                                label="Post Anonymously"

                                            />
                                            <Button id="post-btn" type="submit">Post</Button>
                                        </div>
                                    </FormGroup>

                                </Form.Group>
                            </Form>
                        </Card>
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
                                                <br />
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

    function renderChatLink(solved, user, id, availability) {
        let date = new Date();
        let day = date.getDate();
        let hours = date.getHours();
        let years = date.getFullYear();
        let month = date.getMonth() + 1;
        let timeSplit = availability.split('-')[0].split('/');
        timeSplit.push(availability.split('-')[1]);
        console.log(timeSplit[3],' ====>  ',hours);
        console.log('day ==> ',day,' === ',timeSplit[2]);
        if (!solved) {
            if ((timeSplit[0] >= years && timeSplit[1] >= month && timeSplit[2] > day)) {
                if (context.user.role === 'Listener' || context.user.user_name === user) {
                    return <div class="chat-btn"><Link onClick={e => (!context.user.user_name) ? e.preventDefault() : null} to={`/chat?name=${context.user.user_name}&room=${id}`}><i class="fa fa-comments" aria-hidden="true"></i>                    </Link></div>
                }
            } else if (timeSplit[2] == day && timeSplit[3] >= hours)
                if (context.user.role === 'Listener' || context.user.user_name === user) {
                    return <div class="chat-btn"><Link onClick={e => (!context.user.user_name) ? e.preventDefault() : null} to={`/chat?name=${context.user.user_name}&room=${id}`}><i class="fa fa-comments" aria-hidden="true"></i>                    </Link></div>
                }
        }}
    function renderUserName(user) {
        if (user === "Anonymous") {
            return <h1>{user}</h1>;
        } else {
            return <Link to={`/otherProfile?name=${user}`}>{user}</Link>;
        }
    }
    function solveProblemForm(val) {
        if (context.user.user_name === val.user_name &&!val.solved) {
            return <form onSubmit={updateSolved} >
                <input  hidden={true} id="id" value={val._id} />
                <FormControlLabel id={val._id}  
                    control={<Checkbox type='submit'    value={true} name="solved" />}
                    label="solved"
                />
            </form>
        }
        else if(val.solved)
        {
            return(
                <div className="checked">
                <img src={check} className="check" />
                </div>
            )
           
        }

    }
    // let solve = "true"
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
                        <p className='description'>{val.description}</p>
                        <div>
                            {renderChatLink(val.solved, val.user_name, val._id, val.availability)}
                        </div>
                        {show(val.user_name, val._id, val.description)}
                       
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
                            <div>
                                {renderChatLink(val.solved, val.user_name, val._id, val.availability)}

                            </div>
                            {show(val.user_name, val._id, val.description)}
                          
                            <div className="time">
                            </div>
                        </Toast.Body>
                    </Toast>
                } else if (timeSplit[2] == day && timeSplit[3] >= hours) {
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
                            <div>
                                {renderChatLink(val.solved, val.user_name, val._id, val.availability)}

                            </div>
                            {show(val.user_name, val._id, val.description)}
                           
                            <div className="time">
                            </div>
                        </Toast.Body>
                    </Toast>
                }
            })
        }
    }

    console.log('props.posts.length ==>',props.posts.posts.length);

    if(!props.posts.posts.length){
        return <div className="loader-div">
             <Loader className="loader" type="Circles" color="#00BFFF" height={100} width={100} />
        </div>
    }


    return (
        <>
            <Row>
                <Col xs={1} sm={1}  md={1}>
                    <Sidebar />
                </Col>
                <Col xs={11} sm={11} md={11}>
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
