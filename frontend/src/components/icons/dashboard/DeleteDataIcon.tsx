import React, { FC } from 'react';

import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useQueryClient, useMutation } from 'react-query';

interface Props {
	apiRoute: string;
}

const DeleteDataIcon: FC<Props> = ({ apiRoute }) => {
  const queryClinet = useQueryClient();

  const mutation = useMutation(data => {
    return axios.delete(apiRoute);
  });

  const handleClick = () => {
    if (confirm('Are you sure you want to delete this?')) {

    }
  };

  return (
		<Button onClick={handleClick} variant='danger'>
			<FontAwesomeIcon icon={faTrash} />
		</Button>
  );
};

export default DeleteDataIcon;
