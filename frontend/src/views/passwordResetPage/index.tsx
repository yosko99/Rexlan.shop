import React, { useContext } from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import passwordResetImg from '../../assets/passwordResetPage/password-reset.png';
import PasswordResetForm from '../../components/forms/PasswordResetForm';
import SignUpDesignTemplate from '../../components/templates/SignUpDesignTemplate';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';

const RegisterPage = () => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
		<SignUpDesignTemplate
			body={
				<>
					<LinkContainer to='/login' role='button'>
						<p className='text-success mb-1'>{lang.resetPasswordPage.backToLogin}</p>
					</LinkContainer>
					<h2>{lang.resetPasswordPage.heading.title}</h2>
					<p className='text-muted'>{lang.resetPasswordPage.heading.subtitle}</p>
					<PasswordResetForm className='w-100' />
				</>
			}
			imgURL={passwordResetImg}
		/>
  );
};

export default RegisterPage;
