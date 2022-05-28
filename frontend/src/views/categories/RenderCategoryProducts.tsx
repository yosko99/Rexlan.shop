import React, { FC } from 'react';

import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import imgNotFoundImg from '../../assets/global/image-not-found.png';
import Loading from '../../components/loading/Loading';
import MultipleProductCards from '../../components/product/MultipleProductCards';
import useFetch from '../../hooks/useFetch';
import { Product } from '../../types/productTypes';

interface Props {
	isLoading: boolean;
	categoryProducts: Product[];
}

interface CategoryType {
	name: string;
	bannerImage: string;
}

const RenderCategoryProducts: FC<Props> = ({ isLoading, categoryProducts }) => {
  const { category: categoryURL } = useParams();

  const {
    isLoading: isLoadingCategories,
    data: categories
  } = useFetch('categories', '/api/categories/', true);

  return (
		<Container>
			<div className='text-center'>
				{
					isLoadingCategories
					  ? <Loading />
					  : <Image
							alt={categoryURL}
							className='shadow mt-3'
							fluid
							src={
								categories.find((category: CategoryType) => category.name === categoryURL).bannerImage ||
								imgNotFoundImg}
						/>
				}
			<hr className='my-5'/>
			</div>
			<MultipleProductCards
				products={categoryProducts}
				isLoading={isLoading}
			/>
		</Container>
  );
};

export default RenderCategoryProducts;
