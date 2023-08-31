import React, { FC, useContext, useEffect, useState } from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faHeart as hollowHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as filledHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import checkIfLiked from '../../functions/checkIfLiked';
import handleFavoriteButtonClick from '../../functions/handleFavoriteButtonClick';

interface Props {
  size?: number;
  productID: string;
  className?: string;
}

const FavoriteProductButton: FC<Props> = ({
  productID,
  size = '1x',
  className
}) => {
  const { lang } = useContext(CurrentLanguageContext);

  const [heart, setHeart] = useState<IconProp>(hollowHeart);
  const [bounce, setBounce] = useState(false);

  const changeIcon = (): void => {
    if (checkIfLiked(productID)) {
      setHeart(filledHeart);
      setBounce(true);

      setTimeout(() => {
        setBounce(false);
      }, 1000);
    } else {
      setHeart(hollowHeart);
    }
  };

  const handleClick = () => {
    handleFavoriteButtonClick(productID, lang);
    changeIcon();
  };

  useEffect(() => {
    changeIcon();
  }, [productID]);

  return (
    <FontAwesomeIcon
      color="red"
      fontSize={`${size}em`}
      border
      bounce={bounce}
      onClick={handleClick}
      icon={heart}
      className={className}
      role="button"
    />
  );
};

export default FavoriteProductButton;
