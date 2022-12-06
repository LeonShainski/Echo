import { createSlice } from "@reduxjs/toolkit";

const sentimentSlice = createSlice({
    name: 'sentiment',
    initialState: {
        sentiments: ['Happy', 'Sad', 'Information']
    },
    reducers: {
        addSentiment: (state, action) => {
            
            state.sentiments.push(action.payload);
        
        },
        removeSentiment:(state, action) =>{
            console.log('action.payload', action.payload);
            state.sentiments = state.sentiments.filter((item) => item !== action.payload);
            console.log('state.sentiments', state.sentiments);
            
        },
        setSentiment:(state, action) => {
            return {...state, sentiments: action.payload};
        }

    }
});

export const addSentiment = sentimentSlice.actions.addSentiment;
export const removeSentiment = sentimentSlice.actions.removeSentiment;
export const setSentiment = sentimentSlice.actions.setSentiment;
export default sentimentSlice.reducer;


