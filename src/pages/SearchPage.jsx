import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner'; 

function SearchPage() {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchSearchResults = async () => {
        setLoading(true);
        setError(null);
        
        try {
          const response = await fetch(`/api/search?query=${query}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setSearchResults(data.results);
        } catch (err) {
          console.error("Failed to fetch search results:", err);
          setError("Could not perform search. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      
      fetchSearchResults();
    } else { 
      setLoading(false);
      setSearchResults([]);
    }
  }, [query, apiKey]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500 text-lg">{error}</div>;
  }

  return (
    <main className="p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6">
        Showing results for: <span className="text-red-500">{query}</span>
      </h2>
      
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {searchResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </main>
  );
}

export default SearchPage;