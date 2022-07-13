import React, { FC } from 'react';

import { Container, Row, Col, Image, Button } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import homegrownImg from '../../assets/mainpage/homegrown.webp';
import womenShoesImg from '../../assets/mainpage/women-shoes.webp';
import CustomCarousel from '../../components/carousel/CustomCarousel';
import HeadingBar from '../../components/partials/HeadingBar';
import InfoBar from '../../components/partials/InfoBar';
import MultipleProductCards from '../../components/product/MultipleProductCards';
import { textAreas } from '../../data/infoBarData';
import CenteredItems from '../../styles/CenteredItems';
import { Product } from '../../types/productTypes';

interface Props {
	isLoading: boolean;
	featuredProducts: Product[];
	bestSellers: Product[];
}

const RenderMainPage: FC<Props> = ({ isLoading, featuredProducts, bestSellers }) => {
  const carouselItems = Array(4).fill(0).map((value: any, index: number) => (
		<Image key={index} src={require(`../../assets/carousel/carousel${index + 1}.webp`)} />
  ));

  return (
		<Container>
			<CustomCarousel carouselItems={carouselItems} />

			<InfoBar textAreas={textAreas} />

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
				title={'Featured Products'}
				description={'Amazing products added recently in our catalog'}
			/>
			<MultipleProductCards
				isLoading={isLoading}
				products={featuredProducts}
			/>
			{/* Featured products */}

			{/* Summer collection */}
			<HeadingBar
				title={'Summer Collection'}
				description={'Amazing products added recently in our catalog'}
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
							<p className='font-weight-bold fs-2'>
								Homegrown
							</p>
							<p className='text-muted fs-5'>
								We love all of our beautiful brands here at Rexlan but there is a special place in our heart for the Bulgarian brands.
								We have made it easy for you to find a little about each of these amazing brands.
								Head over to our Homegrown page where we give you a little insight into what makes each of these brands so special.
							</p>
							<Button variant='primary fs-5 mt-2'>Find out more</Button>
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
				title={'Best Seller Products'}
				description={'Amazing products added recently in our catalog'}
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
