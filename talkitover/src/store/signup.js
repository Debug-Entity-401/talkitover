import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cookie from 'react-cookies';


const signUp = createSlice({

    name: 'signup',
    initialState: {
        user: {
            user_name: '',
            password: '',
            email: '',
            country: '',
            photo: '',
            status: '',
            role: ''
        },
        loggedIn: '',
        assessment: false,
        facebook: {
            email: '',
            first_name: '',
            last_name: '',
            photo: ''
        },
        fpass: {
            password: '',
            country: '',
        }
    },
    reducers: {
        loginFacbook(state, action) {
            //   console.log('====================>', action.payload.picture.data.url);
            if (action.payload !== 'unknown')
                Object.keys(action.payload).forEach(key => {
                    state.facebook[key] = action.payload[key];
                });
            let token = jwt.sign({ user_name: `${state.facebook.first_name} ${state.facebook.last_name}`, capabilities: ['READ', 'CREATE', 'POST'], role: 'ventor' }, 'thisissecret');
            state.loggedIn = true;
            cookie.save('remember token', token);
        },
        add(state, action) {
            Object.keys(action.payload).forEach(key => {

                state.user[key] = action.payload[key];
            })
        },
        addpass(state, action) {
            Object.keys(action.payload).forEach(key => {

                state.fpass[key] = action.payload[key];
            })
        },
        validateToken(state, action) {
            let token = action.payload;
            jwt.verify(token, 'thisissecret', function(err, decodedToken) {
                if (err) {
                    state.loggedIn = false;
                    console.log('Error:', '\n', err, '\n');
                }
                state.assessment = true;
                console.log('Verified JSON Token:', '\n', decodedToken); // bar
                cookie.save('remember token', token);
                state.loggedIn = true;
            });
        },

        userExist(state, action) {
            state.loggedIn = action.payload;
        }
    }
});

export const { add, validateToken, userExist, loginFacbook, addpass } = signUp.actions;
const API = 'https://talkitover-staging.herokuapp.com';
export const post = (obj) => async dispatch => {
    console.log('daya paaaaatch', obj.user);
    try {
        let config = {
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }
        const response = await axios.post(`${API}/signup`, obj.user, config);
        let token = await response.data;
         await dispatch(validateToken(token));
    } catch (err) {
        dispatch(userExist(false));
        console.log('error ===>', err);
    }
}
export const post2 = (obj) => async dispatch => {
    // console.log('daya paaaaatch', obj);
    try {
        let config = {
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }
        const response = await axios.post(`https://talkitover-staging.herokuapp.com/signup`, obj, config);
        let token = await response.data;
        dispatch(validateToken(token));
    } catch (err) {
        dispatch(userExist(false));
        console.log('error ===>', err);
    }
}

export default signUp.reducer;