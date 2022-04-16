import React from 'react';

import { Container, Image, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import loginImg from '../../assets/loginpage/login-img.webp';
import LoginForm from '../../components/login/LoginForm';

const LoginPage = () => {
  return (
		<>
		<Container className='my-3'>
			<Row>
				<Col lg={5} className='d-flex flex-column justify-content-center'>
				<h2>Welcome back !</h2>
				<p className='text-muted'>Please enter your details</p>
					<LoginForm className='w-100'/>
				<p className='mt-3'>
					Dont have an account?
					<LinkContainer to='/register'>
						<span role="button" className='ms-2'>
							<u>
								Sign up for free!
							</u>
						</span>
					</LinkContainer>
				</p>
				</Col>
				<Col lg={7}>
					<Image className='rounded' width={'100%'} src={loginImg} />
				</Col>
			</Row>
		</Container>
		</>
  );
};

export default LoginPage;
