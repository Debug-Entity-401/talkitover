import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import superagent from 'superagent';

let url = 'https://talkitover-staging.herokuapp.com/profile';

const profileSlice = createSlice({
    name: 'profile',
    initialState: { results: [] },
    reducers: {
        get(state, action) {
            state.results.push({ name: action.payload })
        }
    }
})

export const { get } = profileSlice.actions;

export const fetchData = () => async dispatch => {
    console.log('hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii', document.cookie.split('=')[1]);

    const axiosConfig = {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'cookies': `remember token=${document.cookie.split('=')[1]}`
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
            data.body.forEeach(results => dispatch(get(results)))
        })
        .catch(err => { /* not hit since no 401 */ })

    //     return superagent.get(url)
    //         .set('X-API-Key', 'foobar')
    //         .set('Accept', 'application/json')
    //         .withCredentials()
    //         .then(data => {
    //             console.log('data -->', data);
    //             data.body.results.forEach(results => dispatch(get(results)))
    //         });

    //     const res = await fetch('http://localhost:3031/profile', { credentials: "same-origin" });
    //     const people = await res;
    //     console.log('data -->', people);
    //     people.results.forEach(results => dispatch(get(results)));


}
export default profileSlice.reducer;