import React, { FC } from 'react';

import { Container, Row, Col, Image } from 'react-bootstrap';

import clothingBannerImg from '../../assets/mainpage/clothing-banner.webp';
import companiesImg from '../../assets/mainpage/companies.webp';
import forHerImg from '../../assets/mainpage/for-her.png';
import forHimImg from '../../assets/mainpage/for-him.png';
import CustomCarousel from '../../components/carousel/CustomCarousel';
import Loading from '../../components/loading/Loading';
import HeadingBar from '../../components/partials/HeadingBar';
import InfoBar from '../../components/partials/InfoBar';
import ProductCard from '../../components/product/ProductCard';
import { textAreas } from '../../data/infoBarData';
import CenteredItems from '../../styles/CenteredItems';
import { Product } from '../../types/productTypes';

interface Props {
	isLoading: boolean;
	featuredProducts: Product[];
	menClothing: Product;
	womenClothing: Product;
	bestSellers: Product[];
}

const RenderMainPage: FC<Props> = ({ isLoading, featuredProducts, menClothing, womenClothing, bestSellers }) => {
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
			  : featuredProducts.map((product: Product, index: number) => (
					<Col key={index} className='mt-2'>
						<ProductCard product={product}/>
					</Col>
			  ))}
			</Row>
		{/* Featured products */}

		{/* Summer collection */}
			<HeadingBar
				title={'Summer Collection'}
				description={'Amazing products added recently in our catalog'}
			/>
			{isLoading
			  ? <Loading />
			  :	<Row>
						<Col lg={6} md={12}>
							<Image width={'100%'} height={'100%'} style={{ objectFit: 'contain' }} src={clothingBannerImg} />
						</Col>
						<Col lg={6} md={12} className='d-flex flex-column justify-content-between'>
							<CenteredItems className='m-3'>
								<Image width={250} src={forHimImg}/>
								<Image width={250} height={250} style={{ objectFit: 'contain' }} src={menClothing.image}/>
							</CenteredItems>
							<CenteredItems className='m-3'>
								<Image fluid width={250} src={forHerImg}/>
								<Image width={250} height={250} style={{ objectFit: 'contain' }} src={womenClothing.image}/>
							</CenteredItems>
						</Col>
					</Row>
			}
		{/* Summer collection */}

		{/* Best seller */}
			<HeadingBar
				title={'Best Seller Products'}
				description={'Amazing products added recently in our catalog'}
			/>
			<Row>
			{isLoading
			  ? <Loading />
			  : bestSellers.map((product: Product, index: number) => (
					<Col key={index} className='mt-2'>
						<ProductCard product={product}/>
					</Col>
			  ))}
			</Row>
		{/* Best seller */}

		{/* Company logos */}
			<div className='text-center'>
				<hr className='mt-5 mb-0'/>
				<Image fluid src={companiesImg} />
			</div>
		{/* Company logos */}

	</Container>
  );
};

export default RenderMainPage;
