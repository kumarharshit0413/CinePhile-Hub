import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import {
  doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove,
  collection, query, where, getDocs, orderBy
} from 'firebase/firestore';

import Spinner from '../components/Spinner';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import MovieCarousel from '../components/MovieCarousel';

function DetailPage() {
  
  const [movie, setMovie] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for user-specific features from Firestore
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // Hooks and constants
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const apiKey = import.meta.env.VITE_API_KEY;
  const { currentUser } = useAuth();

  // Function to fetch all reviews for the current movie from Firestore
  const fetchReviews = async () => {
    setReviewsLoading(true);
    try {
      const q = query(
        collection(db, "reviews"),
        where("movieId", "==", numericId),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const reviewsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(reviewsData);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setReviewsLoading(false);
    }
  };

  // Main effect to fetch all data when the component loads or ID/user changes
  useEffect(() => {
    // Scroll to top on new page load
    window.scrollTo(0, 0);
    
    const fetchAllDetails = async () => {
      setLoading(true);
      setError(null);
      setRecommendations([]);
      setIsInWatchlist(false);

      try {
        // Fetch Movie Details AND Recommendations in one efficient API call
        
        const response = await fetch(`/api/getMovies?id=${id}`);
        if (!response.ok) throw new Error('Could not fetch movie details.');
        
        const movieData = await response.json();
        setMovie(movieData);
        setRecommendations(movieData.recommendations?.results || []);

        // After movie is fetched, check watchlist status if a user is logged in
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists() && docSnap.data().watchlist?.includes(numericId)) {
            setIsInWatchlist(true);
          }
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDetails();
    fetchReviews();
  }, [id, apiKey, currentUser]);

  const handleWatchlist = async () => {
    if (!currentUser) {
      alert("Please log in to add movies to your watchlist.");
      return;
    }
    const userDocRef = doc(db, 'users', currentUser.uid);
    try {
      if (isInWatchlist) {
        await updateDoc(userDocRef, { watchlist: arrayRemove(numericId) });
        setIsInWatchlist(false);
      } else {
        // Use setDoc with { merge: true } to create the document if it doesn't exist,
        // without overwriting other fields like 'username'.
        await setDoc(userDocRef, { watchlist: arrayUnion(numericId) }, { merge: true });
        setIsInWatchlist(true);
      }
    } catch (err) {
      console.error("Error updating watchlist:", err);
      alert("Could not update watchlist.");
    }
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-center p-10 text-red-500 text-lg">Error: {error}</div>;
  if (!movie) return <div className="text-center p-10">Movie not found.</div>;

  return (
    <div className="p-4 md:p-8">
      {/* Movie Details Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500x750'}
          alt={movie.title}
          className="rounded-lg w-full md:w-1/3 object-cover"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title} ({movie.release_date?.substring(0, 4)})</h1>
          {currentUser && (
            <button onClick={handleWatchlist} className={`p-2 rounded w-full font-bold mb-4 ${isInWatchlist ? 'bg-gray-600' : 'bg-red-600'}`}>
              {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
          )}
          <p className="text-gray-400 mb-4 italic">{movie.tagline}</p>
          <p className="mb-6">{movie.overview}</p>
          <div className="flex gap-x-4 gap-y-2 flex-wrap mb-4">
            <span><strong>Release Date:</strong> {movie.release_date}</span>
            <span><strong>Runtime:</strong> {movie.runtime} min</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <strong>Genres:</strong>
            {movie.genres && movie.genres.map(genre => (
              <span key={genre.id} className="bg-gray-700 rounded-full px-3 py-1 text-sm">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-bold border-b-2 border-gray-700 pb-2 mb-6">Reviews</h2>
        <ReviewForm movieId={numericId} onReviewSubmitted={fetchReviews} />
        {reviewsLoading ? <Spinner /> : <ReviewList reviews={reviews} />}
      </div>

      {/* Recommended Movies Section */}
      <div className="mt-12">
        <MovieCarousel title="You Might Also Like" movies={recommendations} />
      </div>
    </div>
  );
}

export default DetailPage;