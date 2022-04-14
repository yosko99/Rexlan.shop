import React, { FC } from 'react';

import { Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import error404 from '../../assets/screen404/error404.webp';
import CenteredItems from '../../styles/CenteredItems';

interface ErrState {
	state: {
		error: string | undefined;
	}
}

const Page404 :FC = () => {
  const { state } = useLocation() as ErrState;

  return (
		<CenteredItems flexColumn>
			<Image src={error404} />
			{state !== null ? state.error : ''}
		</CenteredItems>
  );
};

export default Page404;
