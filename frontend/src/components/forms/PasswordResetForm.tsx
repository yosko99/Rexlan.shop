import React, { FC } from 'react';

import EmailInput from '../inputs/EmailInput';
import FormTemplate from '../templates/FormTemplate';

interface Props {
	className?: string;
}

const PasswordResetForm: FC<Props> = ({ className }) => {
  return (
		<div className={className}>
			<FormTemplate
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
