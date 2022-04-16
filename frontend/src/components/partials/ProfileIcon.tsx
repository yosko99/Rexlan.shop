import React from 'react';

import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';

import useToken from '../../hooks/useToken';

const ProfileIcon = () => {
  const { token } = useToken();
  return (
		<>
			<LinkContainer to={token !== null ? '/dashboard' : '/login'} role='button'>
				<FontAwesomeIcon icon={faUserCircle} size='2x' className='me-3 ms-2 py-2' color='white'/>
			</LinkContainer>
		</>
  );
};

export default ProfileIcon;
