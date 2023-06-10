import React, { FC } from 'react';

import { useQueryClient } from 'react-query';

import { getCurrentUserRoute } from '../../services/apiRoutes';
import { User } from '../../types/userTypes';
import AddressInput from '../inputs/AddressInput';
import EmailInput from '../inputs/EmailInput';
import NameInput from '../inputs/NameInput';
import PhoneInput from '../inputs/PhoneInput';
import ZipInput from '../inputs/ZipInput';
import FormTemplate from '../templates/FormTemplate';

interface Props {
  className?: string;
  user: User;
}

const DetailsUpdateForm: FC<Props> = ({ className, user }) => {
  const queryClient = useQueryClient();

  const onSuccessFn = () => {
    queryClient.refetchQueries('cart');
    queryClient.refetchQueries('profile');
  };

  return (
    <div className={className}>
      <FormTemplate
        mutateURL={getCurrentUserRoute()}
        onSuccessFn={onSuccessFn}
        updateRequest
        inputs={
          <>
            <EmailInput defaultValue={user.email} readOnly />
            <NameInput defaultValue={user.name} />
            <AddressInput defaultValue={user.address} />
            <PhoneInput defaultValue={user.phone} />
            <ZipInput defaultValue={user.zipcode} />
          </>
        }
      />
    </div>
  );
};

export default DetailsUpdateForm;
