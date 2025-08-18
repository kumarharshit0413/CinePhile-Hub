import React from 'react';
import StarRating from './StarRating';

function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className="mt-8">No reviews yet. Be the first!</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">Reviews</h3>
      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <p className="font-bold mr-4">{review.username}</p>
              <StarRating rating={review.rating} readOnly={true} />
            </div>
            <p className="text-gray-300">{review.text}</p>
            <p className="text-xs text-gray-500 mt-2">
              {review.createdAt?.toDate().toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewList;