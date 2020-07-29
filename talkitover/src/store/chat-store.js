import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        room: '',
        isFull: false
    },
    reducers: {
        add(state, action) {
            state.messages.push(action.payload);
        },
        fullRoom(state, action) {
            state.isFull = action.payload;
            console.log('action ', state.isFull);
        }
    }
});

export const { add, fullRoom } = chatSlice.actions;
export default chatSlice.reducer;