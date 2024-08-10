'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTopRatedMovies } from '../redux/movieSlice';

const useTopRatedMovies = () => {
  const API_TMDB = process.env.API_TMDB; // Assuming this is the correct env variable
 
const url = 'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2UxY2RiODE3M2JhNzEzN2RhY2Q3NTY1YjNmMjMzMCIsIm5iZiI6MTcyMzI5NTU5Ny44Mzk2OSwic3ViIjoiNjY1NWI5ZjNiNTc0MjgzYzk0MGRlODg4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.7Fa5zO-l-FGwo4IHv9X6VDzWianNR3HWLTF7OV3oouM'
  }
};


  const dispatch = useDispatch();
  const topRatedMovies = useSelector(
    (store) => store.movies.topRatedMovies
  );
  const getTopRatedMovies = async () => {
    console.log("Calling getTopRatedMovies...");
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("data:", data);
      dispatch(addTopRatedMovies(data.results));
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
    }
  };

  useEffect(() => {
    if (!topRatedMovies) {
      getTopRatedMovies();
    }
  }, []); // Added the dependency to the useEffect hook

  return topRatedMovies; // Return the top rated movies if needed
};

export default useTopRatedMovies;