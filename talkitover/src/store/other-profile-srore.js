import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const otherProfile = createSlice({
    name: "other_profile",
    initialState: {
        results: {},
        review: {
            reviewer_name: "",
            date: "",
            rating: "",
            review_description: "",
        },
    },
    reducers: {
        get(state, action) {
            console.log("action", action.payload);
            state.results = action.payload;
        },
        add(state, action) {
            Object.keys(action.payload).forEach((key) => {
                state.review[key] = action.payload[key];
            });
        },
    },
});

let url = "https://talkitover-staging.herokuapp.com";

export const {get, add: adding } = otherProfile.actions;

export const fetchOtherProfile = (name) => async(dispatch) => {
    const axiosConfig = {
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            cookies: `${document.cookie.split("=")[1]}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    };
    return axios
        .get(`${url}/otherprofile/${name}`, axiosConfig)
        .then((data) => {
            dispatch(get(data.data));
        })
        .catch((err) => {
            /* not hit since no 401 */
        });
};

export const addNewReview = (body, name) => async(dispatch) => {
    const axiosConfig = {
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            cookies: `${document.cookie.split("=")[1]}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    };
    //     console.log('===============>', body, name);
    return axios.post(`${url}/addreview/${name}`, body, axiosConfig).then((data) => {
        console.log(data);
    });
};

export default otherProfile.reducer;