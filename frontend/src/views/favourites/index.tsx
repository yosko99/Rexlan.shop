import React, { useEffect, useState, useContext } from 'react';

import { Image } from 'react-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import RenderFavouritesPage from './RenderFavouritesPage';

const FavouritesPage = () => {
  const [likedProductsLocalStorage, setLikedProductsLocalStorage] = useState<string | null>(localStorage.getItem('liked'));
  const { lang } = useContext(CurrentLanguageContext);

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
        <Image src={require(`../../assets/favouritespage/no-favourites-${lang.current}.webp`)} fluid alt='no favourites' />
      </div>
    );
  }

  return (
    <RenderFavouritesPage likedProductsLocalStorage={likedProductsLocalStorage} />
  );
};

export default FavouritesPage;
