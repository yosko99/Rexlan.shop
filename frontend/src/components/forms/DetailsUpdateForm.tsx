import React, { useState, FC } from 'react';

import { User } from '../../types/userTypes';
import AddressInput from '../inputs/AddressInput';
import EmailInput from '../inputs/EmailInput';
import NameInput from '../inputs/NameInput';
import PhoneInput from '../inputs/PhoneInput';
import ZipInput from '../inputs/ZipInput';
import FormTemplate from '../partials/FormTemplate';

interface Props {
	className?: string;
	user: User;
}

const DetailsUpdateForm: FC<Props> = ({ className, user }) => {
  const [formData, setFormData] = useState<User>({
    email: user.email,
    address: user.address,
    createdAt: user.createdAt,
    name: user.name,
    phone: user.phone,
    updatedAt: user.updatedAt,
    zipcode: user.zipcode
  });

  return (
    <div className={className}>
			<FormTemplate
				data={formData}
				setData={setFormData}
				mutateURL={'/api/users/current'}
				redirectOnSuccess={false}
				inputs={
					<>
						<EmailInput defaultValue={user.email} readOnly />
						<NameInput defaultValue={user.name} />
						<AddressInput defaultValue={user.address} />
						<PhoneInput defaultValue={user.phone} />
						<ZipInput defaultValue={user.zipcode}/>
					</>

				}
			/>
		</div>
  );
};

export default DetailsUpdateForm;
