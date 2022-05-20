import React, { useState, FC } from 'react';

import PasswordInput from '../inputs/PasswordInput';
import FormTemplate from '../templates/FormTemplate';

interface Props {
	className?: string;
}

interface PasswordChangeData {
	oldPassword: string;
	newPassword: string;
}

const PasswordChangeForm: FC<Props> = ({ className }) => {
  const [formData, setFormData] = useState<PasswordChangeData>({
    oldPassword: '',
    newPassword: ''
  });

  return (
    <div className={className}>
			<FormTemplate
				data={formData}
				setData={setFormData}
				mutateURL={'/api/users/change-password'}
				redirectOnSuccess={false}
				inputs={
					<>
						<p>Enter old password</p>
						<PasswordInput customInputName='oldPassword'/>
						<p>Enter new password</p>
						<PasswordInput customInputName='newPassword'/>
					</>
				}
			/>
		</div>
  );
};

export default PasswordChangeForm;
