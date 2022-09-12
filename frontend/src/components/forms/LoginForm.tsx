import React, { FC, useContext } from 'react';

import { Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { getUserLoginRoute } from '../../hooks/apiRoutes';
import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import FormTemplate from '../templates/FormTemplate';

interface Props {
	className?: string;
}

const LoginForm: FC<Props> = ({ className }) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
		<div className={className}>
			<FormTemplate
				mutateURL={getUserLoginRoute()}
				sendTokenBack
				inputs={
					<>
						<EmailInput />
						<PasswordInput />
						<div className='d-flex justify-content-between flex-wrap'>
							<Form.Group className="mb-3" controlId="checkbox">
								<Form.Check type="checkbox" label={lang.loginPage.rembemberMe} />
							</Form.Group>
							<LinkContainer to='/password-reset'>
								<p role='button'><u>{lang.loginPage.resetPassword}</u></p>
							</LinkContainer>
						</div>
					</>
				}
			/>
		</div>
  );
};

export default LoginForm;
