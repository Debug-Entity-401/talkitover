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
        addpost(state, action) {
        state.posts = action.payload;
        }
    }


});
export const { addpost } = posts.actions;
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
    dispatch(addpost(posts.data));
}

export default posts.reducer;