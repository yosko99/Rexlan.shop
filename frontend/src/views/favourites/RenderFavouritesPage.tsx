import React, { FC, useContext } from 'react';

import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import FreeShippingBar from '../../components/partials/FreeShippingBar';
import MultipleProductCards from '../../components/product/MultipleProductCards';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import useFetch from '../../hooks/useFetch';
import { getProductWithIdsRoute } from '../../services/apiRoutes';

interface Props {
  likedProductsLocalStorage: string;
}

const RenderFavouritesPage: FC<Props> = ({ likedProductsLocalStorage }) => {
  const { lang } = useContext(CurrentLanguageContext);
  const productIds = likedProductsLocalStorage.replace(/[[\]"']/g, '');

  console.log(productIds);
  const {
    isLoading,
    error,
    data
  } = useFetch(`favoriteProducts-${productIds}`, getProductWithIdsRoute(productIds), true);

  return (
    <>
      <FreeShippingBar/>
      {error !== undefined
        ? <Navigate to="/404" state={{ error: error.message }}/>
        : <Container>
          <h2 className="text-center my-3">{lang.favouritesPage.header}</h2>
          <MultipleProductCards products={data} isLoading={isLoading}/>
        </Container>
      }
    </>
  );
};

export default RenderFavouritesPage;
