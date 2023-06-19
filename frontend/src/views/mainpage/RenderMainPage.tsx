import React, { FC, useContext } from 'react';

import { Container, Row, Col, Image, Button, Carousel } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import homegrownImg from '../../assets/mainpage/homegrown.webp';
import womenShoesImg from '../../assets/mainpage/women-shoes.webp';
import CustomCarousel from '../../components/carousel/CustomCarousel';
import HeadingBar from '../../components/partials/HeadingBar';
import InfoBar from '../../components/partials/InfoBar';
import MultipleProductCards from '../../components/product/MultipleProductCards';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { LayoutContext } from '../../context/LayoutContext';
import CenteredItems from '../../styles/CenteredItems';
import { Product } from '../../types/productTypes';

interface Props {
  isLoading: boolean;
  featuredProducts: Product[];
  bestSellers: Product[];
}

const RenderMainPage: FC<Props> = ({
  isLoading,
  featuredProducts,
  bestSellers,
}) => {
  const { lang } = useContext(CurrentLanguageContext);
  const { layout } = useContext(LayoutContext);
  const carouselItems = [
    <Carousel.Item key={1}>
      <Image src={layout.thumbnailURL1} />
    </Carousel.Item>,
    <Carousel.Item key={2}>
      <Image src={layout.thumbnailURL2} />
    </Carousel.Item>,
    <Carousel.Item key={3}>
      <Image src={layout.thumbnailURL3} />
    </Carousel.Item>,
  ];

  const grid = [
    <Col key={1}>
      <Image fluid alt='women photo' width={400} src={layout.grid1URL} />
    </Col>,
    <Col key={2}>
      <Image fluid alt='women photo' width={400} src={layout.grid2URL} />
    </Col>,
    <Col key={3}>
      <Image fluid alt='women photo' width={400} src={layout.grid3URL} />
    </Col>,
  ];

  return (
    <Container>
      <CustomCarousel carouselItems={carouselItems} />

      <InfoBar textAreas={lang.mainPage.infoBar} />

      {/* Women photos */}
      <Row className='my-5'>{grid}</Row>
      {/* Women photos */}

      {/* Featured products */}
      <HeadingBar
        title={lang.mainPage.featuredProductsHeading.title}
        description={lang.mainPage.featuredProductsHeading.subtitle}
      />
      <MultipleProductCards isLoading={isLoading} products={featuredProducts} />
      {/* Featured products */}

      {/* Summer collection */}
      <HeadingBar
        title={layout.infoBarTitle}
        description={layout.infoBarDescription}
      />

      <Fade>
        <Image
          src={layout.homegrownFieldTopImage}
          alt='Women shoes'
          fluid
          className='rounded mb-4'
        />
      </Fade>
      {/* Summer collection */}

      {/* Homegrown section */}
      <Row className='mb-4'>
        <Col
          lg={6}
          className='d-flex justify-content-center align-items-center text-center p-5'
        >
          <CenteredItems flexColumn>
            <Fade up>
              <p className='font-weight-bold fs-2'>
                {layout.homegrownFieldTitle}
              </p>
              <p className='text-muted fs-5'>
                {layout.homegrownFieldDescription}
              </p>
              <Button variant='primary fs-5 mt-2'>
                {lang.global.findOutMore}
              </Button>
            </Fade>
          </CenteredItems>
        </Col>
        <Col lg={6}>
          <Fade>
            <Image
              src={layout.homegrownFieldRightImage}
              alt='women posing'
              fluid
              className='rounded'
            />
          </Fade>
        </Col>
      </Row>
      {/* Homegrown section */}

      {/* Best seller */}
      <HeadingBar
        title={lang.mainPage.bestSellersHeading.title}
        description={lang.mainPage.bestSellersHeading.subtitle}
      />
      <MultipleProductCards isLoading={isLoading} products={bestSellers} />
      {/* Best seller */}
    </Container>
  );
};

export default RenderMainPage;
