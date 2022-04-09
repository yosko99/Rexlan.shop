import React, { FC } from 'react';

import { useParams, Navigate } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import useFetch from '../../hooks/useFetch';
import RenderCategoryProducts from './RenderCategoryProducts';

const CategoryProducts: FC = () => {
  const { category } = useParams();

  const {
    isLoading,
    error,
    data: categoryProducts
  } = useFetch(category!, `https://fakestoreapi.com/products/category/${category}`);

  if (isLoading) {
    return <Loading height='90vh'/>;
  }

  return (
		<>
		{error !== undefined || categoryProducts.length === 0
		  ? <Navigate to="/404" state={{ error: error?.message }} />
		  : <RenderCategoryProducts
					categoryProducts={categoryProducts}
					isLoading={isLoading}
			/>
		}
		</>
  );
};

export default CategoryProducts;
