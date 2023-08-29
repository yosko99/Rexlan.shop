import React from 'react';

import { Navigate } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import useMultipleFetch from '../../hooks/useMultipleFetch';
import { getProductsRoute, getProductsSortedByRoute } from '../../services/apiRoutes';
import { Product } from '../../types/productTypes';
import RenderMainPage from './RenderMainPage';

const MainPage = () => {
  const {
    isLoading,
    error,
    data
  } = useMultipleFetch([
    {
      queryKey: 'featuredProducts',
      link: getProductsRoute(4)
    },
    {
      queryKey: 'mostViewed',
      link: getProductsSortedByRoute('mostViewed', 3)
    }
  ]);

  if (isLoading) {
    return <Loading height='90vh'/>;
  }
  if (error !== undefined) {
    return <Navigate to="/404" state={{ error: error.message }}/>;
  }

  const featuredProducts: Product[] = data[0] || [];
  const mostViewedProducts: Product[] = data[1] || [];

  return (
    <>
      <RenderMainPage
        isLoading={isLoading}
        featuredProducts={featuredProducts}
        mostViewedProducts={mostViewedProducts}
      />
    </>
  );
};

export default MainPage;
