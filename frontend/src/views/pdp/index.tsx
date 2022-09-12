import React from 'react';

import { Navigate, useParams } from 'react-router-dom';

import Loading from '../../components/loading/Loading';
import { getProductRoute } from '../../hooks/apiRoutes';
import useFetch from '../../hooks/useFetch';
import RenderPDP from './RenderPDP';

const PDPPage = () => {
  const { id } = useParams();

  const {
    isLoading,
    error,
    data: product
  } = useFetch(`product-${id!}`, getProductRoute(id as string), true);

  if (isLoading) {
    return <Loading height='90vh' />;
  }

  return (
    <>
      {error !== undefined
        ? <Navigate to="/404" state={{ error: error.message }} />
        : <RenderPDP
          product={product}
        />
      }
    </>
  );
};

export default PDPPage;
