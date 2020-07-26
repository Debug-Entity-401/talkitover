import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import cookie from 'react-cookies';

const assessment = createSlice({

    name: 'assessment',
    initialState: {
      score:[],
      answer:'',
      status: ''
    },
    reducers: {
     sum(state,action){
         console.log('action payload ===> ',action.payload);
        if(state.answer === '')state.answer=action.payload.answer;
        state.score.push(action.payload.score);
     },
     addStatus(state,action){
        state.status = action.payload;
     }
    
    }
  });
  
  export const { sum ,addStatus} = assessment.actions;

  const API = 'https://talkitover-staging.herokuapp.com';
export const postAssess = (scores) => async dispatch => {
  try {
      console.log('scores ===> ',scores);
      let numbers = scores.slice(1,5).map(val=> parseInt(val));
      let sumScore = numbers.reduce((val,acc)=>{
          return acc = val + acc;
      },0);
      let token = cookie.load('remember token');
    console.log('input ====>',sumScore + 3);
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
    const response = await axios.post(`${API}/assessment`, {score:sumScore,token}, config);
    console.log('response=assessment==> ', response);
    let username = await response.data;
    console.log('username ===> ', username);
    dispatch(addStatus(username.status));
  } catch (err) {
    console.log('error ===>', err);
  }
}
  export default assessment.reducer;