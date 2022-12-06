import { configureStore } from "@reduxjs/toolkit";
import sentimentReducer from './sentiment'
import categoryReducer from "./category";
import factScoreReducer from "./factscore";
import locationReducer from "./location";
import favoritesReducer from "./favorites";

export const store = configureStore({
    reducer: {
        sentiments: sentimentReducer,
        categories: categoryReducer,
        factScore: factScoreReducer,
        location: locationReducer,
        favorites: favoritesReducer
    }
});