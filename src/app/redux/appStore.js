import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movieSlice";
import watchlistReducer from "./watchlistSlice";

const appStore = configureStore({
  reducer: {
    movies: movieReducer,
    watchlist: watchlistReducer,
  }
});

export default appStore;
