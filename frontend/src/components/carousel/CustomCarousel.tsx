import React, { FC } from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Container, Carousel } from 'react-bootstrap';
// import { Carousel } from 'react-responsive-carousel';

interface Props {
  carouselItems: React.ReactNode[];
}

const CustomCarousel: FC<Props> = ({ carouselItems }) => {
  return (
    <Container className='mb-4'>
      <Carousel axis='vertical' fade interval={3000} controls={false} indicators={false}>
        {carouselItems}
      </Carousel>
    </Container>
  );
};

export default CustomCarousel;
