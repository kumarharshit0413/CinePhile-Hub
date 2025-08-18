import React, { useState } from 'react';
import StarRating from './StarRating';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function ReviewForm({ movieId, onReviewSubmitted }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const { currentUser, userProfile } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0 || !text.trim()) {
      alert('Please provide a rating and a review.');
      return;
    }

    try {
      // Add a new document to the 'reviews' collection
      await addDoc(collection(db, 'reviews'), {
        movieId: movieId,
        userId: currentUser.uid,
        username: userProfile.username,
        rating: rating,
        text: text,
        createdAt: serverTimestamp(), // Adds a server-side timestamp
      });

      // Clear the form and notify the parent component
      setRating(0);
      setText('');
      onReviewSubmitted(); // This will trigger a re-fetch of reviews
    } catch (error) {
      console.error("Error adding document: ", error);
      alert('Failed to submit review.');
    }
  };

  if (!currentUser) {
    return <p>Please log in to leave a review.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg mt-8">
      <h3 className="text-xl font-bold mb-4">Leave a Review</h3>
      <div className="mb-4">
        <StarRating rating={rating} onRating={setRating} />
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your review..."
        className="w-full p-2 bg-gray-700 rounded h-24"
      ></textarea>
      <button type="submit" className="bg-red-600 text-white font-bold p-2 rounded mt-4">
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;