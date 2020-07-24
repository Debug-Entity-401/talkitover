import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const signUp = createSlice({

  name: 'signup',
  initialState: {
    user:{user_name: '',
    password: '',
    email: '',
    role:''
  },
    loggedIn: ''
  },
  reducers: {
    add(state, action) {
      Object.keys(action.payload).forEach(key => {
        state.user[key] = action.payload[key];
      })
    },
    validateToken(state,action){
      let token = action.payload;
          jwt.verify(token, 'thisissecret',  function(err, decodedToken) {
            if (err) {
              state.loggedIn=false;
                console.log('Error:', '\n', err, '\n');
            }
            console.log('Verified JSON Token:', '\n', decodedToken); // bar
          state.loggedIn=true;
     
        });      
  },

  userExist(state,action){
    state.loggedIn=action.payload;
  }
  }
});

export const { add ,validateToken,userExist} = signUp.actions;
const API = 'https://talkitover-staging.herokuapp.com';
export const post = (obj) => async dispatch => {
  try {

    let config = {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    }
    const response = await axios.post(`${API}/signup`, obj.user, config);
    console.log('response===> ',response);
    let token = await response.data;
    console.log('token ===> ', token);
   dispatch(validateToken(token));
  } catch (err) {
    dispatch(userExist(false));
    console.log('error ===>', err);
  }
}

export default signUp.reducer;