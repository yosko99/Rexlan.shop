import React from 'react';

import { LinkContainer } from 'react-router-bootstrap';

import passwordResetImg from '../../assets/passwordResetPage/password-reset.png';
import PasswordResetForm from '../../components/forms/PasswordResetForm';
import SignUpDesignTemplate from '../../components/templates/SignUpDesignTemplate';

const RegisterPage = () => {
  return (
		<SignUpDesignTemplate
			body={
				<>
					<LinkContainer to='/login' role='button'>
						<p className='text-success mb-1'>Back to login</p>
					</LinkContainer>
					<h2>Forgot password</h2>
					<p className='text-muted'>
						We will send a temporary password to your email so you can login 😄.
					</p>
					<PasswordResetForm className='w-100'/>
				</>
			}
			imgURL={passwordResetImg}
		/>
  );
};

export default RegisterPage;
