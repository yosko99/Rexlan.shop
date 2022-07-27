import React, { useContext } from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import loginImg from '../../assets/loginpage/login-img.webp';
import LoginForm from '../../components/forms/LoginForm';
import SignUpDesignTemplate from '../../components/templates/SignUpDesignTemplate';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import useAuth from '../../hooks/useAuth';

const LoginPage = () => {
  const { lang } = useContext(CurrentLanguageContext
  );
  useAuth(true);

  return (
		<SignUpDesignTemplate
			body={
				<>
					<h2>{lang.loginPage.heading.title}</h2>
					<p className='text-muted'>
						{lang.loginPage.heading.subtitle}
					</p>
					<LoginForm className='w-100' />
					<p className='mt-3'>
						{lang.loginPage.dontHaveAccount}
						<LinkContainer to='/register'>
							<span role="button" className='ms-2 text-right'>
								<u>{lang.loginPage.signUpForFree}</u>
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
