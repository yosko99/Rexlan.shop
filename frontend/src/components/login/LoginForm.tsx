import React, { useState, FC } from 'react';

import { Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import EmailInput from '../inputs/EmailInput';
import PasswordInput from '../inputs/PasswordInput';

interface Props {
	className?: string;
}

const LoginForm: FC<Props> = ({ className }) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
		<Form className={className} noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
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
			<Button variant="outline-primary rounded-pill" className='w-100' type="submit">
				Login
			</Button>
		</Form>
  );
};

export default LoginForm;
