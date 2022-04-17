import React from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Container, Image } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';

const CustomCarousel = () => {
  const carouselLength = 4;
  const carouselItems = Array(carouselLength).fill(0).map((value: any, index: number) => (
    <Image key={index} src={require(`../../assets/carousel/carousel${index + 1}.webp`)}/>
  ));

  return (
    <Container className='mb-4'>
      <Carousel axis='vertical' showThumbs={false} emulateTouch showStatus={false}>
        {carouselItems}
      </Carousel>
    </Container>
  );
};

export default CustomCarousel;
