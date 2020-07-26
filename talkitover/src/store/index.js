import { configureStore, combineReducers } from '@reduxjs/toolkit';


import signUp from './signup';
import oauth from './oauth';
import createSlice from './profile-store'
import otherProfile from './other-profile-srore';

const reducers = combineReducers({ signUp, oauth, createSlice, otherProfile });

const store = configureStore({ reducer: reducers });

export default store;