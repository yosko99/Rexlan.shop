import React, { FC } from 'react';

import { Navigate } from 'react-router-dom';

import MultipleProductCards from '../../components/product/MultipleProductCards';
import useMultipleFetch from '../../hooks/useMultipleFetch';
import { CartProductType } from '../../types/productTypes';

interface Props {
  products: CartProductType[] ;
  defaultValues: String[] | undefined;
}

interface QueryAttributes {
  queryKey: string;
  link: string;
}

const RenderCartPage: FC<Props> = ({ products, defaultValues }) => {
  const queries: QueryAttributes[] = products.map((product) => {
    return {
      queryKey: `product-${product.productID}`,
      link: `/api/products/${product.productID}`
    };
  });

  const { data, isLoading, error } = useMultipleFetch(queries);

  return (
    <>
    {error !== undefined
      ? <Navigate to="/404" state={{ error: error.message }} />
      : <MultipleProductCards isLoading={isLoading} products={data}/>
    }
    </>
  );
};

export default RenderCartPage;
