import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import cookie from 'react-cookies';

const admin = createSlice({
    name: 'admin',
    initialState: {
        articles: [],
        newArticle: {
            title: '',
            text: '',
            status: '',
            url: '',
        },

    },
    reducers: {
        renderArticle(state, action) {
            state.articles = action.payload;
        }

    }
});
export const { renderArticle } = admin.actions;
let API = 'https://talkitover-staging.herokuapp.com';

export const getArticle = () => async dispatch => {
    console.log('inposts ===> ', cookie.load('remember token'))
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
    let response = axios.get(`${API}/articles`, axconfig);
    let posts = await response;
    dispatch(renderArticle(posts.data));
}
export const addArticle = (obj) => async dispatch => {
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
    let response = axios.post(`${API}/articles`, obj, config);
    await response;
    //  dispatch(renderpost(posts.data));
}
export const deleteArticle = (id) => async dispatch => {
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
    let response = axios.delete(`${API}/articles/${id}`, config);
    await response;
}

export const updateArticle = (obj, id) => async dispatch => {
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
    let response = axios.put(`${API}/articles/${id}`, obj, config);
    await response;
}
export default admin.reducer;