import React, { useState, useEffect,useContext} from 'react';
import { connect} from 'react-redux'
import io from 'socket.io-client';
import { LoginContext } from '../auth/context';
import { add, fullRoom } from '../../store/chat-store';
import {Link} from'react-router-dom';
let socket;

function Chat(props) {

  const context = useContext(LoginContext);
  const [state, setState] = useState({ message: ''})

const room='chat';
const ENDPOINT = 'https://talkitover-staging.herokuapp.com';
const name=context.user.user_name;

  useEffect(() => {  
    socket = io(ENDPOINT);
    if(context.user.user_name)
    socket.emit('new-user', ({room:room , name:name}));
    socket.on('chat-message', (message) => {
      props.add(message)
    })
    socket.on('user-disconnected',(endData)=>{
	props.add({name :endData.name , message:{message:endData.message}})
    })
    socket.on('full-room',(payload)=>{
      if (payload === 'Room is full.') {
        props.fullRoom(true);
        console.log('full room', payload);
      }
        })
  },[room, name])


  const onTextChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
    console.log('textchange',state);
  }

  const onMessageSubmit = e => {
    e.preventDefault()
    const { message } = state
    console.log(state);
    socket.emit('send-chat-message', {room:'chat' , message:state })
    setState({ message: '' })
    props.add({name:'You', message : state})
  }
const endChat = e =>{
	socket.emit('disconnected')
}
  const renderChat = () => {
    console.log('chat messages',props.chat.messages)
    return props.chat.messages.map((message, index) => (
      <div key={index}>
              {console.log('messgassde',message)}
        <h3>
         {message.name}:<span>{message.message.message}</span>
        </h3>
      </div>
    ))
  }
  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
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
  )
}

const mapStateToProps = state =>({
	chat : state.chatSlice
})
const mapDispatchAction = {add, fullRoom};

export default connect(mapStateToProps , mapDispatchAction) (Chat);