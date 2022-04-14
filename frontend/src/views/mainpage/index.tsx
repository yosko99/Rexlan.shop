import React from 'react';

import { Navigate } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import useMultipleFetch from '../../hooks/useMultipleFetch';
import { Product } from '../../types/productTypes';
import RenderMainPage from './RenderMainPage';

const MainPage = () => {
  const {
    isLoading,
    error,
    data
  } = useMultipleFetch([
    {
      queryKey: 'menClothing',
      link: '/api/products/category/men\'s%20clothing?qty=1'
    },
    {
      queryKey: 'womenClothing',
      link: '/api/products/category/women\'s%20clothing?qty=1'
    },
    {
      queryKey: 'allProducts',
      link: '/api/products'
    }
  ]);

  if (isLoading) {
    return <Loading height='90vh'/>;
  }
  if (error !== undefined) {
    return <Navigate to="/404" state={{ error: error.message }} />;
  }

  const featuredProducts: Product[] = data[2].slice(5, 9);
  const [menClothing] = data[0];
  const [womenClothing] = data[1];
  // sort by rating value and pick first 3
  const bestSellers: Product[] = data[2].sort(
    (a: Product, b: Product) =>
      (a.rating.count > b.rating.count) ? -1 : 1).slice(0, 3);

  return (
		<>
    	<RenderMainPage
        isLoading={isLoading}
        featuredProducts={featuredProducts}
        menClothing={menClothing}
        womenClothing={womenClothing}
        bestSellers={bestSellers}
      />
		</>
  );
};

export default MainPage;
