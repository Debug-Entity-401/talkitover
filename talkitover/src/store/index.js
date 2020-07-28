import { configureStore, combineReducers } from '@reduxjs/toolkit';
import signUp from './signup';
import createSlice from './profile-store'
import otherProfile from './other-profile-srore';
import assessment from './assessment';
import posts from "./posts";

const reducers = combineReducers({ signUp, createSlice, otherProfile, assessment,posts });



const store = configureStore( {reducer: reducers} );

export default store;