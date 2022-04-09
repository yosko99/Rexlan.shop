import React from 'react';

import { faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FreeShippingBar = () => {
  return (
		<p className='text-center shadow p-2 text-uppercase'>
			Free shipping just now
			<FontAwesomeIcon className='ms-2' fade icon={faTruck} />
		</p>
  );
};

export default FreeShippingBar;
