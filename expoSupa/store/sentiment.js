import { createSlice } from "@reduxjs/toolkit";

import AsyncStorage from '@react-native-async-storage/async-storage';

const sentimentSlice = createSlice({
    name: 'sentiment',
    initialState: {
        sentiments: []
    },
    reducers: {
        addSentiment: (state, action) => {
            
            state.sentiments.push(action.payload);
        
        },
        removeSentiment:(state, action) =>{
            state.sentiments = state.sentiments.filter((item) => item !== action.payload);
            
        }

    }
});

export const addSentiment = sentimentSlice.actions.addSentiment;
export const removeSentiment = sentimentSlice.actions.removeSentiment;
export default sentimentSlice.reducer;


