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
      queryKey: 'featuredProducts',
      link: '/api/products?qty=4'
    },
    {
      queryKey: 'bestSellers',
      link: '/api/products/sort/rating?qty=3'
    }
  ]);

  if (isLoading) {
    return <Loading height='90vh' />;
  }
  if (error !== undefined) {
    return <Navigate to="/404" state={{ error: error.message }} />;
  }

  const [menClothing] = data[0].msg !== undefined ? [] : data[0];
  const [womenClothing] = data[1].msg !== undefined ? [] : data[1];
  const featuredProducts: Product[] = data[2] || [];
  const bestSellers: Product[] = data[3] || [];

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
