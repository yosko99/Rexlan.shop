import React from 'react';

import { faTruck, IconDefinition, faCircleDollarToSlot, faClock, faLock	 } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Container, Row, Col } from 'react-bootstrap';

import CenteredItems from '../../styles/CenteredItems';

interface TextAreaData {
	icon: IconDefinition;
	firstText: string;
	secondText: string;
}

const InfoBar = () => {
  const textAreas: TextAreaData[] = [
    {
      icon: faTruck,
      firstText: 'Free shipping & return',
      secondText: 'Free shipping on all orders over 99$'
    },
    {
      icon: faCircleDollarToSlot,
      firstText: 'Money back guarantee',
      secondText: '100% money back guarantee'
    },
    {
      icon: faClock,
      firstText: 'Online support 24/7',
      secondText: 'Lorem ipsum lorem lorem'
    },
    {
      icon: faLock,
      firstText: 'Secure payment',
      secondText: 'Lorem ipsum lorem lorem'
    }
  ];
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
