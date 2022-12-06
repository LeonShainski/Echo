import { createSlice } from "@reduxjs/toolkit";

import AsyncStorage from '@react-native-async-storage/async-storage';

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        favorites: [],
        favIds: [],
    },
    reducers: {
        addFavorite: (state, action) => {
            if (!state.favorites.includes(action.payload)) {
                state.favorites.push(action.payload);
                state.favIds.push(action.payload.id);
                console.log('addFavorite');
                console.log(action.payload);
            }
          
        },

        removeFavorite: (state, action) => {
            console.log('remove ', action.payload.id);
            state.favorites = state.favorites.filter((item) => {
                item.id !== action.payload.id
            }
            );
            const index = state.favIds.indexOf(action.payload.id);
            if (index > -1) { // only splice array when item is found
                state.favIds.splice(index, 1); // 2nd parameter means remove one item only
            }

        },
        setFavorites: (state, action) => {

            
            var newIds = []
            for (const article of action.payload) {
                newIds.push(article.id);
            }
            state.favIds = newIds;
            state.favorites = action.payload;
            return;


        }
    }
});

export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export const setFavorites = favoritesSlice.actions.setFavorites;
export default favoritesSlice.reducer;
