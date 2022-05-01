import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import loginImg from '../../assets/loginpage/login-img.webp';
import LoginForm from '../../components/forms/LoginForm';
import SignUpDesignTemplate from '../../components/partials/SignUpDesignTemplate';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
  useAuth();

  return (
		<SignUpDesignTemplate
		body={
			<>
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
			</>
			}
			imgURL={loginImg}
		/>
  );
};

export default LoginPage;
