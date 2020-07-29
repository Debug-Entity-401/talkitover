import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux'
import io from 'socket.io-client';
import { LoginContext } from '../auth/context';
import { add, fullRoom } from '../../store/chat-store';
import { Link, useLocation } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
let socket;
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function Chat(props) {
  let query = useQuery();
  const context = useContext(LoginContext);
  const [state, setState] = useState({ message: '' })
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(modalpayload === 'Room is full.');
  const handleClose = () => setShow(false);

  const room = query.get('room');
  const ENDPOINT = 'https://talkitover-staging.herokuapp.com';
  const name = context.user.user_name;
  const role = context.user.role;
  let modalpayload;
  useEffect(() => {
    socket = io(ENDPOINT);
    if (context.user.user_name)
      socket.emit('new-user', ({ room: room, name: name, role: role }));
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
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    const { message } = state;
    socket.emit('send-chat-message', { room: room, message: state });
    props.add({ name: 'You', message: state });
    document.getElementById('chat-form').reset();
  }
  const endChat = e => {
    socket.emit('disconnected')
  }
  const renderChat = () => {
    return props.chat.messages.map((message, index) => (
      <div key={index}>
        <h3>
          {message.name}:<span>{message.message.message}</span>
        </h3>
      </div>
    ))
  }
  return (
    <>
      <div id="card" className="card">
        <form id="chat-form" onSubmit={onMessageSubmit}>
          <h1>Messanger</h1>
          <div>
            <input
              name="message"
              onChange={e => onTextChange(e)}
              value={state.message}
              id="outlined-multiline-static"
              variant="outlined"
              label="Message"
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
        <div className="render-chat">
          <h1>Chat Log</h1>
          {renderChat()}
        </div>
        <Link to="/posts"><button onClick={endChat}>End Chat</button></Link>
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
  chat: state.chatSlice
})
const mapDispatchAction = { add, fullRoom };

export default connect(mapStateToProps, mapDispatchAction)(Chat);