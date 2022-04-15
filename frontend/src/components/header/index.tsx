import React, { FC } from 'react';

import { Navigate } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import RenderHeader from './RenderHeader';

const Header: FC = () => {
  const {
    isLoading,
    error,
    data: categories
  } = useFetch('categories', '/api/categories/');

  if (error !== undefined) {
    return <Navigate to="/404" state={{ error: error.message }} />;
  }

  return (
		<>
			<RenderHeader isLoading={isLoading} categories={categories}/>
		</>
  );
};

export default Header;
