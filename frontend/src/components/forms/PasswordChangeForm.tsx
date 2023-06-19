import React, { FC, useContext } from 'react';

import { CurrentLanguageContext } from '../../context/CurrentLanguageContext';
import { getCurrentUserPasswordUpdateRoute } from '../../services/apiRoutes';
import PasswordInput from '../inputs/PasswordInput';
import FormTemplate from '../templates/FormTemplate';

interface Props {
	className?: string;
}

const PasswordChangeForm: FC<Props> = ({ className }) => {
  const { lang } = useContext(CurrentLanguageContext);

  return (
		<div className={className}>
			<FormTemplate
				mutateURL={getCurrentUserPasswordUpdateRoute()}
				updateRequest
				inputs={
					<>
						<p>{lang.dashboard.tabs.passwordChange.enterOldPassword}</p>
						<PasswordInput customInputName='oldPassword' />
						<p>{lang.dashboard.tabs.passwordChange.enterNewPassword}</p>
						<PasswordInput customInputName='newPassword' />
					</>
				}
			/>
		</div>
  );
};

export default PasswordChangeForm;
