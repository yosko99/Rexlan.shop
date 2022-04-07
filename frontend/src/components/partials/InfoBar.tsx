import React, { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';

import { TextAreaData } from '../../data/infoBarData';
import CenteredItems from '../../styles/CenteredItems';

interface Props {
  textAreas: TextAreaData[];
}

const InfoBar: FC<Props> = ({ textAreas }) => {
  return (
		<Container>
			<Row className='justify-content-center'>
				{textAreas.map((textArea: TextAreaData, index: number) => (
					<Col key={index} className='bg-light mx-1'>
						<CenteredItems flexColumn className='py-2'>
							<FontAwesomeIcon icon={textArea.icon} size={'2x'} />
							<div className='text-center mt-2'>
								<p className='m-0 text-uppercase'>
									{textArea.firstText}
								</p>
								<p className='m-0'>
									{textArea.secondText}
								</p>
							</div>
						</CenteredItems>
					</Col>
				))}
			</Row>
		</Container>
  );
};

export default InfoBar;
