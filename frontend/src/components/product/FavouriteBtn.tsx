import React, { FC, useState, useEffect } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHeart as hollowHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	size?: number;
	productID: string;
	className?: string;
}

const FavouriteBtn: FC<Props> = ({ productID, size = '1x', className }) => {
  const [heart, setHeart] = useState<IconProp>(hollowHeart);

  const changeIcon = (): void => {
    if (checkIfLiked(productID)) {
      setHeart(filledHeart);
    } else {
      setHeart(hollowHeart);
    }
  };

  const checkIfLiked = (productID: string): boolean => {
    const liked = localStorage.getItem('liked');

    if (liked !== null && liked !== '') {
      const localStorageProcuts = JSON.parse(liked);
      const productIndex = localStorageProcuts.indexOf(productID);

      return productIndex !== -1;
    }

    localStorage.setItem('liked', '');
    return false;
  };

  const handleClick = (): void => {
    const checkExists = checkIfLiked(productID);

    // Check if array is empty
    let likedLocalStorage: string[] = [];
    if (localStorage.getItem('liked') !== '') {
      likedLocalStorage = JSON.parse(localStorage.getItem('liked')!);
    }

    // Check if product id is already in array
    if (!checkExists) { // Not in array (add it)
      const likedProducts = [...likedLocalStorage, productID];
      localStorage.setItem('liked', JSON.stringify(likedProducts));
    } else { // Product id is in array (remove it)
      const likedProducts = likedLocalStorage.filter((likedProduct: string) => likedProduct !== productID);
      localStorage.setItem('liked', JSON.stringify(likedProducts));
    }

    // Notify there was a change in storage so event listener can trigger
    window.dispatchEvent(new Event('storage'));
    changeIcon();
  };

  useEffect(() => {
    changeIcon();
  }, []);

  return (
		<FontAwesomeIcon
			color='red'
			fontSize={`${size}em`}
			border
			onClick={handleClick}
			icon={heart}
			className={className}
			role="button"
		/>
  );
};

export default FavouriteBtn;
