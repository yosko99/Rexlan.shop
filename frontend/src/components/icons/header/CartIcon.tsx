import React from 'react';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';

import CenteredItems from '../../../styles/CenteredItems';

const CartIcon = () => {
  return (
		<LinkContainer role="button" className='me-3' to={'/cart'}>
			<CenteredItems flexColumn>
				<div><FontAwesomeIcon icon={faCartShopping} /></div>
				<small>Cart</small>
			</CenteredItems>
		</LinkContainer>
  );
};

export default CartIcon;
