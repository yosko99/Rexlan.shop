import React, { FC } from 'react';

import useFetch from '../../hooks/useFetch';
import RenderHeader from './RenderHeader';

const Header: FC = () => {
  const {
    isLoading,
    error,
    data: categories
  } = useFetch('categories', '/api/categories/', true);

  if (error !== undefined) {
    window.location.href = '/404';
  }

  return (
    <RenderHeader isLoading={isLoading} categories={categories}/>
  );
};

export default Header;
