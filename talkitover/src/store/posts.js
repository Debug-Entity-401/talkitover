import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import cookie from 'react-cookies';

const posts = createSlice({
    name: 'posts',
    initialState: {posts:[],
    newpost:{
        description:'',
        availability:'',
        user_name:'',
        view_as:''
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
    let posts = await response;
    dispatch(renderpost(posts.data));
}
export const addPost = (obj ) => async dispatch =>{
    let response = axios.post(`${API}/talkitoverposts`,obj,config);
     let posts = await response;
    //  dispatch(renderpost(posts.data));
 }
 export const deletepost=(id)=>async dispatch=>{
    let response = axios.delete(`${API}/talkitoverposts/${id}`,config);
    console.log('respnse=>>>>>>.',response);
    let posts=await response;
    console.log('response posts ===> ',posts);
 }

 export const updatepost=(obj,id)=> async dispatch=>{
let response=axios.put(`${API}/talkitoverposts/${id}`,obj,config);
console.log('response=>>>>>>',response);
let posts=await response;
console.log('response update posts=>>>>>',posts);
 }
export default posts.reducer;