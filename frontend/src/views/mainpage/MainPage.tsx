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
      queryKey: 'featuredProducts',
      link: 'https://fakestoreapi.com/products?limit=4'
    },
    {
      queryKey: 'menClothing',
      link: 'https://fakestoreapi.com/products/category/men\'s%20clothing?limit=1'
    },
    {
      queryKey: 'womenClothing',
      link: 'https://fakestoreapi.com/products/category/women\'s%20clothing?limit=1'
    },
    {
      queryKey: 'bestSeller',
      link: 'https://fakestoreapi.com/products'
    }
  ]);

  if (isLoading) {
    return <Loading height='90vh'/>;
  }

  const featuredProducts: Product[] = data[0];
  const [menClothing] = data[1];
  const [womenClothing] = data[2];
  const bestSellers: Product[] = data[3].sort(
    (a: Product, b: Product) =>
      (a.rating.count > b.rating.count) ? -1 : 1).slice(0, 3);

  return (
		<>
			{error !== undefined
			  ? <Navigate to="/404" state={{ error: error.message }} />
			  : <RenderMainPage
						isLoading={isLoading}
						featuredProducts={featuredProducts}
						menClothing={menClothing}
						womenClothing={womenClothing}
						bestSellers={bestSellers}
					/>
			}
		</>
  );
};

export default MainPage;
