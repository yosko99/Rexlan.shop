import React, { FC } from 'react';

import { Row, Col } from 'react-bootstrap';

import { Product } from '../../types/productTypes';
import Loading from '../loading/Loading';
import ProductCard from './ProductCard';

interface Props {
	isLoading: boolean;
	products: Product[]
}

const MultipleProductCards: FC<Props> = ({ isLoading, products }) => {
  return (
		<Row>
		{isLoading
		  ? <Loading />
		  : products.map((product: Product, index: number) => (
				<Col key={index} className='mt-2'>
					<ProductCard product={product}/>
				</Col>
		  ))}
		</Row>
  );
};

export default MultipleProductCards;
