import React, { FC } from 'react';

import AddressInput from '../inputs/AddressInput';
import EmailInput from '../inputs/EmailInput';
import NameInput from '../inputs/NameInput';
import PasswordInput from '../inputs/PasswordInput';
import PhoneInput from '../inputs/PhoneInput';
import FormTemplate from '../templates/FormTemplate';

interface Props {
  className?: string;
}

const RegisterForm: FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <FormTemplate
        mutateURL={'/api/users/'}
        inputs={
          <>
            <EmailInput />
            <NameInput />
            <AddressInput />
            <PhoneInput />
            <PasswordInput />
          </>
        }
      />
    </div>
  );
};

export default RegisterForm;
