import React, { FC, useState, useEffect } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHeart as hollowHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { checkIfLiked, clickHandle } from './functions';

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

  const handleClick = () => {
    clickHandle(productID);
    changeIcon();
  };

  useEffect(() => {
    changeIcon();
  }, [productID]);

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
