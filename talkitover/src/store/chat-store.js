import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({

    name: 'chat',
    initialState: {
        messages: [],
        room: ''
    },
    reducers: {
        add(state, action) {
            state.messages.push(action.payload);
        }
    }
});

export const { add } = chatSlice.actions;
export default chatSlice.reducer;