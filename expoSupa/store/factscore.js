import { createSlice } from "@reduxjs/toolkit";

import AsyncStorage from '@react-native-async-storage/async-storage';

const factScoreSlice = createSlice({
    name: 'factScore',
    initialState: {
        factscore: 5
    },
    reducers: {
        changeFactScore: (state, action) => {
            
           return {...state, factscore: action.payload};
            
        }
        
    }
});

export const changeFactScore = factScoreSlice.actions.changeFactScore;
export default factScoreSlice.reducer;