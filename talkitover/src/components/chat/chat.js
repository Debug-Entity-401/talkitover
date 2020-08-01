import React, { useState, useEffect, useContext } from 'react';
import { fetchData } from '../../store/profile-store';
import { connect } from 'react-redux'
import io from 'socket.io-client';
import { LoginContext } from '../auth/context';
import { add, fullRoom } from '../../store/chat-store';
import { Link, useLocation } from 'react-router-dom';
import { Modal, Button, Form, Container } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import '../chat/chat.scss';
import Fade from 'react-reveal/Fade';
let socket;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
}));

var d = new Date();
var UTCHour = d.getHours() + ':' + d.getMinutes();

function useQuery() {

  return new URLSearchParams(useLocation().search);
}
function Chat(props) {

  const classes = useStyles();

  useEffect(() => {
    props.fetchData()
  }, [])

  useEffect(() => {
    if (document.querySelector('.chat-div')) {
      document.querySelector('.render-chat').scrollTo({
        top: document.querySelector('.render-chat').scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    }
  })

  let query = useQuery();
  const context = useContext(LoginContext);
  const [state, setState] = useState({ message: '', image: '' })
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(modalpayload === 'Room is full.');
  const handleClose = () => setShow(false);

  const room = query.get('room');//will get the id of post
  const ENDPOINT = 'https://talkitover-staging.herokuapp.com';
  const name = context.user.user_name;
  const role = context.user.role;
  let modalpayload;
  useEffect(() => {
    socket = io(ENDPOINT);
    if (context.user.user_name)
      socket.emit('new-user', ({ room: room, name: name, role: role, image: props.profile.results.photo }));
    socket.on('chat-message', (message) => {
      props.add(message)
    })
    socket.on('user-disconnected', (endData) => {
      props.add({ name: endData.name, message: { message: endData.message } })
    })
    socket.on('full-room', (payload) => {
      modalpayload = payload;
      document.getElementById('card').style.display = "none";
      handleShow();
    })
  }, [room, name, show])

  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value, image: props.profile.results.photo });

  }

  const onMessageSubmit = e => {
    e.preventDefault()
    const { message } = state;
    socket.emit('send-chat-message', { room: room, message: state });
    props.add({ name: 'You', message: state });
    console.log('heyyyyyyyyyyy', state)
    e.target.message.value = '';


  }
  const endChat = e => {
    socket.emit('disconnected')
  }
  const renderChat = () => {
    return props.chat.messages.map((message, index) => (

      <div>
        <div className="clearboth"></div>
        {message.name === "You" ?
          <Fade duration={500} top>

            <div className='containers user-chat-box ' key={index}>

              <div className='chat-div' id='You'>
                <div className="chat-boxx">
                  <Avatar src={message.message.image} className={classes.small} />
                  <span className="username"> {message.name}</span>
                </div>
                <div className="chat-message">
                  <Container>
                    <h3>
                      <span>{message.message.message}</span>
                    </h3>
                  </Container>
                </div>
              </div>
              <div className="message-time-box">
                <span class="time-left">{UTCHour}</span>
              </div>
            </div>

          </Fade>

          :
          <Fade duration={500} top>

            <div className='containers-right  chat-div' key={index}>
              <div className="containerw">

                <div className="chat-boxx">
                  <Avatar src={message.message.image} className={classes.small} />
                  <span className="username"> {message.name}</span>
                </div>
                <div className="message-time-box">
                  <span class="time-right">{UTCHour}</span>
                </div>
                <div className="chat-message">
                  <Container>
                    <h3>
                      <span>{message.message.message}</span>
                    </h3>
                  </Container>
                </div>

              </div>

            </div>

          </Fade>

        }
      </div>

    ))
  }

  return (
    <>
      <div id="card" className="card">

        <div className="render-chat">
          {renderChat()}
        </div>
        <form id="chat-form" onSubmit={onMessageSubmit}>


          <div className="chat-input-box">

            <Form.Control
              name="message"
              onChange={e => onTextChange(e)}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />

            <div className="chat-btns">
              <ul>
              <li><Button type="submit" id="send" variant="success">Send Message</Button></li>
                <li><Link to="/posts"><Button variant="danger" onClick={endChat}>End Chat</Button></Link></li>

              </ul>

            </div>

          </div>

        </form>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>Room is full</Modal.Body>
        <Modal.Footer>
          <Link to='/posts'>Go Back</Link>
        </Modal.Footer>
      </Modal>
    </>
  )
}

const mapStateToProps = state => ({
  chat: state.chatSlice,
  profile: state.createSlice

})
const mapDispatchAction = { add, fullRoom, fetchData };

export default connect(mapStateToProps, mapDispatchAction)(Chat);