import React, { FC } from 'react';

import { getCategoriesRoute } from '../../services/apiRoutes';
import useFetch from '../../hooks/useFetch';
import RenderHeader from './RenderHeader';

const Header: FC = () => {
  const {
    isLoading,
    error,
    data: categories
  } = useFetch('categories', getCategoriesRoute(), true);

  if (error !== undefined) {
    window.location.href = '/404';
  }

  return (
    <RenderHeader isLoading={isLoading} categories={categories}/>
  );
};

export default Header;
