import React from 'react';

import { Navigate } from 'react-router-dom';

import { getCategoriesRoute } from '../../services/apiRoutes';
import useFetch from '../../hooks/useFetch';
import RenderFooter from './RenderFooter';

const Footer = () => {
  const {
    isLoading,
    error,
    data: categories
  } = useFetch('categories', getCategoriesRoute(), true);

  return (
		<>
			{error !== undefined
			  ? <Navigate to="/404" state={{ error: error.message }} />
			  :	<RenderFooter isLoading={isLoading} categories={categories}/>
			}
		</>
  );
};

export default Footer;
