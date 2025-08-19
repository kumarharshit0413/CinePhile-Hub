import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Correctly defined state
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`);
        if (!response.ok) throw new Error('Failed to fetch genres.');
        const data = await response.json();
        setGenres(data.genres);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGenres();
  }, [apiKey]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `/api/discover?page=${currentPage}&sortBy=${sortBy}`;

        if (selectedGenre) {
          url += `&with_genres=${selectedGenre}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [currentPage, selectedGenre, sortBy]);

  const handleNextPage = () => {
    // Prevent going past the last page
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleFilterChange = (setter) => (e) => {
    setter(e.target.value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500 text-lg">Error: Could not fetch movies. Please try again later.</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label htmlFor="genre-select" className="block text-sm font-medium text-gray-400 mb-1">Filter by Genre</label>
          <select
            id="genre-select"
            value={selectedGenre}
            onChange={handleFilterChange(setSelectedGenre)}
            className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="sort-select" className="block text-sm font-medium text-gray-400 mb-1">Sort by</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={handleFilterChange(setSortBy)}
            className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="popularity.desc">Popularity</option>
            <option value="vote_average.desc">Top Rated</option>
            <option value="primary_release_date.desc">Newest</option>
            <option value="primary_release_date.asc">Oldest</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-lg font-bold">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage >= totalPages}
          className="bg-red-600 text-white font-bold py-2 px-4 rounded hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;