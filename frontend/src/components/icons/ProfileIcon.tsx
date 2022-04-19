import React, { useContext } from 'react';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';

import { TokenContext } from '../../context/TokenContext';
import CenteredItems from '../../styles/CenteredItems';

const ProfileIcon = () => {
  const token = useContext(TokenContext);

  return (
		<LinkContainer className='me-3' role='button' to={token!.token !== null ? '/dashboard' : '/login'}>
			<CenteredItems flexColumn>
				<div>
					<FontAwesomeIcon icon={faUser} className=''/>
				</div>
				Profile
			</CenteredItems>
		</LinkContainer>
  );
};

export default ProfileIcon;
