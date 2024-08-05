
'use client';
import { useEffect } from 'react';

import { useDispatch,useSelector } from 'react-redux';
import { addTopRatedMovies } from '../redux/movieSlice';
const useTopRatedMovies = () => {
  const API_Options=process.env.API_Options;
  const dispatch = useDispatch();
  const topRatedMovies  = useSelector(
    (store) => store.movies.topRatedMovies
  );
  const gettopRatedMovies= async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated",
      API_Options
    );
    const response = await data.json();
    dispatch(addTopRatedMovies(response.results));
  };
  useEffect(() => {
    !topRatedMovies && gettopRatedMovies();
  }, []);
  
}

export default useTopRatedMovies
