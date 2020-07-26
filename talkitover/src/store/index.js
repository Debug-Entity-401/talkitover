import { configureStore, combineReducers } from '@reduxjs/toolkit';


import signUp from './signup';
import assessment from './assessment';
import posts from "./posts";


const reducers = combineReducers({signUp,assessment,posts});

const store = configureStore( {reducer: reducers} );

export default store;