import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name: 'category',
    initialState: {
        favorites: [{
            "category": "business",
            "factScore": 0.858443,
            "favorite": false,
            "id": 2622,
            "img": "https://media.bizj.us/view/img/12406099/headshotcarl-roer*200xx1806-1207-0-218.jpg",
            "link": "https://www.bizjournals.com/newyork/news/2022/12/02/nba-equity-grows-portfolio-as-upstarts-take-shot.html?ana=brss_3590",
            "location": "PST",
            "sentiment": "Information",
            "summary": "Less than a year after its launch, the NBA's investment arm, NBA Equity, has added nearly 20 companies to its portfolio.",
            "title": "NBA Equity’s portfolio grows as upstarts take their shot",
          }, {
            "category": "business",
            "factScore": 0.667134,
            "favorite": false,
            "id": 2627,
            "img": "https://media.bizj.us/view/img/12406216/gettyimages-1406532002*900xx7985-5333-0-0.jpg",
            "link": "https://www.bizjournals.com/phoenix/subscriber-only/2022/12/02/largest-arizona-fy2022-sba-7a-loans.html?ana=brss_3590",
            "location": "PST",
            "sentiment": "Information",
            "summary": "Researched list with data provided by the SBA's Arizona District office. Information points include loan amount, borrower, business category, jobs supported and lender.",
            "title": "Largest Arizona FY2022 SBA 7(a) Loans",
          }],
        favIds: [2622, 2627],
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
