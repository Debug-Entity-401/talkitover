import { configureStore, combineReducers } from '@reduxjs/toolkit';


import signUp from './signup';
import oauth from './oauth';

const reducers = combineReducers({signUp,oauth});

const store = configureStore( {reducer: reducers} );

export default store;