import React, { FC } from 'react';

import { faWaveSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container } from 'react-bootstrap';

import CenteredItems from '../../styles/CenteredItems';

interface Props {
	title: string;
	description: string;
}

const HeadingBar: FC<Props> = ({ title, description }) => {
  const squiggleLines = Array(3).fill(0).map((value: any, index: number) => (
		<FontAwesomeIcon key={index} icon={faWaveSquare} beatFade/>
  ));

  return (
		<Container className='mt-5'>
			<CenteredItems flexColumn>
				<div className='d-flex'>
					{squiggleLines}
					<p className='fs-3 mb-0'>
						{title}
					</p>
					{squiggleLines}
				</div>
				<p className='fs-5 text-muted'>
					{description}
				</p>
			</CenteredItems>
		</Container>
  );
};

export default HeadingBar;
