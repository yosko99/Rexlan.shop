import React, { FC } from 'react';

import { getUsersRoute } from '../../hooks/apiRoutes';
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
        mutateURL={getUsersRoute()}
        sendTokenBack
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
