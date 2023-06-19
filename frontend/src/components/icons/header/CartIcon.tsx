import React, { useContext } from 'react';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';

import { CurrentLanguageContext } from '../../../context/CurrentLanguageContext';
import CenteredItems from '../../../styles/CenteredItems';

const CartIcon = () => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
		<LinkContainer role="button" className='me-3' to={'/cart'}>
			<CenteredItems flexColumn>
				<div><FontAwesomeIcon icon={faCartShopping} /></div>
				<small>{lang.header.cartButton}</small>
			</CenteredItems>
		</LinkContainer>
  );
};

export default CartIcon;
