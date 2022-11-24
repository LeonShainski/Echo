import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: ['business', 'politics', 'sports', 'tech', 'entertainment']
    },
    reducers: {
        addCategory: (state, action) => {
            
            state.categories.push(action.payload);

        },
        removeCategory:(state, action) =>{
            state.categories = state.categories.filter((item) => item !== action.payload);
            
        }

    }
});

export const addCategory = categorySlice.actions.addCategory;
export const removeCategory = categorySlice.actions.removeCategory;
export default categorySlice.reducer;


