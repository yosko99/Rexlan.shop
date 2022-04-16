import React from 'react';

import { Container, Image, Row, Col } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';

import registerImg from '../../assets/registerpage/register-img.webp';
import RegisterForm from '../../components/register/RegisterForm';

const RegisterPage = () => {
  return (
		<Fade>
			<Container className='my-3'>
				<Row>
						<Col lg={5} className='d-flex flex-column justify-content-center'>
							<h2>Register</h2>
							<p className='text-muted'>
								Please enter your details
							</p>
							<RegisterForm className='w-100'/>
						</Col>
					<Col lg={7}>
						<Image className='rounded' width={'100%'} src={registerImg} />
					</Col>
				</Row>
			</Container>
		</Fade>
  );
};

export default RegisterPage;
