import { createSlice } from '@reduxjs/toolkit';

function post=createSlice({
name:'post',
initialState:[],
reducers:{addpost(state,action){

}}


})
export const {addpost}=post.actions;
export default post.reducer;