import { configureStore } from "@reduxjs/toolkit";
import sentimentReducer from './sentiment'
import categoryReducer from "./category";
import factScoreReducer from "./factscore";

export const store = configureStore({
    reducer: {
        sentiments: sentimentReducer,
        categories: categoryReducer,
        factScore: factScoreReducer
    }
});