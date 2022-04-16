import React, { useState, FC } from 'react';

import { Form, Button } from 'react-bootstrap';

import EmailInput from '../partials/EmailInput';
import PasswordInput from '../partials/PasswordInput';

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

			<Form.Group className="mb-3" controlId="checkbox">
				<Form.Check type="checkbox" label="Remember me" />
			</Form.Group>
			<Button variant="outline-primary rounded-pill" className='w-100' type="submit">
				Login
			</Button>
		</Form>
  );
};

export default LoginForm;
