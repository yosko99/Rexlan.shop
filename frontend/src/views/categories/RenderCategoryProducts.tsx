import React, { FC } from 'react';

import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import MultipleProductCars from '../../components/product/MultipleProductCards';
import { Product } from '../../types/productTypes';

interface Props {
	isLoading: boolean;
	categoryProducts: Product[];
}

const RenderCategoryProducts: FC<Props> = ({ isLoading, categoryProducts }) => {
  const { category } = useParams();

  return (
		<Container>
			<div>
				<Image
					alt={category}
					className='w-100 shadow mt-3 mb-5'
					fluid
					src={require(`../../assets/categories/${category}.webp`)}
				/>
			</div>
 			<MultipleProductCars
				products={categoryProducts}
				isLoading={isLoading}
			/>
		</Container>
  );
};

export default RenderCategoryProducts;
