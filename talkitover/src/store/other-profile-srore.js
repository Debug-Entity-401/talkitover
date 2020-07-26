import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const otherProfile = createSlice({
    name: 'other_profile',
    initialState: {
        results: {},
        review: {
            reviewer_name: '',
            date: '',
            rating: '',
            review_description: '',
        }
    },
    reducers: {
        get(state, action) {
            console.log('action', action.payload);
            state.results = action.payload;
        },
        add(state, action) {
            Object.keys(action.payload).forEach(key => {
                state.review[key] = action.payload[key];
            })
        }
    }
});

export const {get, add: adding } = otherProfile.actions;

export const fetchOtherProfile = () => async dispatch => {
    const axiosConfig = {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'cookies': `${document.cookie.split('=')[1]}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };
    return axios
        .get(
            'http://localhost:3031/otherprofile/zain', axiosConfig
        )
        .then(data => {
            dispatch(get(data.data))
        })
        .catch(err => { /* not hit since no 401 */ })
}

export const addNewReview = (body) => async dispatch => {
    const axiosConfig = {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'cookies': `${document.cookie.split('=')[1]}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };
    return axios.post('http://localhost:3031/addreview/zain', body, axiosConfig)
        .then(data => {
            console.log(data);
        })

}

export const deleteReview = (id) => async dispatch => {
    const axiosConfig = {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'cookies': `${document.cookie.split('=')[1]}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    };
    let url2 = `http://localhost:3031/deletereview/zain/${id}`
    console.log('this id ====>', id);
    return axios.delete(url2, axiosConfig)
        .then(data => {
            console.log(data);
        })
        .catch(err => { alert('you cannot delete this') })
}


export default otherProfile.reducer;