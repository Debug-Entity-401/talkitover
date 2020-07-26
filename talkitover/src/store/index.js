import { configureStore, combineReducers } from '@reduxjs/toolkit';


import signUp from './signup';
import assessment from './assessment';


const reducers = combineReducers({signUp,assessment});

const store = configureStore( {reducer: reducers} );

export default store;