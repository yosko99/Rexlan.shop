import React, { FC } from 'react';

import { Container, Image, Row, Col } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';

interface Props {
	body: React.ReactChild;
	imgURL: string;
}

const LoginPage: FC<Props> = ({ body, imgURL }) => {
  return (
		<Fade>
			<Container className='shadow-lg p-0 mt-3'>
				<Row>
					<Col lg={5} className='d-flex p-5 flex-column justify-content-center'>
						<>
							{body}
						</>
					</Col>
					<Col lg={7}>
						<Image className='rounded' width={'100%'} src={imgURL} />
					</Col>
				</Row>
			</Container>
		</Fade>
  );
};

export default LoginPage;
