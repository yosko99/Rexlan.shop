import React, { FC } from 'react';

import { Image } from 'react-bootstrap';

import error404 from '../assets/screen404/error404.webp';
import CenteredItems from '../styles/CenteredItems';

interface Props {
	error?: string | undefined;
}

const Screen404 :FC<Props> = ({ error }) => {
  return (
		<CenteredItems flexColumn>
			<Image src={error404} />
			{undefined !== error ? error : ''}
		</CenteredItems>
  );
};

export default Screen404;
