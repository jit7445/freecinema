import fetch from 'node-fetch';
import Results from '@/components/Results';

const API_KEY = process.env.API_KEY;

export default async function Home({ searchParams }) {
  const { genre } = searchParams;


  // console.log("api::",API_KEY)
  let url;
  let options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwM2UxY2RiODE3M2JhNzEzN2RhY2Q3NTY1YjNmMjMzMCIsIm5iZiI6MTcyMjUwOTU5MS4wNzk0MDcsInN1YiI6IjY2NTViOWYzYjU3NDI4M2M5NDBkZTg4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vbQX8jxw1bvItMhQrtADIO3TEoyCuDpdDoQwouYHfGA'
  
    }
  };

  switch (genre) {
    case 'topRated':
      url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`;
      break;
    case 'tvShows':
      url = `https://api.themoviedb.org/3/tv/popular?language=en-US&page=1`;
      break;
    case 'popular':
      url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`;
      break;
    case 'upcoming':
      url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1`;
      break;
    default:
      url = `https://api.themoviedb.org/3/trending/all/week?language=en-US&page=1`;
  }

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    // console.log("data:", data);

    const results = data.results;

    return (
      <div>
        <Results results={results} />
      </div>
    );
  } catch (error) {
    console.error('error:', error);
    return (
      <div>
        <p>Error fetching data.</p>
      </div>
    );
  }
}
