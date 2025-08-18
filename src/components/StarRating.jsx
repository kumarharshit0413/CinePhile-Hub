import React, { useState } from 'react';

function StarRating({ rating = 0, onRating, readOnly = false }) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            type="button"
            key={starValue}
            className={`text-2xl ${readOnly ? 'cursor-default' : 'cursor-pointer'}`}
            onClick={() => !readOnly && onRating(starValue)}
            onMouseEnter={() => !readOnly && setHover(starValue)}
            onMouseLeave={() => !readOnly && setHover(0)}
          >
            <span className={starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-500'}>
              &#9733; {/* This is the star character */}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;