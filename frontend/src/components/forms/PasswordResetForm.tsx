import React, { FC, useState } from 'react';

import EmailInput from '../inputs/EmailInput';
import FormTemplate from '../templates/FormTemplate';

interface Props {
	className?: string;
}

interface PasswordResetTypes {
	email: string;
}

const PasswordResetForm: FC<Props> = ({ className }) => {
  const [formData, setFormData] = useState<PasswordResetTypes>({
    email: ''
  });

  return (
		<div className={className}>
			<FormTemplate
				data={formData}
				setData={setFormData}
				mutateURL={'/api/users/password-reset'}
				redirectOnSuccess={false}
				inputs={
					<>
						<EmailInput />
					</>
				}
			/>
		</div>
  );
};

export default PasswordResetForm;
