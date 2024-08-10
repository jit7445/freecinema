'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../redux/movieSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const API_TMDB = process.env.API_TMDB; // Assuming this is the correct env variable
  const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2UxY2RiODE3M2JhNzEzN2RhY2Q3NTY1YjNmMjMzMCIsIm5iZiI6MTcyMzI5NTU5Ny44Mzk2OSwic3ViIjoiNjY1NWI5ZjNiNTc0MjgzYzk0MGRlODg4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.7Fa5zO-l-FGwo4IHv9X6VDzWianNR3HWLTF7OV3oouM'
    }
  };

  const popularMovies = useSelector(
    (store) => store.movies.popularMovies
  );

  const getPopularMovies = async () => { // Renamed the function to match its purpose
    const response = await fetch(
     url,
      options
    );
    const data = await response.json();
    dispatch(addPopularMovies(data.results));
  };

  useEffect(() => {
    if (!popularMovies) {
      getPopularMovies();
    }
  }, []); // Added the dependency to the useEffect hook

  return popularMovies; // Return the popular movies if needed
};

export default usePopularMovies;