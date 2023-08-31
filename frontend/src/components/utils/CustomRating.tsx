import React, { FC, useContext, useState } from 'react';

import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import useMutationWithToken from '../../hooks/useMutationWithToken';
import { getProductReviewsRoute } from '../../services/apiRoutes';
import { Product } from '../../types/productTypes';

interface Props {
  product: Product;
  starSize?: number;
  className?: string;
  readonly?: boolean;
}

const CustomRating: FC<Props> = ({
  starSize,
  className,
  product,
  readonly
}) => {
  const [count, setCount] = useState(product.rating.count);
  const [rate, setRate] = useState(product.rating.rate);

  const { lang } = useContext(CurrentLanguageContext);

  const {
    data,
    error,
    mutate
  } = useMutationWithToken(getProductReviewsRoute(product.id), false);

  const handleRating = (newRate: number) => {
    const scaledValue = (newRate / 100) * 5;

    mutate({ rate: scaledValue }, {
      onSuccess: () => {
        const updatedRate = ((rate * count) + scaledValue) / (count + 1);
        setCount(count + 1);
        setRate(updatedRate);
        toast(lang.toasts.review.reviewAdded, { type: 'success' });
      },
      onError: () => {
        toast(lang.toasts.review.reviewAlreadyCreated, { type: 'warning' });
      }
    });
  };

  return (
    <>
      <Rating
        onClick={handleRating}
        ratingValue={0}
        readonly={readonly}
        initialValue={rate}
        size={starSize}
        allowHalfIcon
        transition
        className={className}
      />
      <span className="text-muted ms-2">
        {rate} {lang.global.outOf} {count}
      </span>
    </>
  );
};

export default CustomRating;
