import React from 'react';

import registerImg from '../../assets/registerpage/register-img.webp';
import RegisterForm from '../../components/forms/RegisterForm';
import SignUpDesignTemplate from '../../components/partials/SignUpDesignTemplate';
import useAuth from '../../hooks/useAuth';

const RegisterPage = () => {
  useAuth();

  return (
		<SignUpDesignTemplate
		body={
			<>
				<h2>Register</h2>
				<p className='text-muted'>
					Please enter your details
				</p>
				<RegisterForm className='w-100'/>
				<small className='text-muted mt-2'>Provided data will be used for a faster checkout.</small>
			</>
		}
		imgURL={registerImg}
		/>
  );
};

export default RegisterPage;
