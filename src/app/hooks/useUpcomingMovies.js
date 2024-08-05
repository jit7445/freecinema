
'use client';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import { addUpcomingMovies} from "../redux/movieSlice";
const useUpcomingMovies = () => {
  const API_Options=process.env.API_Options;
  const dispatch = useDispatch();
  const upcomingMovies = useSelector(
    (store) => store.movies.upcomingMovies
  );
  const getNowplayingmovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming",
      API_Options
    );
    const response = await data.json();
    dispatch(addUpcomingMovies(response.results));
  };
  useEffect(() => {
    !upcomingMovies && getNowplayingmovies();
  }, []);
}

export default useUpcomingMovies
