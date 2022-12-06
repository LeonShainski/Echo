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
            
        },
        setCategory:(state, action) => {
            return {...state, categories: action.payload};
        }

    }
});

export const addCategory = categorySlice.actions.addCategory;
export const removeCategory = categorySlice.actions.removeCategory;
export const setCategory = categorySlice.actions.setCategory;
export default categorySlice.reducer;


