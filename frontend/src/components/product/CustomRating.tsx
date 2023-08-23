import React, { useState, FC, useContext } from 'react';

import { Rating } from 'react-simple-star-rating';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

interface Props {
  ratingRate: number;
  ratingCount: number;
  starSize?: number;
  className?: string;
}

const CustomRating: FC<Props> = ({
  ratingRate,
  starSize,
  className,
  ratingCount
}) => {
  const [rating, setRating] = useState(0);
  const { lang } = useContext(CurrentLanguageContext);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <>
      <Rating
        onClick={handleRating}
        ratingValue={rating}
        initialValue={ratingRate}
        size={starSize}
        transition
        className={className}
      />
      <span className="text-muted ms-2">
        {ratingRate} {lang.global.outOf} {ratingCount}
      </span>
    </>
  );
};

export default CustomRating;
