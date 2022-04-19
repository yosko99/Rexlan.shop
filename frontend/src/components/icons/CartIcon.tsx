import React, { useContext } from 'react';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';

import { TokenContext } from '../../context/TokenContext';
import CenteredItems from '../../styles/CenteredItems';

const CartIcon = () => {
  const token = useContext(TokenContext);

  return (
		<LinkContainer role="button" className='me-3' to={token!.token !== null ? '/cart' : '/login'}>
			<CenteredItems flexColumn>
				<div><FontAwesomeIcon icon={faCartShopping} /></div>
				<small>Cart</small>
			</CenteredItems>
		</LinkContainer>
  );
};

export default CartIcon;
