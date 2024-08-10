'use client';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useNowPlayingMovies from '@/app/hooks/useNowPlayingMovies';
import usePopularMovies from '@/app/hooks/usePopularMovies';
import useTopRatedMovies from '@/app/hooks/useTopRatedMovies';
import { addTrailerMovies } from '@/app/redux/movieSlice';
import useUpcomingMovies from '@/app/hooks/useUpcomingMovies';
import dotenv from 'dotenv';
dotenv.config();

const TrailerPage = ({ params }) => {
  const dispatch = useDispatch();
  const movieId = params.id;

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  const [video, setVideo] = useState('');

  const dataGet = async () => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
    const API_TMDB = process.env.API_TMDB;
    console.log("API_TMDB:", API_TMDB);

    let options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2UxY2RiODE3M2JhNzEzN2RhY2Q3NTY1YjNmMjMzMCIsIm5iZiI6MTcyMjUwOTU5MS4wNzk0MDcsInN1YiI6IjY2NTViOWYzYjU3NDI4M2M5NDBkZTg4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vbQX8jxw1bvItMhQrtADIO3TEoyCuDpdDoQwouYHfGA'
    
      }
    };

    console.log("options:movies:", options);

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      const filterData = json.results.filter((movie) => movie.type === "Trailer");
      const videos = filterData.length ? filterData[0] : json.results[0];
      console.log("viedo:", videos);
      
      setVideo(videos);
      dispatch(addTrailerMovies(videos));
      // console.log("data:", filterData);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => {
    dataGet();
  }, [movieId]);

  const videoUrl = `https://www.youtube.com/embed/${video.key}`;

  return (
    <div className='p-2'>
      <h2 className="text-xl font-semibold mb-4">Videos</h2>
      <div className="relative max-w-full min-h-full overflow-hidden rounded-lg shadow-lg">
        <iframe
          className='min-h-screen w-full'
          src={videoUrl}
          width="560"
          height="315"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Trailer"
        />
      </div>
    </div>
  );
}

export default TrailerPage;