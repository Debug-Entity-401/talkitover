import React, { useState, useEffect,useContext} from 'react'
import query from 'query-string';
import io from 'socket.io-client'
import { LoginContext } from '../auth/context';
let socket;
function Chat(props) {
  const context = useContext(LoginContext);
  const [state, setState] = useState({ message: ''})
  const [chat, setChat] = useState([])
const room='chat';
const ENDPOINT = 'http://localhost:3031';

const name=context.user.user_name;
  useEffect(() => {  
    socket = io(ENDPOINT);
    //  const data = query.parse(location.search);
    if(context.user.user_name)
    socket.emit('new-user', ({room:'chat',name:context.user.user_name}));
    // console.log(data);
    socket.on('chat-message', (message) => {
      console.log('messageeeeeeeeeeeeeeeeeeeeeee',message);
      setChat([...chat, message])
  
    })
    console.log('im hereeeeeeeeeee');
  },[context.user.user_name])

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

  }
 
  const renderChat = () => {
    console.log('chat messages',chat)
    return chat.map((message, index) => (
      
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
    </div>
  )
}

export default Chat