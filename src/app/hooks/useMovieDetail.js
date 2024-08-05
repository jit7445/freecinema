import  { useState, useEffect } from 'react';

const useMovieDetail = (movieId) => {
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=YOUR_API_KEY`);
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovieDetail(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]);

  return { movieDetail, loading, error };
};

export default useMovieDetail;
