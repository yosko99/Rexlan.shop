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
    email: '',
    address: '',
    createdAt: new Date(),
    name: '',
    phone: '',
    updatedAt: new Date(),
    zip: ''
  });

  return (
    <div className={className}>
			<FormTemplate
				data={formData}
				setData={setFormData}
				mutateURL={'/api/users/active'}
				inputs={
					<>
						<EmailInput defaultValue={user.email} />
						<NameInput defaultValue={user.name} />
						<AddressInput defaultValue={user.address} />
						<PhoneInput defaultValue={user.phone} />
						<ZipInput defaultValue={user.zip}/>
					</>
				}
			/>
		</div>
  );
};

export default DetailsUpdateForm;
