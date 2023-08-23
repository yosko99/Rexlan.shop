/* eslint-disable multiline-ternary */
import React, { useEffect, useState } from 'react';

import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel } from '@trendyol-js/react-carousel';

import { Product } from '../../types/productTypes';
import Loading from '../loading/Loading';
import ProductCard from './ProductCard';

interface Props {
  products: Product[];
  isLoading: boolean;
}

const MultipleProductCarousel = ({ isLoading, products }: Props) => {
  const [numberOfShownSlides, setNumberOfShownSlides] = useState(3);

  const changeNumberOfSlides = () => {
    if (window.innerWidth <= 1000) {
      setNumberOfShownSlides(1);
    } else {
      setNumberOfShownSlides(3);
    }
  };

  useEffect(() => {
    changeNumberOfSlides();
    window.addEventListener('resize', changeNumberOfSlides);

    // eslint-disable-next-line no-unused-expressions
    () => {
      window.removeEventListener('resize', changeNumberOfSlides);
    };
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Carousel
          show={numberOfShownSlides}
          responsive
          infinite
          slide={1}
          leftArrow={
            <div
              role="button"
              className="h-100 d-flex justify-content-center align-items-center"
            >
              <FontAwesomeIcon
                size={'1x'}
                icon={faArrowLeft}
                className="px-2"
              />
            </div>
          }
          rightArrow={
            <div
              role="button"
              className="h-100 d-flex justify-content-center align-items-center"
            >
              <FontAwesomeIcon
                size={'1x'}
                icon={faArrowRight}
                className="px-2"
              />
            </div>
          }
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      )}
    </>
  );
};

export default MultipleProductCarousel;
