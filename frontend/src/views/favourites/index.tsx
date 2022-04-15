import React from 'react';

import { Container, Image } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import noFavouritesImg from '../../assets/favouritespage/no-favourites.png';
import FreeShippingBar from '../../components/partials/FreeShippingBar';
import MultipleProductCards from '../../components/product/MultipleProductCards';
import useMultipleFetch from '../../hooks/useMultipleFetch';

const FavouritesPage = () => {
  const liked = localStorage.getItem('liked');

  if (liked === null || liked === '[]') {
    return <div className='text-center'>
							<Image src={noFavouritesImg} fluid alt='no favourites'/>
					</div>;
  }
  const parsedLiked = JSON.parse(liked);
  const fetchArr = parsedLiked.map((likedID: string) => {
    return {
      queryKey: likedID,
      link: `/api/products/${likedID}`
    };
  });

  // TODO: Fix conditional hook
  // eslint-disable-next-line
  const { isLoading, error, data } = useMultipleFetch(fetchArr);

  return (
		<>
		<FreeShippingBar />
		{ error !== undefined
			  ? <Navigate to="/404" state={{ error: error?.message }} />
			  : <Container>
						<h2 className='text-center my-3'>My Favourites</h2>
						<MultipleProductCards products={data} isLoading={isLoading} />
					</Container>
		}
		</>
  );
};

export default FavouritesPage;
