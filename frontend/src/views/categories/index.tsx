import React, { FC } from 'react';

import { useParams, Navigate } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import { getProductsByCategoryRoute } from '../../services/apiRoutes';
import useFetch from '../../hooks/useFetch';
import RenderCategoryProducts from './RenderCategoryProducts';

const CategoryProductsPage: FC = () => {
  const { category } = useParams();

  const {
    isLoading,
    error,
    data: categoryProducts
  } = useFetch(category!, getProductsByCategoryRoute(category!), true);

  if (isLoading) {
    return <Loading height='90vh' />;
  }

  return (
    <>
      {error !== undefined
        ? <Navigate to="/404" state={{ error: error.message }} />
        : <RenderCategoryProducts
          categoryProducts={categoryProducts}
          isLoading={isLoading}
        />
      }
    </>
  );
};

export default CategoryProductsPage;
