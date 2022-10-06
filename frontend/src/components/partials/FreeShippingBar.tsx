import React, { useContext } from 'react';

import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { FREE_DELIVERY_PRICE } from '../../constants/prices';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

const FreeShippingBar = () => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
		<p className='text-center bg-black text-white shadow-sm p-2 text-uppercase'>
			{lang.freeShippingBarText} {FREE_DELIVERY_PRICE}$
			<FontAwesomeIcon className='ms-2' fade icon={faTruck} />
		</p>
  );
};

export default FreeShippingBar;
