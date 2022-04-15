import React, { useState, FC } from 'react';

import { Rating } from 'react-simple-star-rating';

interface Props {
	initialValue: number;
	size?: number;
	className?: string;
}

const CustomRating: FC<Props> = ({ initialValue, size, className }) => {
  const [rating, setRating] = useState(0); // initial rating value

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
		<>
      <Rating
				onClick={handleRating}
				ratingValue={rating}
				initialValue={initialValue}
				size={size}
				transition
				className={className}
			/>
		</>
  );
};

export default CustomRating;
