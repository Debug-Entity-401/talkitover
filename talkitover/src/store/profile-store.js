import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

let url = 'https://talkitover-staging.herokuapp.com/profile';

const profileSlice = createSlice({
    name: 'profile',
    initialState: { results: {} },
    reducers: {
        get(state, action) {
            console.log('act', action, 'state', state);
            state.results = action.payload;
        }
    }
})

export const { get } = profileSlice.actions;

export const fetchData = () => async dispatch => {

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
            'http://localhost:3031/profile', axiosConfig
        )
        .then(data => {
            console.log('data-->', data.data);
            dispatch(get(data.data))
        })
        .catch(err => { /* not hit since no 401 */ })

}
export default profileSlice.reducer;