import { configureStore, combineReducers } from '@reduxjs/toolkit';


import signUp from './signup';
import oauth from './oauth';
import createSlice from './profile-store'

const reducers = combineReducers({ signUp, oauth, createSlice });

const store = configureStore({ reducer: reducers });

export default store;