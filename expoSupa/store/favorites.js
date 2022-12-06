import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'category',
    initialState: {
        favorites: []
    },
    reducers: {
        addFavorite: (state, action) => {
            if (!state.favorites.includes(action.payload)) {
                state.favorites.push(action.payload);
                console.log('addFavorite');
                console.log(action.payload);
            }
        },

        removeFavorite: (state, action) => {
            console.log('remove ', action.payload.id);
            state.favorites = state.favorites.filter((item) => {
                item !== action.payload
            }
            );
            const index = array.indexOf(action.payload.id);
            if (index > -1) { // only splice array when item is found
                fa.splice(index, 1); // 2nd parameter means remove one item only
            }

        },
        setFavorites: (state, action) => {
            return { ...state, favorites: action.payload };
        }

    }
});

export const addFavorite = favoritesSlice.actions.addFavorite;
export const removeFavorite = favoritesSlice.actions.removeFavorite;
export const setFavorite = favoritesSlice.actions.setFavorites;
export default favoritesSlice.reducer;
