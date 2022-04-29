import React, { useEffect, useState } from 'react';

import { Image } from 'react-bootstrap';

import noFavouritesImg from '../../assets/favouritespage/no-favourites.png';
import RenderFavouritesPage from './RenderFavouritesPage';

const FavouritesPage = () => {
  const [likedProductsLocalStorage, setLikedProductsLocalStorage] = useState<string | null>(localStorage.getItem('liked'));

  // Listen when favourite button is clicked
  // That way the page can update
  useEffect(() => {
    window.addEventListener('storage', () => {
      setLikedProductsLocalStorage(localStorage.getItem('liked'));
    });
  }, []);

  // No liked products
  if (likedProductsLocalStorage === null || likedProductsLocalStorage === '[]') {
    return (
    <div className='text-center'>
      <Image src={noFavouritesImg} fluid alt='no favourites'/>
    </div>
    );
  }

  return (
      <RenderFavouritesPage likedProductsLocalStorage={likedProductsLocalStorage}/>
  );
};

export default FavouritesPage;
