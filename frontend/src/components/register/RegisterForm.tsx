import React, { useState, FC } from 'react';

import { Form, Button } from 'react-bootstrap';

import AddressInput from '../inputs/AddressInput';
import EmailInput from '../inputs/EmailInput';
import NameInput from '../inputs/NameInput';
import PasswordInput from '../inputs/PasswordInput';

interface Props {
	className?: string;
}

const RegisterForm: FC<Props> = ({ className }) => {
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

			<NameInput />

			<AddressInput />

			<PasswordInput />

			<Button variant="outline-primary rounded-pill" className='w-100 mt-3' type="submit">
				Register
			</Button>
		</Form>
  );
};

export default RegisterForm;
