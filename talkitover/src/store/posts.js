import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import cookie from 'react-cookies';
const posts = createSlice({
    name: 'posts',
    initialState: {posts:[],
    newpost:{
        description:'',
        availability:'',
        user_name:''
    }
    },
    reducers: {
        renderpost(state, action) {
        state.posts = action.payload;
        }
    }


});
export const { renderpost } = posts.actions;
let API = 'https://talkitover-staging.herokuapp.com';
let config = {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'cookies': `${cookie.load('remember token')}`
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }
export const getPost = ( ) => async dispatch =>{
   let response = axios.get(`${API}/talkitoverposts`,config);
   console.log('respone ====> ',response);
    let posts = await response;
    console.log('response posts ===> ',posts.data);
    dispatch(renderpost(posts.data));
}
export const addPost = (obj ) => async dispatch =>{
    let response = axios.post(`${API}/talkitoverposts`,obj,config);
    console.log('respone ====> ',response);
     let posts = await response;
     console.log('response posts ===> ',posts);
    //  dispatch(renderpost(posts.data));
 }

export default posts.reducer;