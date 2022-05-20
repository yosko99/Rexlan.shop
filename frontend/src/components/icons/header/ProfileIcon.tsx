import React, { useContext } from 'react';

import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';

import { TokenContext } from '../../../context/TokenContext';
import CenteredItems from '../../../styles/CenteredItems';

const ProfileIcon = () => {
  const token = useContext(TokenContext);

  return (
		<LinkContainer className='me-3' role='button' to={token!.token !== null ? '/dashboard/details' : '/login'}>
			<CenteredItems flexColumn>
				<div><FontAwesomeIcon icon={faCircleUser}/></div>
				<small>Profile</small>
			</CenteredItems>
		</LinkContainer>
  );
};

export default ProfileIcon;
