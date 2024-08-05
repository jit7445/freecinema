import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState: {
        watchlistItems: [],
        watchlistTotalQuantity: 0 
    },
    reducers: {
        addMovie(state, action) {
            const movie = action.payload;
            const existingMovie = state.watchlistItems.find(item => item.id === movie.id);
            if (!existingMovie) {
                state.watchlistItems.push(movie);
                state.watchlistTotalQuantity += 1; 
            }
        },
        removeMovie(state, action) {
            const id = action.payload;
            const existingMovie = state.watchlistItems.find(item => item.id === id);
            if (existingMovie) {
                state.watchlistItems = state.watchlistItems.filter(item => item.id !== id);
                state.watchlistTotalQuantity -= 1; 
            }
        },
        clearWatchlist(state) {
            state.watchlistItems = [];
            state.watchlistTotalQuantity = 0; 
        }
    }
});

export const { addMovie, removeMovie, clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
