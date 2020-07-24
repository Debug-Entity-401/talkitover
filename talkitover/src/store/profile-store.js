import { configureStore, combineReducers } from '@reduxjs/toolkit';
import profileSlice from './index';

const reducers = combineReducers({
    profile: profileSlice
});

const store = configureStore({ reducer: reducers });

export default store;