import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let url = "https://talkitover-staging.herokuapp.com/profile";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        results: {},
        profile: {
            username: "",
            email: "",
            photo: "",
            country: "",
        },
    },
    reducers: {
        get(state, action) {
            state.results = action.payload;
        },
        add(state, action) {
            Object.keys(action.payload).forEach((key) => {
                state.profile[key] = action.payload[key];
            });
        },
    },
});

export const {get, add: adding } = profileSlice.actions;

export const fetchData = () => async(dispatch) => {
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
        .get(`${url}`, axiosConfig)
        .then((data) => {
            dispatch(get(data.data));
            console.log(data.data);
        })
        .catch((err) => {
            /* not hit since no 401 */
        });
};

export const updateProfile = (id, data) => async(dispatch) => {
    return axios.put(`${url}/${id}`, data).then((res) => {});
};
export default profileSlice.reducer;