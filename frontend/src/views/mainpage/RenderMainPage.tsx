import React, { FC, useContext } from 'react';

import { Container, Row, Col, Image, Button } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import homegrownImg from '../../assets/mainpage/homegrown.webp';
import womenShoesImg from '../../assets/mainpage/women-shoes.webp';
import CustomCarousel from '../../components/carousel/CustomCarousel';
import HeadingBar from '../../components/partials/HeadingBar';
import InfoBar from '../../components/partials/InfoBar';
import MultipleProductCards from '../../components/product/MultipleProductCards';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import CenteredItems from '../../styles/CenteredItems';
import { Product } from '../../types/productTypes';

interface Props {
	isLoading: boolean;
	featuredProducts: Product[];
	bestSellers: Product[];
}

const RenderMainPage: FC<Props> = ({ isLoading, featuredProducts, bestSellers }) => {
  const { lang } = useContext(CurrentLanguageContext);
  const carouselItems = Array(4).fill(0).map((value: any, index: number) => (
		<Image key={index} src={require(`../../assets/carousel/carousel${index + 1}.webp`)} />
  ));

  return (
		<Container>
			<CustomCarousel carouselItems={carouselItems} />

			<InfoBar textAreas={lang.mainPage.infoBar} />

			{/* Women photos */}
			<Row className='my-5'>
				{Array(3).fill(0).map((value: any, index: number) => (
					<Col key={index}>
						<Image
							fluid
							alt='women photo'
							width={400}
							src={require(`../../assets/mainpage/women-grid${index + 1}.webp`)}
						/>
					</Col>
				))}
			</Row>
			{/* Women photos */}

			{/* Featured products */}
			<HeadingBar
				title={lang.mainPage.featuredProductsHeading.title}
				description={lang.mainPage.featuredProductsHeading.description}
			/>
			<MultipleProductCards
				isLoading={isLoading}
				products={featuredProducts}
			/>
			{/* Featured products */}

			{/* Summer collection */}
			<HeadingBar
				title={lang.mainPage.summerCollectionHeading.title}
				description={lang.mainPage.summerCollectionHeading.description}
			/>

			<Fade>
				<Image src={womenShoesImg} alt='Women shoes' fluid className='rounded mb-4' />
			</Fade>
			{/* Summer collection */}

			{/* Homegrown section */}
			<Row className='mb-4'>
				<Col lg={6} className='d-flex justify-content-center align-items-center text-center p-5'>
					<CenteredItems flexColumn>
						<Fade up>
							<p className='font-weight-bold fs-2'>{lang.mainPage.homegrownHeading.title}</p>
							<p className='text-muted fs-5'>{lang.mainPage.homegrownHeading.description}</p>
							<Button variant='primary fs-5 mt-2'>{lang.global.findOutMore}</Button>
						</Fade>
					</CenteredItems>
				</Col>
				<Col lg={6}>
					<Fade>
						<Image src={homegrownImg} alt='women posing' fluid className='rounded' />
					</Fade>
				</Col>
			</Row>
			{/* Homegrown section */}

			{/* Best seller */}
			<HeadingBar
				title={lang.mainPage.bestSellersHeading.title}
				description={lang.mainPage.bestSellersHeading.description}
			/>
			<MultipleProductCards
				isLoading={isLoading}
				products={bestSellers}
			/>
			{/* Best seller */}
		</Container >
  );
};

export default RenderMainPage;
