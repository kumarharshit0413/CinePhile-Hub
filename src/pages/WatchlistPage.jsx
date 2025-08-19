import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner'; 

function WatchlistPage() {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const watchlistIds = docSnap.data().watchlist || [];
            
            const moviePromises = watchlistIds.map(id =>
              fetch(`/api/getMovies?id=${id}`).then(res => {
                if (!res.ok) {
                  console.error(`Failed to fetch details for movie ID: ${id}`);
                  return null;
                }
                return res.json();
              })
            );

            const movies = await Promise.all(moviePromises);
            setWatchlistMovies(movies.filter(movie => movie !== null));
          }
        }
      } catch (err) {
        console.error(err);
        setError("Could not load your watchlist. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if(currentUser) {
        fetchWatchlist();
    } else {
        setLoading(false);
    }
  }, [currentUser]);

  if (loading) return <Spinner />;

  if (error) return <div className="text-center p-10 text-red-500 text-lg">{error}</div>;

  if (!currentUser) return <div className="text-center p-10">Please log in to see your watchlist.</div>;

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
      {watchlistMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {watchlistMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>Your watchlist is empty. Add some movies!</p>
      )}
    </div>
  );
}

export default WatchlistPage;