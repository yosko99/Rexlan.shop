import React, { FC } from 'react';

import { Navigate } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import RenderHeader from './RenderHeader';

const Header: FC = () => {
  const {
    isLoading,
    error,
    data: categories
  } = useFetch('categories', 'https://fakestoreapi.com/products/categories');

  return (
		<>
			{error !== undefined
			  ? <Navigate to="/404" state={{ error: error.message }} />
			  : <RenderHeader isLoading={isLoading} categories={categories}/>
			}
		</>
  );
};

export default Header;
