import React, { useEffect, useState } from 'react';

import MultipleProductCards from '../../components/product/MultipleProductCards';

const FavouritesPage = () => {
  const liked = localStorage.getItem('liked');
  const [likedProducts, setLikedProducts] = useState<string[]>();

  useEffect(() => {
    console.log(liked);
    if (liked !== null && liked !== '') {
      const parsedLiked = JSON.parse(liked);
      console.log(parsedLiked);
      setLikedProducts(parsedLiked);
    } else {
      console.log('cica');
    }
  }, []);

  return (
		<h1></h1>
  );
};

export default FavouritesPage;
