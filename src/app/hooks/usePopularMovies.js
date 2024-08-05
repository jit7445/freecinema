'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addPopularMovies } from "../redux/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const API_Options=process.env.API_Options;
  const popularMovies = useSelector(
    (store) => store.movies.popularMovies
  );
  const getNowplayingmovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular",
      API_Options
    );
    const response = await data.json();
    dispatch(addPopularMovies(response.results));
  };
  useEffect(() => {
    !popularMovies && getNowplayingmovies();
  }, []);
};
export default usePopularMovies;
