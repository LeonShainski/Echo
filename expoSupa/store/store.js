import { combineReducers, configureStore } from "@reduxjs/toolkit";
import sentimentReducer from './sentiment'
import categoryReducer from "./category";
import factScoreReducer from "./factscore";
import locationReducer from "./location";
import favoritesReducer from "./favorites";
import simplifiedReducer from "./simplified";
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from "@react-native-async-storage/async-storage";


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    categories: categoryReducer,
    sentiments: sentimentReducer,
    factScore: factScoreReducer,
    location: locationReducer,
    favorites: favoritesReducer,
    simplified: simplifiedReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store);