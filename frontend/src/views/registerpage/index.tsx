import React, { useContext } from 'react';

import RegisterForm from '../../components/forms/RegisterForm';
import SignUpDesignTemplate from '../../components/templates/SignUpDesignTemplate';
import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import useAuth from '../../hooks/useAuth';

const RegisterPage = () => {
  const { lang } = useContext(CurrentLanguageContext);
  useAuth(true);

  return (
		<SignUpDesignTemplate
			body={
				<>
					<h2>{lang.registerPage.heading.title}</h2>
					<p className='text-muted'>{lang.registerPage.heading.subtitle}</p>
					<RegisterForm className='w-100' />
					<small className='text-muted mt-2'>{lang.registerPage.providedDataIsUsedFor}</small>
				</>
			}
			imgURL={require(`../../assets/registerpage/register-img-${lang.current}.webp`)}
		/>
  );
};

export default RegisterPage;
