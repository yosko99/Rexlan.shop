import React, { FC } from 'react';

import { Form } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';
import FormTemplate from '../templates/FormTemplate';

interface Props {
	className?: string;
}

const LoginForm: FC<Props> = ({ className }) => {
  return (
		<div className={className}>
			<FormTemplate
				mutateURL={'/api/users/login'}
				inputs={
					<>
						<EmailInput />
						<PasswordInput />
						<div className='d-flex justify-content-between flex-wrap'>
							<Form.Group className="mb-3" controlId="checkbox">
								<Form.Check type="checkbox" label="Remember me" />
							</Form.Group>
							<LinkContainer to='/password-reset'>
								<p role='button'><u>Forgot your password?</u></p>
							</LinkContainer>
						</div>
					</>
				}
			/>
		</div>
  );
};

export default LoginForm;
