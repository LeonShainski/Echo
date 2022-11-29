import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: 'location',
    initialState: {
        location: "EST"
    },
    reducers: {
        changeLocation: (state, action) => {
            
           return {...state, location: action.payload};
            
        }
        
    }
});

export const changeLocation = locationSlice.actions.changeLocation;
export default locationSlice.reducer;