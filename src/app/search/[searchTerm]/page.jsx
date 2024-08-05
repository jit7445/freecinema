import Results from '@/components/Results';
import SearchResult from '../components/SearchResult';

export default async function SearchPage({ params }) {
  
   const searchTerm = params.searchTerm;

 
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US`
  );
  const data = await res.json();
  const results = data.results;
  console.log("results:", results);
  
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12 xl:p-24">
      <h1 className="text-3xl font-bold mb-4">Search Results for: {searchTerm}</h1>
      <SearchResult results={results} />
    </div>
  );
}