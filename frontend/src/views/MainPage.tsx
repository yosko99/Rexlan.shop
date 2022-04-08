import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import CustomCarousel from '../components/carousel/CustomCarousel';
import Loading from '../components/loading/Loading';
import HeadingBar from '../components/partials/HeadingBar';
import InfoBar from '../components/partials/InfoBar';
import ProductCard from '../components/product/ProductCard';
import { textAreas } from '../data/infoBarData';
import useFetch from '../hooks/useFetch';
import { Product } from '../types/productTypes';
import Screen404 from './Screen404';

const MainPage = () => {
  const { isLoading, error, data: products } = useFetch('frontPageProducts', 'https://fakestoreapi.com/products?limit=4');

  if (error !== undefined) {
    return <Screen404 error={error.message}/>;
  }
  return (
		<Container>
			<CustomCarousel/>
			<InfoBar textAreas={textAreas}/>

			{/* Featured products */}
			<HeadingBar
				title={'Featured Products'}
				description={'Amazing products added recently in our catalog'}
			/>
			<Row>
			{isLoading
			  ? <Loading />
			  : products.map((product: Product, index: number) => (
					<Col key={index} className='mt-2'>
						<ProductCard product={product}/>
					</Col>
			  ))}
			</Row>
			{/* Featured products */}

		</Container>
  );
};

export default MainPage;
