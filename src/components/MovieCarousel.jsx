import React from 'react';
import { Link } from 'react-router-dom';

function MovieCarousel({ title, movies }) {
  // Don't render the component if there are no movies
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="my-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="flex overflow-x-auto pb-4 space-x-4 custom-scrollbar">
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="flex-shrink-0">
            <div className="w-40 hover:scale-105 transition-transform duration-200">
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'}
                alt={movie.title}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm mt-2 truncate">{movie.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieCarousel;