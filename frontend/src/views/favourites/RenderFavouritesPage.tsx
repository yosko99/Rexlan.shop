import React, { FC, useContext } from 'react';

import { Container } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import FreeShippingBar from '../../components/partials/FreeShippingBar';
import MultipleProductCards from '../../components/product/MultipleProductCards';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { getProductRoute } from '../../services/apiRoutes';
import useMultipleFetch from '../../hooks/useMultipleFetch';

interface Props {
	likedProductsLocalStorage: string;
}

const RenderFavouritesPage: FC<Props> = ({ likedProductsLocalStorage }) => {
  const parsedLiked = JSON.parse(likedProductsLocalStorage);
  const { lang } = useContext(CurrentLanguageContext);

  const fetchArr = parsedLiked.map((likedID: string) => {
    return {
      queryKey: `product-${likedID}`,
      link: getProductRoute(likedID)
    };
  });

  const { isLoading, error, data } = useMultipleFetch(fetchArr);

  return (
		<>
			<FreeShippingBar />
			{error !== undefined
			  ? <Navigate to="/404" state={{ error: error.message }} />
			  : <Container>
					<h2 className='text-center my-3'>{lang.favouritesPage.header}</h2>
					<MultipleProductCards products={data} isLoading={isLoading} />
				</Container>
			}
		</>
  );
};

export default RenderFavouritesPage;
