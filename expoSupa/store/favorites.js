import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'category',
    initialState: {
        favorites: [{
            "category": "Humanities",
            "factScore": 0.100,
            "favorite": false,
            "id": 2000,
            "img": "https://i.ibb.co/Xxj2MBP/abstractr.jpg",
            "link": "https://leonshainski.github.io/Echo-Promo-Website/",
            "location": "EST",
            "sentiment": "Happy",
            "summary": "This is where you will find your favorite articles. To get started saving your favourite articles, click on the star at the top-right corner of any given article! (P.S feel free to remove this 'article' or any other ones by pressing the star at the top-right of this article).",
            "title": "Welcome to the article crpyt, where articles are kept forever (until you don't want them anymore).",
          }],
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
