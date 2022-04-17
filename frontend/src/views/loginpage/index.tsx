import React from 'react';

import { Container, Image, Row, Col } from 'react-bootstrap';
// @ts-ignore
import Fade from 'react-reveal/Fade';
import { LinkContainer } from 'react-router-bootstrap';

import loginImg from '../../assets/loginpage/login-img.webp';
import LoginForm from '../../components/login/LoginForm';

const LoginPage = () => {
  return (
		<Fade>
			<Container className='shadow-lg p-0 mt-3'>
				<Row>
						<Col lg={5} className='d-flex p-5 flex-column justify-content-center'>
							<h2>Welcome back !</h2>
							<p className='text-muted'>
								Please enter your details
							</p>
							<LoginForm className='w-100'/>
							<p className='mt-3'>
								Dont have an account?
								<LinkContainer to='/register'>
									<span role="button" className='ms-2 text-right'>
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
		</Fade>
  );
};

export default LoginPage;
