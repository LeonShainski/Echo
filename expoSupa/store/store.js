import { configureStore } from "@reduxjs/toolkit";
import sentimentReducer from './sentiment'
import categoryReducer from "./category";

export const store = configureStore({
    reducer: {
        sentiments: sentimentReducer,
        categories: categoryReducer
    }
});