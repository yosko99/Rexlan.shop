import React from 'react';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';

const DeleteDataIcon = () => {
  return (
		<Button variant='danger'>
			<FontAwesomeIcon icon={faTrash} />
		</Button>
  );
};

export default DeleteDataIcon;
