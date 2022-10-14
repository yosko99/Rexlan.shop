import React, { FC } from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Container } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';

interface Props {
  carouselItems: React.ReactChild[];
}

const CustomCarousel: FC<Props> = ({ carouselItems }) => {
  return (
    <Container className='mb-4'>
      <Carousel axis='vertical' interval={200} showThumbs={false} emulateTouch showStatus={false}>
        {carouselItems}
      </Carousel>
    </Container>
  );
};

export default CustomCarousel;
