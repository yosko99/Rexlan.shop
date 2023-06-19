import React, { FC } from 'react';

import { Row, Col, Image } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import noProductsFoundImg from '../../assets/global/no-products-found.png';
import { Product } from '../../types/productTypes';
import Loading from '../loading/Loading';
import ProductCard from './ProductCard';

interface Props {
	isLoading: boolean;
	products: Product[]
}

const MultipleProductCards: FC<Props> = ({ isLoading, products }) => {
  return (
		<Fade>
			<Row>
				{isLoading
				  ? <Loading />
				  : products.length > 0
				    ? products.map((product: Product, index: number) => (
							<Col key={index} className='mt-2'>
								<ProductCard product={product} />
							</Col>
				    ))
				    : <div className='text-center'>
							<Image src={noProductsFoundImg} fluid alt="No products" />
							<p className='fs-4'>No products found</p>
						</div>
				}
			</Row>
		</Fade>
  );
};

export default MultipleProductCards;
