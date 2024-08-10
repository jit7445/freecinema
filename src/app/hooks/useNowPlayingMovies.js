'use client';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../redux/movieSlice";
import dotenv from 'dotenv';
dotenv.config();

const useNowPlayingMovies = () => {
  const API_TMDB = process.env.API_TMDB;

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2UxY2RiODE3M2JhNzEzN2RhY2Q3NTY1YjNmMjMzMCIsIm5iZiI6MTcyMzI5NTU5Ny44Mzk2OSwic3ViIjoiNjY1NWI5ZjNiNTc0MjgzYzk0MGRlODg4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.7Fa5zO-l-FGwo4IHv9X6VDzWianNR3HWLTF7OV3oouM'
  }
};
  // console.log("API:",API_TMDB);

  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector(
    (store) => store.movies.nowPlayingMovies
  );

  const getNowPlayingMovies = async () => {
    const response = await fetch(
     url,
      options // Removed the unnecessary variable
    );
    const data = await response.json();
  
    dispatch(addNowPlayingMovies(data.results));
  };

  useEffect(() => {
    if (!nowPlayingMovies) {
      getNowPlayingMovies();
    }
  }, []); // Added the dependency to the useEffect hook


  return nowPlayingMovies; // Return the movies if needed
};

export default useNowPlayingMovies;