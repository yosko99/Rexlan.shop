import React, { FC, useContext } from 'react';

import { Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import error404 from '../../assets/screen404/error404.webp';
import { TokenContext } from '../../context/TokenContext';
import CenteredItems from '../../styles/CenteredItems';

interface ErrState {
	state: {
		error: string | undefined;
	}
}

const Page404 :FC = () => {
  const { state } = useLocation() as ErrState;
  const token = useContext(TokenContext);

  // Something went wrong clear localStorage
  if (state !== null) {
		token!.setToken(null);
		localStorage.removeItem('cart');
  }

  return (
		<CenteredItems flexColumn>
			<Image src={error404} fluid />
			{state !== null ? state.error : ''}
		</CenteredItems>
  );
};

export default Page404;
