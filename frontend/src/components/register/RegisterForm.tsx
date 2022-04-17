import React, { useState, FC } from 'react';

import { Button } from 'react-bootstrap';

import AddressInput from '../inputs/AddressInput';
import EmailInput from '../inputs/EmailInput';
import NameInput from '../inputs/NameInput';
import PasswordInput from '../inputs/PasswordInput';
import FormTemplate from '../partials/FormTemplate';

interface Props {
	className?: string;
}

interface RegisterData {
  email: string;
  name: string;
  password: string;
  address: string;
}

const RegisterForm: FC<Props> = ({ className }) => {
  const [formData, setFormData] = useState<RegisterData>({
    email: '',
    name: '',
    password: '',
    address: ''
  });

  return (
    <div className={className}>
      <FormTemplate
        data={formData}
        setData={setFormData}
        mutateURL={'/api/users/'}
        onErrorMsg={'User with this email already exists.'}
        onSuccessMsg={'Your account has been successfully created.'}
        inputs={
          <>
            <EmailInput />
            <NameInput />
            <AddressInput />
            <PasswordInput />
            <Button variant="outline-primary rounded-pill" className='w-100 mt-3' type="submit">
              Register
            </Button>
          </>
        }
      />
    </div>
  );
};

export default RegisterForm;
