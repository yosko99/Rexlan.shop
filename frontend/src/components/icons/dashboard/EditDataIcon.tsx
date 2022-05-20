import React from 'react';

import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

const EditDataIcon = () => {
  return (
		<Button variant='light'>
			<FontAwesomeIcon icon={faEdit} />
		</Button>
  );
};

export default EditDataIcon;
