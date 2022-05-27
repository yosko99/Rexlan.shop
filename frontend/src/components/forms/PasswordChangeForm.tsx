import React, { FC } from 'react';

import PasswordInput from '../inputs/PasswordInput';
import FormTemplate from '../templates/FormTemplate';

interface Props {
	className?: string;
}

const PasswordChangeForm: FC<Props> = ({ className }) => {
  return (
		<div className={className}>
			<FormTemplate
				mutateURL={'/api/users/change-password'}
				redirectOnSuccess={false}
				inputs={
					<>
						<p>Enter old password</p>
						<PasswordInput customInputName='oldPassword' />
						<p>Enter new password</p>
						<PasswordInput customInputName='newPassword' />
					</>
				}
			/>
		</div>
  );
};

export default PasswordChangeForm;
