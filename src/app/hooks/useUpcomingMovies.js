'use client';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import { addUpcomingMovies } from "../redux/movieSlice";

const useUpcomingMovies = () => {
  const API_TMDB = process.env.API_TMDB; // Assuming this is the correct env variable
  const url = 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2UxY2RiODE3M2JhNzEzN2RhY2Q3NTY1YjNmMjMzMCIsIm5iZiI6MTcyMzI5NTU5Ny44Mzk2OSwic3ViIjoiNjY1NWI5ZjNiNTc0MjgzYzk0MGRlODg4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.7Fa5zO-l-FGwo4IHv9X6VDzWianNR3HWLTF7OV3oouM'
  }
};

  const dispatch = useDispatch();
  const upcomingMovies = useSelector(
    (store) => store.movies.upcomingMovies
  );

  const getUpcomingMovies = async () => {
    const response = await fetch(
     url,
      options
    );
    const data = await response.json();
    dispatch(addUpcomingMovies(data.results));
  };

  useEffect(() => {
    if (!upcomingMovies) {
      getUpcomingMovies();
    }
  }, []); // Added the dependency to the useEffect hook

  return upcomingMovies; // Return the upcoming movies if needed
};

export default useUpcomingMovies;