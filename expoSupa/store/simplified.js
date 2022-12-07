import { createSlice } from "@reduxjs/toolkit";

const simplifiedSlice = createSlice({
    name: 'simplified',
    initialState: {
        simplified: 0
    },
    reducers: {
        changeView: (state, action) => {
            
           return {...state, simplified: action.payload};
            
        }
        
    }
});

export const changeView = simplifiedSlice.actions.changeView;
export default simplifiedSlice.reducer;