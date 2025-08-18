import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div 
        className="
          bg-gray-800 rounded-lg overflow-hidden shadow-lg cursor-pointer
          transition duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50
        "
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto"
        />
        <div className="p-3">
          <h3 className="font-semibold truncate text-blue-200">{movie.title}</h3>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;