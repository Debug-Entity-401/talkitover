import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const oauth = createSlice({

  name: 'oauth',
  initialState: {
    loggedIn: ''
  },
  reducers: {
   
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

export const { add ,validateToken,userExist} = oauth.actions;
// const API = 'https://talkitover-staging.herokuapp.com';
export const get = (API) => async dispatch => {
  try {
console.log(API);
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
    const response = await axios.get(`${API}` , config);
    console.log('response===> ',response);
    let token = await response.data;
    console.log('token ===> ', token);
   dispatch(validateToken(token));
  } catch (err) {
    dispatch(userExist(false));
    console.log('error ===>', err);
  }
}

export default oauth.reducer;