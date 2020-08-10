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
        view_as:'',
    },
    counter:0
    },
    reducers: {
        renderpost(state, action) {
            state.counter=action.payload.length;
        state.posts = action.payload;
        }
        
    }
});
export const { renderpost } = posts.actions;
let API = 'https://talkitover-staging.herokuapp.com';

export const getPost = ( ) => async dispatch =>{
    console.log('inposts ===> ',cookie.load('remember token'))
    let axconfig = {
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
   let response = axios.get(`${API}/talkitoverposts`,axconfig);
    let posts = await response;
    dispatch(renderpost(posts.data));
}
export const addPost = (obj ) => async dispatch =>{
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
    let response = axios.post(`${API}/talkitoverposts`,obj,config);
     await response;
    //  dispatch(renderpost(posts.data));
 }
 export const deletepost=(id)=>async dispatch=>{
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
    let response = axios.delete(`${API}/talkitoverposts/${id}`,config);
   await response;
 }

 export const updatepost=(obj,id)=> async dispatch=>{
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
let response=axios.put(`${API}/talkitoverposts/${id}`,obj,config);
await response;
 }
export default posts.reducer;