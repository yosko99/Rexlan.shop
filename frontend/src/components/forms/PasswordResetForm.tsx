import React, { FC } from 'react';

import { getUserPasswordResetRoute } from '../../services/apiRoutes';
import EmailInput from '../inputs/EmailInput';
import FormTemplate from '../templates/FormTemplate';

interface Props {
	className?: string;
}

const PasswordResetForm: FC<Props> = ({ className }) => {
  return (
		<div className={className}>
			<FormTemplate
				mutateURL={getUserPasswordResetRoute()}
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
