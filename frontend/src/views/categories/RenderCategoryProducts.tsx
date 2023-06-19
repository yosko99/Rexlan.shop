import React, { FC } from 'react';

import { Container, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import imgNotFoundImg from '../../assets/global/image-not-found.png';
import Loading from '../../components/loading/Loading';
import MultipleProductCards from '../../components/product/MultipleProductCards';
import { getCategoriesRoute } from '../../services/apiRoutes';
import useFetch from '../../hooks/useFetch';
import Category from '../../types/categoryType';
import { Product } from '../../types/productTypes';

interface Props {
	isLoading: boolean;
	categoryProducts: Product[];
}

const RenderCategoryProducts: FC<Props> = ({ isLoading, categoryProducts }) => {
  const { category: categoryURL } = useParams();

  const {
    isLoading: isLoadingCategories,
    data: categories
  } = useFetch('categories', getCategoriesRoute(), true);

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
								categories.find((category: Category) => category.categoryURL === categoryURL).bannerImage ||
								imgNotFoundImg}
						/>
				}
				<hr className='my-5' />
			</div>
			<MultipleProductCards
				products={categoryProducts}
				isLoading={isLoading}
			/>
		</Container>
  );
};

export default RenderCategoryProducts;
