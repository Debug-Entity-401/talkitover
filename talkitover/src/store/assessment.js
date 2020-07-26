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
  // const API = 'http://localhost:3031';

export const postAssess = (scores) => async dispatch => {
  try {
      let numbers = scores.slice(1,5).map(val=> parseInt(val));
      let sumScore = numbers.reduce((val,acc)=>{
          return acc = val + acc;
      },0);
      let token = cookie.load('remember token');
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
    let username = await response.data;
    dispatch(addStatus(username.status));
  } catch (err) {
    console.log('error ===>', err);
  }
}
  export default assessment.reducer;