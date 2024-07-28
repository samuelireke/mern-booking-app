import { useState } from "react";
import { FaStar } from "react-icons/fa";

export type StarRatingProps = {
  initialRating?: number;
  onChange?: (rating: number) => void;
};

const StarRating = ({ initialRating = 0, onChange }: StarRatingProps) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (index: number) => {
    setRating(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div className="flex items-center">
      <p className="mr-2 text-gray-700 text-sm font-bold">Star Rating:</p>
      {[1, 2, 3, 4, 5].map((index) => (
        <FaStar
          key={index}
          className={`text-lg cursor-pointer ${
            index <= (hover || rating) ? "text-yellow-400" : "text-gray-400"
          }`}
          onClick={() => handleClick(index)}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(0)}
          aria-label={`Rate ${index} stars out of 5`}
          role="button"
          tabIndex={0}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating})</span>
    </div>
  );
};

export default StarRating;
